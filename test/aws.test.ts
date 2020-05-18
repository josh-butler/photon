import { createDocumentClient, createSecretsClient } from '../src/aws/aws';

beforeAll(() => {
  process.env.REGION = 'us-east-1';
  delete process.env.LOCAL_DDB;
});

describe('AWSClientCreators', () => {
  test('creates an DynamoDB client', async () => {
    process.env.REGION = 'us-east-1';
    const client = createDocumentClient();
    expect(client).toBeDefined();
  });

  // test('creates a local DynamoDB client', async () => {
  //   process.env.LOCAL_DDB = 'true';
  //   const client = createDocumentClient();
  //   expect(client).toBeDefined();
  //   delete process.env.LOCAL_DDB;
  // });

  test('creates a Secrets Manager client', async () => {
    const client = createSecretsClient();
    expect(client).toBeDefined();
  });
});
