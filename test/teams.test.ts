import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { TeamsDelete } from '../src/functions/teams/teams'
import { handler } from '../src/functions/teams/delete'

const event: APIGatewayProxyEvent = {
  body: '',
  headers: { accept: "application/json" },
  multiValueHeaders: { "accept-encoding": ["gzip, deflate, br"] },
  httpMethod: 'GET',
  isBase64Encoded: false,
  path: '',
  pathParameters: {},
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: {},
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      claims: undefined,
      principalId: 'offlineContext_authorizer_principalId'
    },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    extendedRequestId: 'cka9roy2d00007v8n3vsr5vdl',
    httpMethod: 'DELETE',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: "52.255.255.12",
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
      user: null,
      apiKey: null,
      apiKeyId: null,
    },
    path: '/dev/draftTeams/{leagueAbbrev}/{id}',
    protocol: 'HTTP/1.1',
    requestId: 'cka9roy2d00017v8nbb77hgk3',
    requestTime: '16/May/2020:11:10:14 -0400',
    requestTimeEpoch: 1589641814376,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/draftTeams/nfl/abc123',
    stage: 'dev'
  },
  resource: ''
};

const context: Context = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'testFunc',
  functionVersion: '$LATEST',
  invokedFunctionArn: 'testArn',
  memoryLimitInMB: '128',
  awsRequestId: 'ckab3oj6k00022t8n6jv5hzqw',
  logGroupName: 'testLogGroup',
  logStreamName: 'testLogstream',
  getRemainingTimeInMillis: () => 0,
  done: () => true,
  fail: () => false,
  succeed: () => true,
}

beforeAll(() => {
  process.env.APP_ENV = 'test'
});

afterAll(() => {
  delete process.env.APP_ENV
});

describe('TeamsDeleteHandler', () => {
  test('Returns 400 for invalid pathParameters', async () => {
    const result = await handler(event, context, (err, res) => err || res)
    const expected = { statusCode: 400, body: 'Bad Request' }
    expect(result).toEqual(expected);
  });
});


describe('TeamsDeleteEvents', () => {
  test('returns-correct-resp', async () => {
    const teams = new TeamsDelete(event)
    const resp = await teams.delete()
    const expected = { statusCode: 400, body: 'Bad Request' }
    expect(resp).toEqual(expected);
  });

  test('returns-200-given-valid-pathParameters', async () => {
    process.env.TABLE_NAME = 'test'
    const pathParameters = { leagueAbbrev: 'nfl', id: 'abc123' }
    const validEvent = { ...event, pathParameters }
    const teams = new TeamsDelete(validEvent)
    const resp = await teams.delete()
    const expected = { statusCode: 200, body: JSON.stringify({ id: '1' }) }
    expect(resp).toEqual(expected);
  });
});


