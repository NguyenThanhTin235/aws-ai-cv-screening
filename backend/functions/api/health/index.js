exports.handler = async (event) => {
  const stage = process.env.STAGE || 'dev';
  const region = process.env.AWS_REGION || 'us-east-1';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'GET,OPTIONS'
    },
    body: JSON.stringify({
      status: 'UP',
      service: 'cv-portal-api',
      stage,
      timestamp: new Date().toISOString(),
      region
    })
  };
};
