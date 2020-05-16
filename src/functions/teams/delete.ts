import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { has } from 'lodash';
import { createDocumentClient } from '../../aws/dynamodb';

const TableName = process.env.TABLE_NAME;

const ddb = createDocumentClient();

// const ddb = new DynamoDB.DocumentClient({
//   region,
//   endpoint: 'http://localhost:8000',
// });

// config.update({
//   region: 'us-east-1',
//   endpoint: "http://localhost:8000"
// });


// const TableName = process.env.TABLE_NAME;

// const AWS = require('aws-sdk');

// const ddb = new AWS.DynamoDB.DocumentClient({ region });
// const ddb = new DynamoDB.DocumentClient({ region });

const listItems = async () => {
  const params = {
    TableName,
  };
  try {
    const data = await ddb.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const msg = has(event, 'httpMethod');
  console.log('msg: ', msg);
  console.log('ddb: ', ddb);

  const resp = await listItems();
  console.log('resp: ', resp);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Teams DELETE',
      // input: event,
    }, null, 2),
  };
};
