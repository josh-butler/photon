import { config, DynamoDB, SecretsManager } from 'aws-sdk';


const region = process.env.REGION;
const isLocalDdb = process.env.LOCAL_DDB === 'true';

const createDocumentClient = () => {
  const options = isLocalDdb ? { region } : { region: 'localhost', endpoint: 'http://localhost:8000' };
  config.update(options);
  return new DynamoDB.DocumentClient();
};

const createSecretsClient = () => new SecretsManager({ region });

const getSecret = () async => {
    
}

async function getAwsSecretAsync (secretName) {
    var error;
    var response = await getAwsSecret(secretName).catch(err => (error = err));
    return [error, response];
  }
  

export { createDocumentClient };
