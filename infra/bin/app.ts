#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { getEnvironmentConfig } from '../config/environment';
import { AuthAndEdgeStack } from '../lib/stacks/auth-and-edge-stack';
import { StorageAndQueueStack } from '../lib/stacks/storage-and-queue-stack';
import { ComputeAndApiStack } from '../lib/stacks/compute-and-api-stack';
import { ObservabilityStack } from '../lib/stacks/observability-stack';

const app = new cdk.App();
const config = getEnvironmentConfig();

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
  region: config.region
};

// 1. Auth & Edge Stack (Cognito User Pool, App Client, RBAC Groups, WAF)
const authAndEdgeStack = new AuthAndEdgeStack(
  app,
  `${config.projectName}-${config.stage}-auth-and-edge`,
  {
    env,
    config,
    description: `Auth & Edge Stack for ${config.projectName} (${config.stage})`
  }
);

// 2. Storage & Queue Stack (S3 Quarantine, DynamoDB Main Table, SQS, DLQ, KMS)
const storageAndQueueStack = new StorageAndQueueStack(
  app,
  `${config.projectName}-${config.stage}-storage-and-queue`,
  {
    env,
    config,
    description: `Storage & Queue Stack for ${config.projectName} (${config.stage})`
  }
);

// 3. Compute & API Stack (API Gateway REST, Cognito Authorizer, Health Lambda, CloudFront, WAF)
const computeAndApiStack = new ComputeAndApiStack(
  app,
  `${config.projectName}-${config.stage}-compute-and-api`,
  {
    env,
    config,
    userPool: authAndEdgeStack.userPool,
    mainTable: storageAndQueueStack.mainTable,
    quarantineBucket: storageAndQueueStack.quarantineBucket,
    webAclArn: authAndEdgeStack.webAclArn,
    description: `Compute & API Stack for ${config.projectName} (${config.stage})`
  }
);
computeAndApiStack.addStackDependency(authAndEdgeStack);
computeAndApiStack.addStackDependency(storageAndQueueStack);

// 4. Observability Stack (CloudWatch Dashboard, Alarms)
const observabilityStack = new ObservabilityStack(
  app,
  `${config.projectName}-${config.stage}-observability`,
  {
    env,
    config,
    restApi: computeAndApiStack.restApi,
    healthFunction: computeAndApiStack.healthFunction,
    cvQueue: storageAndQueueStack.cvQueue,
    cvDlq: storageAndQueueStack.cvDlq,
    description: `Observability & Monitoring Stack for ${config.projectName} (${config.stage})`
  }
);
observabilityStack.addStackDependency(computeAndApiStack);
observabilityStack.addStackDependency(storageAndQueueStack);

// Global Tagging
const tags = {
  Project: config.projectName,
  Environment: config.stage,
  ManagedBy: 'AWS-CDK',
  ArchitectureVersion: 'v12.0-Pure-Serverless'
};

Object.entries(tags).forEach(([key, value]) => {
  cdk.Tags.of(app).add(key, value);
});

app.synth();

