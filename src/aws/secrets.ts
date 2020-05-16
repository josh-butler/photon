import { SecretsManager } from 'aws-sdk';

const region = process.env.REGION;
const secretId = process.env.SECRET_ID;

const sm = new SecretsManager({ region });

const getSecret = SecretId => sm.getSecretValue({ SecretId }).promise();

const AwsSecret = async () => {
  let resp: any;
  let secret: any = {};
  try {
    resp = await getSecret(secretId);
  } catch (err) {
    console.error(err.message);
  }

  if (resp && resp.SecretString) {
    secret = JSON.parse(resp.SecretString);
  }

  return secret;
};

export { AwsSecret };
