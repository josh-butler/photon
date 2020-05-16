import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { has } from 'lodash';
import { createDocumentClient } from '../../aws/dynamodb';
import { AwsSecret } from '../../aws/secrets';

const TableName = process.env.TABLE_NAME;
const ddb = createDocumentClient();

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
  const secret = await AwsSecret();
  console.log('secret: ', secret);
  const { token } = secret;
  console.log('token: ', token);

  const msg = has(event, 'httpMethod');
  console.log('msg: ', msg);

  // const resp = await listItems();
  // console.log('resp: ', resp);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Teams DELETE',
      // input: event,
    }, null, 2),
  };
};
