import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { has } from 'lodash';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region we will be using
AWS.config.update({ region: 'us-east-1' });
// Create SQS service client
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
// Replace with your account id and the queue name you setup
// const accountId = '1234567';
// const queueName = 'test';

const sendMsg = async params => {
  let resp;
  let err;
  try {
    const res = await sqs.sendMessage(params).promise();
    resp = res;
  } catch (e) { err = e; }
  return { resp, err };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const QueueUrl = process.env.DELETE_SQS;
  console.log('QueueUrl: ', QueueUrl);

  const params = {
    MessageBody: JSON.stringify({
      order_id: 1234,
      date: (new Date()).toISOString(),
    }),
    // QueueUrl: `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`,
    QueueUrl,
  };

  const { resp, err } = await sendMsg(params);
  console.log('err: ', err);
  console.log('resp: ', resp);

  // sqs.sendMessage(params, (err, data) => {
  //   if (err) {
  //     console.log('Error', err);
  //   } else {
  //     console.log('Successfully added message', data.MessageId);
  //   }
  // });

  const msg = has(event, 'httpMethod');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `GoGoGo${msg} Serverless Webpack (Typescript) v1.0! Your function executed successfully!`,
      input: event,
    }, null, 2),
  };
};
