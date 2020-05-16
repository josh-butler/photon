import { config, DynamoDB } from 'aws-sdk';

const region = process.env.REGION;
const isLocalDdb = process.env.LOCAL_DDB === 'true';

const createDocumentClient = () => {
  const options = isLocalDdb ? { region } : { region: 'localhost', endpoint: 'http://localhost:8000' };
  config.update(options);
  return new DynamoDB.DocumentClient();
};

export { createDocumentClient };
