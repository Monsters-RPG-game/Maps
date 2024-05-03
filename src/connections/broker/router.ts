import * as enums from '../../enums';
import * as errors from '../../errors';
import CharacterLocationController from '../../modules/locations/handler';
import MapsController from '../../modules/maps/handler';
import Log from '../../tools/logger';
import type * as types from '../../types';

export default class Router {
  private readonly _maps: MapsController;
  private readonly _characterLocation: CharacterLocationController;

  constructor() {
    this._maps = new MapsController();
    this._characterLocation = new CharacterLocationController();
  }

  private get maps(): MapsController {
    return this._maps;
  }

  private get characterLocation(): CharacterLocationController {
    return this._characterLocation;
  }

  async handleMessage(payload: types.IRabbitMessage): Promise<void> {
    Log.log('Server', 'Got new message');
    Log.log('Server', JSON.stringify(payload));

    switch (payload.target) {
      case enums.EMessageTargets.Map:
        return this.mapsMessage(payload);
      case enums.EMessageTargets.CharacterLocation:
        return this.characterLocationMessage(payload);
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
      case enums.EMapsTargets.Update:
        return this.maps.update(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }

  private async characterLocationMessage(payload: types.IRabbitMessage): Promise<void> {
    switch (payload.subTarget) {
      case enums.ECharacterLocationTargets.Create:
        return this.characterLocation.create(payload.payload, payload.user);
      case enums.ECharacterLocationTargets.Get:
        return this.characterLocation.get(payload.payload, payload.user);
      case enums.ECharacterLocationTargets.Change:
        return this.characterLocation.change(payload.payload, payload.user);
      default:
        throw new errors.IncorrectTargetError();
    }
  }
}
