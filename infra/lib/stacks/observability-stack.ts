import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { EnvironmentConfig } from '../../config/environment';

export interface ObservabilityStackProps extends cdk.StackProps {
  config: EnvironmentConfig;
  restApi: apigateway.RestApi;
  healthFunction: lambda.IFunction;
  cvQueue: sqs.IQueue;
  cvDlq: sqs.IQueue;
}

export class ObservabilityStack extends cdk.Stack {
  public readonly dashboard: cloudwatch.Dashboard;
  public readonly dlqAlarm: cloudwatch.Alarm;
  public readonly api5xxAlarm: cloudwatch.Alarm;

  constructor(scope: Construct, id: string, props: ObservabilityStackProps) {
    super(scope, id, props);

    const { config, restApi, healthFunction, cvQueue, cvDlq } = props;

    // 1. CloudWatch Dashboard
    this.dashboard = new cloudwatch.Dashboard(this, 'SystemDashboard', {
      dashboardName: `${config.projectName}-${config.stage}-system-dashboard`
    });

    // 2. Metrics Definition
    const apiRequests = restApi.metricCount({
      statistic: 'Sum',
      period: cdk.Duration.minutes(1)
    });

    const api5xxErrors = restApi.metricServerError({
      statistic: 'Sum',
      period: cdk.Duration.minutes(1)
    });

    const apiLatency = restApi.metricLatency({
      statistic: 'p95',
      period: cdk.Duration.minutes(1)
    });

    const lambdaErrors = healthFunction.metricErrors({
      statistic: 'Sum',
      period: cdk.Duration.minutes(1)
    });

    const lambdaDuration = healthFunction.metricDuration({
      statistic: 'Average',
      period: cdk.Duration.minutes(1)
    });

    const queueVisible = cvQueue.metricApproximateNumberOfMessagesVisible({
      statistic: 'Maximum',
      period: cdk.Duration.minutes(1)
    });

    const dlqVisible = cvDlq.metricApproximateNumberOfMessagesVisible({
      statistic: 'Maximum',
      period: cdk.Duration.minutes(1)
    });

    // 3. Add Widgets to Dashboard
    this.dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'API Gateway Traffic & Errors',
        left: [apiRequests],
        right: [api5xxErrors],
        width: 12
      }),
      new cloudwatch.GraphWidget({
        title: 'API Gateway Latency (p95 ms)',
        left: [apiLatency],
        width: 12
      })
    );

    this.dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Execution & Errors',
        left: [lambdaDuration],
        right: [lambdaErrors],
        width: 12
      }),
      new cloudwatch.GraphWidget({
        title: 'Queue Depth & DLQ Alert Backlog',
        left: [queueVisible],
        right: [dlqVisible],
        width: 12
      })
    );

    // 4. CloudWatch Alarms
    this.dlqAlarm = new cloudwatch.Alarm(this, 'DlqMessagesAlarm', {
      alarmName: `${config.projectName}-${config.stage}-dlq-not-empty`,
      alarmDescription: 'Alert when any failed message lands in the CV Processing DLQ',
      metric: dlqVisible,
      threshold: 1,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING
    });

    this.api5xxAlarm = new cloudwatch.Alarm(this, 'Api5xxErrorsAlarm', {
      alarmName: `${config.projectName}-${config.stage}-api-5xx-spike`,
      alarmDescription: 'Alert when API Gateway 5XX server errors exceed 5 in a minute',
      metric: api5xxErrors,
      threshold: 5,
      evaluationPeriods: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING
    });

    // Stack Outputs
    new cdk.CfnOutput(this, 'DashboardNameOutput', {
      value: this.dashboard.dashboardName,
      description: 'CloudWatch Dashboard Name',
      exportName: `${config.projectName}-${config.stage}-DashboardName`
    });

    new cdk.CfnOutput(this, 'DlqAlarmArnOutput', {
      value: this.dlqAlarm.alarmArn,
      description: 'DLQ CloudWatch Alarm ARN',
      exportName: `${config.projectName}-${config.stage}-DlqAlarmArn`
    });
  }
}

