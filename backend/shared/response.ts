import type { APIGatewayProxyResult } from 'aws-lambda';

export interface ResponseMeta {
  pageLimit?: number;
  nextCursor?: string | null;
  hasMore?: boolean;
  total?: number;
  [key: string]: unknown;
}

export interface ErrorDetail {
  field?: string;
  issue: string;
}

export const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
};

/**
 * Standard Success Response Envelope (DOC-SW-04-API Section 1.3)
 */
export function successResponse<T>(
  data: T,
  meta?: ResponseMeta,
  statusCode = 200
): APIGatewayProxyResult {
  const body: { success: boolean; data: T; meta?: ResponseMeta } = {
    success: true,
    data
  };

  if (meta !== undefined) {
    body.meta = meta;
  }

  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body)
  };
}

/**
 * Standard Error Response Envelope (DOC-SW-04-API Section 1.3)
 */
export function errorResponse(
  code: string,
  message: string,
  statusCode = 400,
  details: ErrorDetail[] = [],
  traceId?: string
): APIGatewayProxyResult {
  const body = {
    success: false,
    error: {
      code,
      message,
      ...(details.length > 0 ? { details } : {}),
      traceId: traceId || `trace-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }
  };

  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body)
  };
}
