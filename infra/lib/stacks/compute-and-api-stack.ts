import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { EnvironmentConfig } from '../../config/environment';

export interface ComputeAndApiStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  userPool: cognito.IUserPool;
  mainTable: dynamodb.ITable;
  quarantineBucket: s3.IBucket;
  webAclArn?: string;
}

export class ComputeAndApiStack extends cdk.Stack {
  public readonly restApi: apigateway.RestApi;
  public readonly authorizer: apigateway.CognitoUserPoolsAuthorizer;
  public readonly healthFunction: lambda.Function;
  public readonly webAclAssociation?: wafv2.CfnWebACLAssociation;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: ComputeAndApiStackProps) {
    super(scope, id, props);

    const { config, userPool, mainTable, quarantineBucket } = props;

    // 1. Amazon API Gateway REST API (Pure Serverless - Zero VPC)
    this.restApi = new apigateway.RestApi(this, 'RestApi', {
      restApiName: `${config.projectName}-${config.stage}-rest-api`,
      description: `AI CV Screening Portal REST API (${config.stage}) - Pure Serverless v12.0`,
      cloudWatchRole: false,
      deployOptions: {
        stageName: config.stage,
        metricsEnabled: true
      },
      defaultCorsPreflightOptions: {
        allowOrigins: config.corsAllowedOrigins,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'Authorization',
          'X-Amz-Date',
          'X-Api-Key',
          'X-Amz-Security-Token'
        ]
      }
    });

    // 2. Cognito User Pools Authorizer
    this.authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
      cognitoUserPools: [userPool],
      authorizerName: `${config.projectName}-${config.stage}-cognito-authorizer`,
      identitySource: 'method.request.header.Authorization'
    });

    // 3. Health Check Lambda Function
    this.healthFunction = new lambda.Function(this, 'HealthCheckFunction', {
      functionName: `${config.projectName}-${config.stage}-health-check`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../../../backend/functions/api/health')
      ),
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        STAGE: config.stage,
        PROJECT_NAME: config.projectName
      }
    });

    // Grant least privilege read to DynamoDB table if needed for health probing
    mainTable.grantReadData(this.healthFunction);

    // 4. API Endpoints
    const apiResource = this.restApi.root.addResource('api');
    const v1Resource = apiResource.addResource('v1');
    const healthResource = v1Resource.addResource('health');

    // GET /api/v1/health (Public endpoint for uptime/health checks)
    healthResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(this.healthFunction)
    );

    // GET /api/v1/auth/me (Protected endpoint requiring Cognito JWT token)
    const authResource = v1Resource.addResource('auth');
    const meResource = authResource.addResource('me');
    meResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(this.healthFunction),
      {
        authorizer: this.authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO
      }
    );

    // 5. AWS WAF Association (Regional WebACL protection for REST API)
    if (props.webAclArn) {
      this.webAclAssociation = new wafv2.CfnWebACLAssociation(this, 'ApiGatewayWebAclAssociation', {
        resourceArn: this.restApi.deploymentStage.stageArn,
        webAclArn: props.webAclArn
      });
    }

    // 6. Amazon CloudFront Distribution (Edge CDN Ingress)
    this.distribution = new cloudfront.Distribution(this, 'ApiDistribution', {
      comment: `${config.projectName}-${config.stage}-edge-cdn`,
      defaultBehavior: {
        origin: new origins.RestApiOrigin(this.restApi),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS
      }
    });

    // Stack Outputs
    new cdk.CfnOutput(this, 'ApiUrlOutput', {
      value: this.restApi.url,
      description: 'API Gateway Base URL',
      exportName: `${config.projectName}-${config.stage}-ApiUrl`
    });

    new cdk.CfnOutput(this, 'HealthCheckUrlOutput', {
      value: `${this.restApi.url}api/v1/health`,
      description: 'Public Health Check Endpoint URL',
      exportName: `${config.projectName}-${config.stage}-HealthCheckUrl`
    });

    new cdk.CfnOutput(this, 'CloudFrontDomainOutput', {
      value: this.distribution.distributionDomainName,
      description: 'CloudFront Edge CDN Domain Name',
      exportName: `${config.projectName}-${config.stage}-CloudFrontDomain`
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionIdOutput', {
      value: this.distribution.distributionId,
      description: 'CloudFront Distribution ID',
      exportName: `${config.projectName}-${config.stage}-CloudFrontDistributionId`
    });
  }
}

