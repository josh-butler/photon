import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { httpMethod } = event;
  console.log('httpMethod: ', httpMethod);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go!! Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
};
