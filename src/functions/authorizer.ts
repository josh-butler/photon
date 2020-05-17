import 'source-map-support/register';
import jwt from 'jsonwebtoken';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event, _context) => {
  const { authorizationToken, methodArn } = event;
  try {
    // Verify JWT
    const decoded = jwt.verify(authorizationToken, process.env.JWT_SECRET);
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
};
