// import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
// import { has } from 'lodash';

// const sendMsg = async params => {
//   let resp;
//   let err;
//   try {
//     const res = await sqs.sendMessage(params).promise();
//     resp = res;
//   } catch (e) { err = e; }
//   return { resp, err };
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: any = async (event, _context) => {
  console.log('event: ', event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'okok!',
    }, null, 2),
  };
};
