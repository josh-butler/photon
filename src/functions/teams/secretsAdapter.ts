import { createSecretsClient } from '../../aws/aws';

class TestSecretsClient {
  params: any;

  constructor() {
    this.params = {};
  }

  promise() {
    const { SecretId } = this.params;
    return new Promise((res, rej) => {
      if (SecretId === 'test') {
        res({ SecretString: JSON.stringify({ secret: 'test' }) });
      }
      if (SecretId === 'invalid') {
        rej(new Error('Invalid Secret ID'));
      }
      res({});
    });
  }

  getSecretValue(params) {
    this.params = params;
    return this;
  }
}

const getSecretsClient = () => {
  if (process.env.APP_ENV === 'test') {
    return new TestSecretsClient();
  }
  return createSecretsClient();
};

const getSecretId = () => {
  const { SECRET_ID } = process.env;
  if (!SECRET_ID) {
    throw new Error('Secret ID not found');
  }
  return SECRET_ID;
};

class AWSSecrets {
  sm: any;

  secretId: string;

  constructor() {
    this.sm = getSecretsClient();
    this.secretId = getSecretId();
  }

  async secret() {
    const SecretId = this.secretId;
    let resp: any;
    let secret: any;
    try {
      resp = await this.sm.getSecretValue({ SecretId }).promise();
    } catch (err) {
      throw new Error(err.message);
    }

    if (resp && resp.SecretString) {
      secret = JSON.parse(resp.SecretString);
    } else {
      throw new Error('Chosen secret not SecretString type');
    }

    return secret;
  }
}

export { AWSSecrets };
