import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { EnvironmentConfig } from '../../config/environment';

export interface StorageAndQueueStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
}

export class StorageAndQueueStack extends cdk.Stack {
  public readonly encryptionKey: kms.Key;
  public readonly quarantineBucket: s3.Bucket;
  public readonly mainTable: dynamodb.Table;
  public readonly cvQueue: sqs.Queue;
  public readonly cvDlq: sqs.Queue;
  public readonly appSecret: secretsmanager.Secret;

  constructor(scope: Construct, id: string, props: StorageAndQueueStackProps) {
    super(scope, id, props);

    const { config } = props;

    // 1. AWS KMS Customer Managed Key (CMK)
    this.encryptionKey = new kms.Key(this, 'PortalKmsKey', {
      alias: `alias/${config.projectName}-${config.stage}-key`,
      description: `Encryption key for ${config.projectName} (${config.stage}) S3, DynamoDB, and Secrets`,
      enableKeyRotation: true,
      removalPolicy: config.removalPolicy
    });

    // 2. Amazon S3 - CV Quarantine & Storage Bucket
    this.quarantineBucket = new s3.Bucket(this, 'QuarantineBucket', {
      bucketName: `${config.projectName}-${config.stage}-quarantine-${cdk.Aws.ACCOUNT_ID}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.KMS,
      encryptionKey: this.encryptionKey,
      enforceSSL: true,
      versioned: true,
      cors: [
        {
          allowedMethods: [
            s3.HttpMethods.GET,
            s3.HttpMethods.PUT,
            s3.HttpMethods.POST,
            s3.HttpMethods.HEAD
          ],
          allowedOrigins: config.corsAllowedOrigins,
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag', 'x-amz-server-side-encryption'],
          maxAge: 3000
        }
      ],
      lifecycleRules: [
        {
          id: 'AbortIncompleteMultipartUploads',
          abortIncompleteMultipartUploadAfter: cdk.Duration.days(1)
        },
        {
          id: 'CleanErrorQuarantineFiles',
          prefix: 'quarantine/error/',
          expiration: cdk.Duration.days(1)
        },
        {
          id: 'ExpireProcessedCVsAfter90Days',
          prefix: 'verified/',
          expiration: cdk.Duration.days(90)
        }
      ],
      removalPolicy: config.removalPolicy,
      autoDeleteObjects: config.removalPolicy === cdk.RemovalPolicy.DESTROY
    });

    // 3. Amazon DynamoDB - Single-Table Design
    this.mainTable = new dynamodb.Table(this, 'MainTable', {
      tableName: `${config.projectName}-${config.stage}-main-table`,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'expire_at',
      encryption: dynamodb.TableEncryption.CUSTOMER_MANAGED,
      encryptionKey: this.encryptionKey,
      pointInTimeRecoverySpecification: {
        pointInTimeRecoveryEnabled: config.stage === 'prod'
      },
      removalPolicy: config.removalPolicy
    });

    // GSI1: Smart Leaderboard & Recruiter Lookups
    this.mainTable.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'GSI1PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI1SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    });

    // GSI2: Job Status & Public Listings
    this.mainTable.addGlobalSecondaryIndex({
      indexName: 'GSI2',
      partitionKey: { name: 'GSI2PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'GSI2SK', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL
    });

    // 4. Amazon SQS - Dead-Letter Queue & Main Processing Queue
    this.cvDlq = new sqs.Queue(this, 'CvDlq', {
      queueName: `${config.projectName}-${config.stage}-cv-dlq`,
      retentionPeriod: cdk.Duration.days(14),
      encryption: sqs.QueueEncryption.KMS,
      encryptionMasterKey: this.encryptionKey,
      removalPolicy: config.removalPolicy
    });

    this.cvQueue = new sqs.Queue(this, 'CvQueue', {
      queueName: `${config.projectName}-${config.stage}-cv-queue`,
      visibilityTimeout: cdk.Duration.seconds(360),
      retentionPeriod: cdk.Duration.days(4),
      encryption: sqs.QueueEncryption.KMS,
      encryptionMasterKey: this.encryptionKey,
      deadLetterQueue: {
        queue: this.cvDlq,
        maxReceiveCount: 3
      },
      removalPolicy: config.removalPolicy
    });

    // 5. AWS Secrets Manager - App Secrets Template
    this.appSecret = new secretsmanager.Secret(this, 'AppSecret', {
      secretName: `cv-portal/${config.stage}/app-secrets`,
      description: `Application configuration and secrets for ${config.projectName} (${config.stage})`,
      encryptionKey: this.encryptionKey,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          APP_NAME: 'AI CV Screening Portal',
          STAGE: config.stage,
          BEDROCK_MODEL_ID: 'anthropic.claude-3-haiku-20240307-v1:0'
        }),
        generateStringKey: 'APP_SECRET_KEY'
      },
      removalPolicy: config.removalPolicy
    });

    // Stack Outputs
    new cdk.CfnOutput(this, 'KmsKeyArnOutput', {
      value: this.encryptionKey.keyArn,
      description: 'KMS CMK Key ARN',
      exportName: `${config.projectName}-${config.stage}-KmsKeyArn`
    });

    new cdk.CfnOutput(this, 'QuarantineBucketNameOutput', {
      value: this.quarantineBucket.bucketName,
      description: 'CV Quarantine Bucket Name',
      exportName: `${config.projectName}-${config.stage}-QuarantineBucketName`
    });

    new cdk.CfnOutput(this, 'MainTableNameOutput', {
      value: this.mainTable.tableName,
      description: 'DynamoDB Main Table Name',
      exportName: `${config.projectName}-${config.stage}-MainTableName`
    });

    new cdk.CfnOutput(this, 'CvQueueUrlOutput', {
      value: this.cvQueue.queueUrl,
      description: 'CV SQS Queue URL',
      exportName: `${config.projectName}-${config.stage}-CvQueueUrl`
    });

    new cdk.CfnOutput(this, 'CvDlqUrlOutput', {
      value: this.cvDlq.queueUrl,
      description: 'CV DLQ URL',
      exportName: `${config.projectName}-${config.stage}-CvDlqUrl`
    });
  }
}

