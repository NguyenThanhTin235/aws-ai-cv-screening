import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import { EnvironmentConfig } from '../../config/environment';

export interface AuthAndEdgeStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
}

export class AuthAndEdgeStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly candidateGroup: cognito.CfnUserPoolGroup;
  public readonly recruiterGroup: cognito.CfnUserPoolGroup;
  public readonly adminGroup: cognito.CfnUserPoolGroup;
  public readonly webAclArn?: string;

  constructor(scope: Construct, id: string, props: AuthAndEdgeStackProps) {
    super(scope, id, props);

    const { config } = props;

    // 1. Amazon Cognito User Pool
    this.userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: `${config.projectName}-${config.stage}-user-pool`,
      selfSignUpEnabled: true,
      signInAliases: { email: true, username: false },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
        fullname: { required: false, mutable: true }
      },
      customAttributes: {
        company_id: new cognito.StringAttribute({ mutable: true })
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: config.removalPolicy
    });

    // 2. Cognito User Pool Groups (RBAC)
    this.adminGroup = new cognito.CfnUserPoolGroup(this, 'AdminGroup', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'admin',
      description: 'System Administrator Group',
      precedence: 1
    });

    this.recruiterGroup = new cognito.CfnUserPoolGroup(this, 'RecruiterGroup', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'recruiter',
      description: 'Recruiter and Hiring Manager Group',
      precedence: 2
    });

    this.candidateGroup = new cognito.CfnUserPoolGroup(this, 'CandidateGroup', {
      userPoolId: this.userPool.userPoolId,
      groupName: 'candidate',
      description: 'Candidate and Job Seeker Group',
      precedence: 3
    });

    // 3. User Pool App Client (SPA React Client)
    this.userPoolClient = new cognito.UserPoolClient(this, 'WebClient', {
      userPool: this.userPool,
      userPoolClientName: `${config.projectName}-${config.stage}-web-client`,
      authFlows: {
        userPassword: true,
        userSrp: true
      },
      accessTokenValidity: cdk.Duration.minutes(60),
      idTokenValidity: cdk.Duration.minutes(60),
      refreshTokenValidity: cdk.Duration.days(30),
      preventUserExistenceErrors: true
    });

    // 4. AWS WAF WebACL (Regional for API Gateway, toggled by config.enableWaf)
    if (config.enableWaf) {
      const webAcl = new wafv2.CfnWebACL(this, 'RegionalWebAcl', {
        name: `${config.projectName}-${config.stage}-regional-waf`,
        scope: 'REGIONAL',
        defaultAction: { allow: {} },
        visibilityConfig: {
          cloudWatchMetricsEnabled: true,
          metricName: `${config.projectName}-${config.stage}-waf-metrics`,
          sampledRequestsEnabled: true
        },
        rules: [
          {
            name: 'AWS-AWSManagedRulesCommonRuleSet',
            priority: 10,
            statement: {
              managedRuleGroupStatement: {
                vendorName: 'AWS',
                name: 'AWSManagedRulesCommonRuleSet'
              }
            },
            overrideAction: { none: {} },
            visibilityConfig: {
              cloudWatchMetricsEnabled: true,
              metricName: 'CommonRuleSet',
              sampledRequestsEnabled: true
            }
          },
          {
            name: 'AWS-AWSManagedRulesKnownBadInputsRuleSet',
            priority: 20,
            statement: {
              managedRuleGroupStatement: {
                vendorName: 'AWS',
                name: 'AWSManagedRulesKnownBadInputsRuleSet'
              }
            },
            overrideAction: { none: {} },
            visibilityConfig: {
              cloudWatchMetricsEnabled: true,
              metricName: 'KnownBadInputsRuleSet',
              sampledRequestsEnabled: true
            }
          },
          {
            name: 'AWS-AWSManagedRulesAmazonIpReputationList',
            priority: 30,
            statement: {
              managedRuleGroupStatement: {
                vendorName: 'AWS',
                name: 'AWSManagedRulesAmazonIpReputationList'
              }
            },
            overrideAction: { none: {} },
            visibilityConfig: {
              cloudWatchMetricsEnabled: true,
              metricName: 'AmazonIpReputationList',
              sampledRequestsEnabled: true
            }
          },
          {
            name: 'RateLimitPerIp',
            priority: 40,
            statement: {
              rateBasedStatement: {
                limit: 2000,
                aggregateKeyType: 'IP'
              }
            },
            action: { block: {} },
            visibilityConfig: {
              cloudWatchMetricsEnabled: true,
              metricName: 'RateLimitRule',
              sampledRequestsEnabled: true
            }
          }
        ]
      });

      this.webAclArn = webAcl.attrArn;
    }

    // Stack Outputs
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      description: 'Cognito User Pool ID',
      exportName: `${config.projectName}-${config.stage}-UserPoolId`
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
      exportName: `${config.projectName}-${config.stage}-UserPoolClientId`
    });

    if (this.webAclArn) {
      new cdk.CfnOutput(this, 'WebAclArnOutput', {
        value: this.webAclArn,
        description: 'WAF Regional WebACL ARN',
        exportName: `${config.projectName}-${config.stage}-WebAclArn`
      });
    }
  }
}

