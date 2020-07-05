import { SQS } from 'aws-sdk';

const region = process.env.REGION || 'us-east-1';
const createSqsClient = () => new SQS({ region });

// TODO move ^^^ to util.aws
// import { createSqsClient } from './aws';

// const QueueUrl = process.env.SQS_Q_URL;

class TestSqsClient {
  params: any;

  constructor() {
    this.params = {};
  }

  promise() {
    const { QueueUrl } = this.params;
    return new Promise((res, rej) => {
      if (QueueUrl) { res({ MessageId: '1' }); }
      rej(new Error('Invalid QueueUrl'));
    });
  }

  sendMessage(params) {
    this.params = params;
    return this;
  }
}

const getSqsClient = () => {
  if (process.env.APP_ENV === 'test') {
    return new TestSqsClient();
  }
  return createSqsClient();
};


class AWSSqs {
  sqs: any;

  constructor() {
    this.sqs = getSqsClient();
  }

  async sendMsg(params) {
    let resp;
    let err;
    try {
      resp = await this.sqs.sendMessage(params).promise();
    } catch (e) {
      err = e;
    }
    return { resp, err };
  }

  async send(params) {
    return this.sendMsg(params);
  }
}

export { AWSSqs };
