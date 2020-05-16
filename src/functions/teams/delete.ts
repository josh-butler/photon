import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { TeamsDelete } from './teams'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const teams = new TeamsDelete(event)
  return await teams.delete()
};
