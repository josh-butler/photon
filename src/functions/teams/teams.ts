import { APIGatewayProxyEvent } from 'aws-lambda';

enum leagueEnum {
  nfl = 'nfl',
  nba = 'nba',
}

// teams = new TeamsEndpoint(event)
// return teams.delete()
// - validate()
// - getparams()

class Teams {
  event: APIGatewayProxyEvent;
  params: any
  constructor(event: APIGatewayProxyEvent) {
    this.event = event;
  }

  validate() {
    return Object.keys(leagueEnum).some(k => k === leagueAbbrev)
  }

  delete() {
    return "Hello, " + this.greeting;
  }
}

