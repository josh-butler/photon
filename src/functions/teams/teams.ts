import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createDocumentClient } from '../../aws/dynamodb';

enum leagueEnum {
  nfl = 'nfl',
  nba = 'nba',
}

const respOk = (data: any = {}): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

class TestDBClient {
  delete(params) {
    const { TableName } = params;
    return new Promise((res, rej) => {
      if (TableName) {
        res({ Attributes: { id: '1' } });
      }
      rej(new Error('Invalid Table'));
    });
  }
}

interface TeamsDeleteProps {
  id: string,
  leagueAbbrev: string,
  TableName: string,
}

class TeamsDelete {
  event: APIGatewayProxyEvent;
  props: TeamsDeleteProps;
  db: any

  constructor(event: APIGatewayProxyEvent) {
    this.event = event;
    this.props = this.defaultProps()
    this.db = this.dbClient();
  }

  defaultProps() {
    const { pathParameters: { leagueAbbrev, id } } = this.event;
    const TableName = process.env.TABLE_NAME;
    return { TableName, leagueAbbrev, id }
  }

  dbClient() {
    if (process.env.NODE_ENV === 'test') {
      return new TestDBClient()
    }
    return createDocumentClient();
  }

  dbParams() {
    const { TableName, id } = this.props;
    return { TableName, Key: { id }, ReturnValues: 'ALL_OLD' }
  }

  isValid({ leagueAbbrev } = this.props) {
    return Object.keys(leagueEnum).some(k => k === leagueAbbrev)
  }

  async deleteItem(params) {
    let resp, err;
    try {
      resp = await this.db.delete(params).promise()
    } catch (error) {
      err = error
    }
    return { resp, err }
  }

  async delete() {
    if (this.isValid()) {
      const { resp, err } = await this.deleteItem(this.dbParams())
      if (!err) {
        return respOk(resp.Attributes)
      }
    }
    return { statusCode: 400, body: 'Bad Request' }
  }
}

export { TeamsDelete }
