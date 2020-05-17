import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
// import { has } from 'lodash';
// import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  console.log('event: ', event);
  return {
    statusCode: 200,
    body: 'okok',
  };
};
