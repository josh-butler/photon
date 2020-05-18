import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createDocumentClient } from '../../aws/dynamodb';

enum leagueEnum {
  nfl = 'nfl',
  nba = 'nba',
}

class TestDBClient {
  params: any;

  constructor() {
    this.params = {};
  }

  promise() {
    const { TableName, ReturnValues } = this.params;
    return new Promise((res, rej) => {
      if (TableName) {
        if (ReturnValues === 'ALL_OLD') {
          res({ Attributes: { id: '1' } });
        }
        res({});
      }
      const err = new Error('Invalid Table');
      rej(err.message);
    });
  }

  delete(params) {
    this.params = params;
    return this;
  }
}

const respOk = (data: any = {}): APIGatewayProxyResult => ({
  statusCode: 200,
  body: JSON.stringify(data),
});

const getDbClient = () => {
  if (process.env.APP_ENV === 'test') {
    return new TestDBClient();
  }
  return createDocumentClient();
};

interface TeamsDeleteProps {
  id: string,
  leagueAbbrev: string,
  TableName: string,
}

class TeamsDelete {
  event: APIGatewayProxyEvent;

  props: TeamsDeleteProps;

  db: any;

  constructor(event: APIGatewayProxyEvent) {
    this.event = event;
    this.props = this.defaultProps();
    this.db = getDbClient();
  }

  defaultProps() {
    const { pathParameters: { leagueAbbrev, id } } = this.event;
    const TableName = process.env.TABLE_NAME;
    return { TableName, leagueAbbrev, id };
  }

  dbParams() {
    const { TableName, id } = this.props;
    return { TableName, Key: { id }, ReturnValues: 'ALL_OLD' };
  }

  isValid({ leagueAbbrev } = this.props) {
    return Object.keys(leagueEnum).some(k => k === leagueAbbrev);
  }

  async deleteItem(params) {
    let resp; let
      err;
    try {
      resp = await this.db.delete(params).promise();
    } catch (error) {
      err = error;
    }
    return { resp, err };
  }

  async delete() {
    if (this.isValid()) {
      const { resp, err } = await this.deleteItem(this.dbParams());
      if (!err) {
        return respOk(resp.Attributes);
      }
      return { statusCode: 500, body: err };
    }
    return { statusCode: 400, body: 'Bad Request' };
  }
}

export { TeamsDelete };
