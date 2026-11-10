import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const region = process.env.AWS_REGION || 'us-east-1';

export const TABLE_NAME = process.env.TABLE_NAME || 'cv-portal-dev-main-table';

const rawClient = new DynamoDBClient({ region });

export const docClient = DynamoDBDocumentClient.from(rawClient, {
  marshallOptions: {
    removeUndefinedValues: true,
    convertEmptyValues: false
  },
  unmarshallOptions: {
    wrapNumbers: false
  }
});
