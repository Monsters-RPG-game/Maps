import * as enums from '../../enums';
import * as errors from '../../errors';
import Log from '../../tools/logger';
import type * as types from '../../types';

export default class Router {
  async handleMessage(payload: types.IRabbitMessage): Promise<void> {
    Log.log('Server', 'Got new message');
    Log.log('Server', JSON.stringify(payload));

    switch (payload.target) {
      case enums.EMessageTargets.Map:
        return this.mapsMessage(payload);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  private async mapsMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      default:
        return new Promise((_resolve, reject) => {
          reject(new errors.IncorrectTargetError());
        });
    }
  }
}
