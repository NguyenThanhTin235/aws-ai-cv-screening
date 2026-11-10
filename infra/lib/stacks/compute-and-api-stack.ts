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
  public readonly jobsFunction: lambda.Function;
  public readonly companiesFunction: lambda.Function;
  public readonly applicationsFunction: lambda.Function;
  public readonly usersFunction: lambda.Function;
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
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'Authorization',
          'X-Amz-Date',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Trace-Id',
          'X-Mock-User-Email',
          'X-Mock-User-Role',
          'X-Mock-User-Id',
          'X-Mock-Company-Id'
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

    // POST /api/v1/auth/send-otp (Send OTP verification email via AWS SES)
    const sendOtpFunction = new lambda.Function(this, 'SendOtpFunction', {
      functionName: `${config.projectName}-${config.stage}-send-otp`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(
        path.join(__dirname, '../../../backend/functions/api/auth/send-otp')
      ),
      timeout: cdk.Duration.seconds(15),
      memorySize: 256,
      environment: {
        STAGE: config.stage,
        PROJECT_NAME: config.projectName,
        SES_SENDER_EMAIL: config.notificationSenderEmail || 'tinthanhn81@gmail.com'
      }
    });

    sendOtpFunction.addToRolePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['ses:SendEmail', 'ses:SendRawEmail'],
        resources: ['*']
      })
    );

    const sendOtpResource = authResource.addResource('send-otp');
    sendOtpResource.addMethod(
      'POST',
      new apigateway.LambdaIntegration(sendOtpFunction)
    );

    const backendDistPath = path.join(__dirname, '../../../backend/dist');

    // 4.1 Jobs Lambda Function
    this.jobsFunction = new lambda.Function(this, 'JobsFunction', {
      functionName: `${config.projectName}-${config.stage}-jobs`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'functions/api/jobs/index.handler',
      code: lambda.Code.fromAsset(backendDistPath),
      timeout: cdk.Duration.seconds(15),
      memorySize: 512,
      environment: {
        STAGE: config.stage,
        PROJECT_NAME: config.projectName,
        TABLE_NAME: mainTable.tableName
      }
    });
    mainTable.grantReadWriteData(this.jobsFunction);

    // 4.2 Companies Lambda Function
    this.companiesFunction = new lambda.Function(this, 'CompaniesFunction', {
      functionName: `${config.projectName}-${config.stage}-companies`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'functions/api/companies/index.handler',
      code: lambda.Code.fromAsset(backendDistPath),
      timeout: cdk.Duration.seconds(15),
      memorySize: 256,
      environment: {
        STAGE: config.stage,
        PROJECT_NAME: config.projectName,
        TABLE_NAME: mainTable.tableName
      }
    });
    mainTable.grantReadWriteData(this.companiesFunction);

    // 4.3 Applications Lambda Function (Step 1-2-3 Upload Quarantine & Submit)
    this.applicationsFunction = new lambda.Function(this, 'ApplicationsFunction', {
      functionName: `${config.projectName}-${config.stage}-applications`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'functions/api/applications/index.handler',
      code: lambda.Code.fromAsset(backendDistPath),
      timeout: cdk.Duration.seconds(15),
      memorySize: 512,
      environment: {
        STAGE: config.stage,
        PROJECT_NAME: config.projectName,
        TABLE_NAME: mainTable.tableName,
        QUARANTINE_BUCKET: quarantineBucket.bucketName
      }
    });
    mainTable.grantReadWriteData(this.applicationsFunction);
    quarantineBucket.grantPut(this.applicationsFunction);
    quarantineBucket.grantRead(this.applicationsFunction);

    // 4.4 Users & Profiles Lambda Function
    this.usersFunction = new lambda.Function(this, 'UsersFunction', {
      functionName: `${config.projectName}-${config.stage}-users`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'functions/api/users/index.handler',
      code: lambda.Code.fromAsset(backendDistPath),
      timeout: cdk.Duration.seconds(15),
      memorySize: 256,
      environment: {
        STAGE: config.stage,
        PROJECT_NAME: config.projectName,
        TABLE_NAME: mainTable.tableName
      }
    });
    mainTable.grantReadWriteData(this.usersFunction);

    const cognitoAuthMethodOptions: apigateway.MethodOptions = {
      authorizer: this.authorizer,
      authorizationType: apigateway.AuthorizationType.COGNITO
    };

    // 4.4 Jobs Resources & Endpoints
    const jobsResource = v1Resource.addResource('jobs');
    // GET /api/v1/jobs (Public: search, filter, paginate)
    jobsResource.addMethod('GET', new apigateway.LambdaIntegration(this.jobsFunction));
    // POST /api/v1/jobs (Recruiter: create new JD with Rubric)
    jobsResource.addMethod('POST', new apigateway.LambdaIntegration(this.jobsFunction), cognitoAuthMethodOptions);

    const jobIdResource = jobsResource.addResource('{id}');
    // GET /api/v1/jobs/{id} (Public: job detail)
    jobIdResource.addMethod('GET', new apigateway.LambdaIntegration(this.jobsFunction));
    // PUT /api/v1/jobs/{id} (Recruiter: update JD)
    jobIdResource.addMethod('PUT', new apigateway.LambdaIntegration(this.jobsFunction), cognitoAuthMethodOptions);

    // PATCH /api/v1/jobs/{id}/status (Recruiter: toggle OPEN/CLOSED)
    const jobStatusResource = jobIdResource.addResource('status');
    jobStatusResource.addMethod('PATCH', new apigateway.LambdaIntegration(this.jobsFunction), cognitoAuthMethodOptions);

    // GET /api/v1/jobs/{id}/applications (Recruiter: view job applicants)
    const jobApplicationsResource = jobIdResource.addResource('applications');
    jobApplicationsResource.addMethod('GET', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    // 4.5 Companies Resources & Endpoints
    const companiesResource = v1Resource.addResource('companies');
    // POST /api/v1/companies (Recruiter/Admin: create company profile)
    companiesResource.addMethod('POST', new apigateway.LambdaIntegration(this.companiesFunction), cognitoAuthMethodOptions);

    // GET /api/v1/companies/my (Recruiter: get own company)
    const companyMyResource = companiesResource.addResource('my');
    companyMyResource.addMethod('GET', new apigateway.LambdaIntegration(this.companiesFunction), cognitoAuthMethodOptions);

    const companyIdResource = companiesResource.addResource('{id}');
    // GET /api/v1/companies/{id} (Public: company profile)
    companyIdResource.addMethod('GET', new apigateway.LambdaIntegration(this.companiesFunction));

    // GET /api/v1/companies/{id}/jobs (Public/Recruiter: list company jobs)
    const companyJobsResource = companyIdResource.addResource('jobs');
    companyJobsResource.addMethod('GET', new apigateway.LambdaIntegration(this.jobsFunction));

    // GET /api/v1/companies/{id}/members (Recruiter: list HR team members)
    const companyMembersResource = companyIdResource.addResource('members');
    companyMembersResource.addMethod('GET', new apigateway.LambdaIntegration(this.companiesFunction), cognitoAuthMethodOptions);

    // 4.6 Applications Resources & Endpoints
    const applicationsResource = v1Resource.addResource('applications');
    // POST /api/v1/applications (Candidate: submit application with TransactWriteItems)
    applicationsResource.addMethod('POST', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    // POST /api/v1/applications/upload-url (Candidate: step 2 presigned URL PUT S3)
    const uploadUrlResource = applicationsResource.addResource('upload-url');
    uploadUrlResource.addMethod('POST', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    // GET /api/v1/applications/my (Candidate: view application history)
    const myApplicationsResource = applicationsResource.addResource('my');
    myApplicationsResource.addMethod('GET', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    // POST /api/v1/applications/{id}/withdraw (Candidate: withdraw application)
    const appIdResource = applicationsResource.addResource('{id}');
    const withdrawResource = appIdResource.addResource('withdraw');
    withdrawResource.addMethod('POST', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    // POST /api/v1/applications/{id}/cv-access-url & GET .../cv-url (Recruiter: presigned GET URL + audit log AP29)
    const cvAccessUrlResource = appIdResource.addResource('cv-access-url');
    cvAccessUrlResource.addMethod('POST', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    const cvUrlResource = appIdResource.addResource('cv-url');
    cvUrlResource.addMethod('GET', new apigateway.LambdaIntegration(this.applicationsFunction), cognitoAuthMethodOptions);

    // 4.7 Users & Profiles Resources & Endpoints
    const usersResource = v1Resource.addResource('users');
    const usersMeResource = usersResource.addResource('me');
    // GET /api/v1/users/me & PUT /api/v1/users/me
    usersMeResource.addMethod('GET', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);
    usersMeResource.addMethod('PUT', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);

    // Candidate CV Vault: /api/v1/users/me/cvs
    const usersMeCvsResource = usersMeResource.addResource('cvs');
    usersMeCvsResource.addMethod('GET', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);
    usersMeCvsResource.addMethod('POST', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);

    const usersMeCvIdResource = usersMeCvsResource.addResource('{cvId}');
    usersMeCvIdResource.addMethod('DELETE', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);

    // Candidate Profile alias: /api/v1/candidate/profile
    const candidateResource = v1Resource.addResource('candidate');
    const candidateProfileResource = candidateResource.addResource('profile');
    candidateProfileResource.addMethod('GET', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);
    candidateProfileResource.addMethod('PUT', new apigateway.LambdaIntegration(this.usersFunction), cognitoAuthMethodOptions);

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

