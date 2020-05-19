import 'source-map-support/register';
import { AWSSecrets } from './teams/secretsAdapter';
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

const buildIAMPolicy = (userId, effect, resource, context) => {
  console.log(`buildIAMPolicy ${userId} ${effect} ${resource}`);
  const policy = {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };
  return policy;
};

const getSecretToken = async () => {
  let secret;
  const appSecret = process.env.APP_SECRET;
  if (!appSecret) {
    const secrets = new AWSSecrets();
    try {
      const data = await secrets.secret();
      process.env.APP_SECRET = JSON.stringify(data);
      secret = data.token;
    } catch (error) {
      console.log('error: ', error);
    }
  } else {
    const data = JSON.parse(appSecret);
    secret = data.token;
  }
  return secret;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event, _context) => {
  const { authorizationToken, methodArn } = event;

  const jwtSecret = await getSecretToken();
  if (jwtSecret) {
    console.log('jwtSecret: ', jwtSecret);
    try {
      // Verify JWT
      // const decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET);
      const decoded = jwt.verify(authorizationToken, jwtSecret);
      const { role, user } = decoded;
      const isAllowed = role === 'admin';
      const effect = isAllowed ? 'Allow' : 'Deny';

      // Return an IAM policy document for the current endpoint
      const userId = user.username;
      const authorizerContext = { user: JSON.stringify(user) };
      const policyDocument = buildIAMPolicy(userId, effect, methodArn, authorizerContext);
      return policyDocument;
    } catch (err) {
      console.log(err.message);
      throw new Error('Unauthorized');
    }
  } else {
    throw new Error('Unauthorized');
  }
};
