import { AWSSecrets } from './secretsAdapter';

beforeAll(() => {
  process.env.APP_ENV = 'test';
  process.env.SECRET_ID = 'test';
});

afterAll(() => {
  delete process.env.APP_ENV;
  delete process.env.SECRET_ID;
});

describe('AWSSecretsManager', () => {
  test('returns-correct-secret', async () => {
    const secrets = new AWSSecrets();
    const secret = await secrets.secret();
    expect(secret).toEqual({ secret: 'test' });
  });

  test('throws-when-secret-id-missing', async () => {
    delete process.env.SECRET_ID;
    expect(() => new AWSSecrets())
      .toThrowError(new Error('Secret ID not found!'));
  });

  test('errors-when-secret-id-invalid', async () => {
    process.env.SECRET_ID = 'invalid';
    let secret;
    let err;
    const secrets = new AWSSecrets();
    try {
      secret = await secrets.secret();
    } catch (e) {
      err = e;
    }
    expect(secret).toBeUndefined();
    expect(err).toEqual(new Error('Invalid Secret ID!'));
  });

  test('secret-undefined-when-not-secretstring-type', async () => {
    process.env.SECRET_ID = 'other';
    let secret;
    let err;
    const secrets = new AWSSecrets();
    try {
      secret = await secrets.secret();
    } catch (e) {
      err = e;
    }
    expect(secret).toBeUndefined();
    expect(err).toEqual(new Error('Chosen secret not SecretString type!'));
  });
});
