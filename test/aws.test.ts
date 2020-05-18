// import { createSandbox } from 'sinon';
// import sinon from 'ts-sinon';
// import { createDocumentClient, createSecretsClient } from '../src/aws/aws';
// import { createSecretsClient } from '../src/aws/aws';
// import { createDocumentClient } from '../src/aws/aws';
// var sandbox = require('sinon').createSandbox();

// const sandbox = createSandbox();
// const sandbox = sinon.sandbox.create();
// const sandbox = require('sinon').createSandbox();

// const mockEnvironment = {
//   REGION: 'us-east-1',
//   LOCAL_DDB: 'true',
// };

// beforeAll(() => {
  // process.env = Object.assign(process.env, { REGION: 'us-east-1' });
  // sinon.replace(process, 'env', mockEnvironment);
  // sandbox.stub(process, 'env', { REGION: 'us-east-1' });

  // process.env.REGION = 'us-east-1';
  // delete process.env.LOCAL_DDB;
// });

// beforeAll(() => {
//   sinon.restore();
// });

// afterEach(() => {
//   sandbox.restore();
// });


// sandbox.stub(process, 'env', {SOME_KEY: 'some value'});

describe('AWSClientCreators', () => {
  test('creates an DynamoDB client', async () => {
    process.env.REGION = 'us-east-1';
    const { createDocumentClient } = (await import('../src/aws/aws'));
    // const createDocumentClient = (await import('../src/aws/aws')).createDocumentClient;
    const client = createDocumentClient();
    expect(client).toBeDefined();
  });

  // test('creates a local DynamoDB client', async () => {
  //   process.env.LOCAL_DDB = 'true';
  //   const client = createDocumentClient();
  //   expect(client).toBeDefined();
  //   delete process.env.LOCAL_DDB;
  // });

  // test('creates a Secrets Manager client', async () => {
  //   const client = createSecretsClient();
  //   expect(client).toBeDefined();
  // });
});
