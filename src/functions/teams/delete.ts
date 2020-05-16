import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import { createDocumentClient } from '../../aws/dynamodb';

const TableName = process.env.TABLE_NAME;
const ddb = createDocumentClient();

enum leagueEnum {
  nfl = 'nfl',
  nba = 'nba',
}

const respOk = (data: any = {}): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

const parseEvent = event => {
  const { pathParameters: { leagueAbbrev = null, id = null } = {} } = event
  const isValid = Object.keys(leagueEnum).some(k => k === leagueAbbrev)
  return { isValid, leagueAbbrev, id }
}

const deleteItem = async params => {
  let resp, err;
  try {
    resp = await ddb.delete(params).promise()
  } catch (error) {
    err = error
  }
  return { resp, err }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { isValid, id } = parseEvent(event)
  if (isValid) {
    const params = { TableName, Key: { id }, ReturnValues: 'ALL_OLD' }
    const { resp, err } = await deleteItem(params)
    if (!err) {
      return respOk(resp.Attributes)
    }
    return { statusCode: err.statusCode, body: err.message }
  }
  return { statusCode: 400, body: 'Bad Request' }
};
