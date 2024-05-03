import * as enums from '../../enums';
import * as errors from '../../errors';
import MapsController from '../../modules/maps/handler';
import Log from '../../tools/logger';
import type * as types from '../../types';

export default class Router {
  private readonly _maps: MapsController;

  constructor() {
    this._maps = new MapsController();
  }

  private get maps(): MapsController {
    return this._maps;
  }

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
      case enums.EMapsTargets.Create:
        return this.maps.create(payload.payload, payload.user);
      case enums.EMapsTargets.Get:
        return this.maps.get(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
