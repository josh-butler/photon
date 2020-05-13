import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { has } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const msg = has(event, 'httpMethod');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `GoGo${msg} Serverless Webpack (Typescript) v1.0! Your function executed successfully!`,
      input: event,
    }, null, 2),
  };
};
