import { config, DynamoDB, SecretsManager } from 'aws-sdk';

const region = process.env.REGION;
const isLocalDdb = process.env.LOCAL_DDB === 'true';

const createDocumentClient = () => {
  const options = isLocalDdb ? { region: 'localhost', endpoint: 'http://localhost:8000' } : { region };
  console.log('options: ', options);
  config.update(options);
  return new DynamoDB.DocumentClient();
};

const createSecretsClient = () => new SecretsManager({ region });

export { createDocumentClient, createSecretsClient };
