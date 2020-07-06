import { amqp } from 'amqp';

interface RMQProps {
  host: string;
  port: string;
  username: string;
  password: string;
  vhost: string;
  exchange: string;
}

class RMQ {
  params: any;

  props: RMQProps;

  conn: any;

  exc: any;

  constructor(params) {
    this.params = params;
    this.props = this.defaultProps();
  }

  defaultProps() {
    const {
      host, port = '5672', username, password, vhost, exchange,
    } = this.params;
    return {
      host, port, username, password, vhost, exchange,
    };
  }

  get options() {
    const {
      host, port, username, password, vhost,
    } = this.props;

    return {
      host,
      port,
      login: username,
      password,
      vhost,
      connectionTimeout: 500,
      authMechanism: 'AMQPLAIN',
      noDelay: true,
      ssl: { enabled: false },
    };
  }

  async disconnect() {
    if (this.conn) {
      await this.conn.close();
      this.conn = null;
    }
  }

  connected() {
    // return this.client && this.client.isConnected();
    return this.conn;
  }

  // async connect() {
  //   try {
  //     this.client = await this.getClient();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // sendMessage: async (messageParams = {}) => {
  //   const exchange = await getExchange()
  //   const torqMessage = createTorqMessage(messageParams)
  //   const routingKey = messageParams.routingKey || ''
  //   return new Promise((resolve, reject) => {
  //     exchange.publish(routingKey, { body: torqMessage }, { }, (isError = false) => {
  //       console.log({ event: 'publish', isError, routingKey, message: JSON.stringify(torqMessage) })
  //       if (isError) {
  //         reject(Error('Publish failed'))
  //       } else {
  //         resolve()
  //       }
  //     })
  //   })
  // },

  async getExchange() {
    const { exchange } = this.props;
    const conn = await this.connect();
    if (!conn) {
      throw new Error('Connection failure');
    }

    const options = {
      type: 'topic', durable: true, autoDelete: false, confirm: true,
    };

    return new Promise((res, rej) => {
      const exc = conn.exchange(exchange, options, ex => res(ex));
      exc.on('error', err => {
        console.log({ event: 'exchangeError', err });
        rej(err);
      });
    });
  }

  async getConnection() {
    return new Promise((res, rej) => {
      const conn = amqp.createConnection(this.options);
      conn.on('ready', () => res(conn));
      conn.on('error', err => {
        console.log({ event: 'connectionError', err });
        rej(err);
      });
    });
  }

  async exchange() {
    if (!this.exc) {
      try {
        console.info('Getting exchange...');
        this.exc = await this.getExchange();
      } catch (e) {
        console.error(e);
        this.exc = null;
      }
    }
    return this.exc;
  }

  async connect() {
    if (!this.connected()) {
      try {
        console.info('Connecting to RMQ...');
        this.conn = await this.getConnection();
      } catch (e) {
        console.error(e);
        this.conn = null;
      }
    }
    return this.conn;
  }


  // async getAll() {
  //   const client = await this.getClient();
  //   const collection = client.db().collection('users');
  //   return new Promise((res, rej) => {
  //     collection.find({}).toArray((err, result) => {
  //       if (err) {
  //         rej(err);
  //       } else {
  //         res(result);
  //       }
  //     });
  //   });
  // }

  // async getNames() {
  //   let names;
  //   try {
  //     names = await this.getAll();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   return names;
  // }

  // async listDatabases() {
  //   const client = await this.getClient();
  //   if (client) {
  //     const databasesList = await client.db().admin().listDatabases();
  //     console.log('Databases:');
  //     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  //   } else {
  //     console.log('Return error!!!');
  //   }
  // }
}

export { RMQ };
