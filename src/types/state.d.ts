import type Broker from '../connections/broker/index.js';
import type Mongo from '../connections/mongo/index.js';
import type Bootstrap from '../tools/bootstrap.js';

export interface IState {
  mongo: Mongo;
  broker: Broker;
  controllers: Bootstrap;
}
