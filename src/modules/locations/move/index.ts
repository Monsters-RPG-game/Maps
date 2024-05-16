import ChangeCharacterLocationDto from './dto';
import { IncorrectLocationTarget } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import MapsController from '../../maps/get';
import Rooster from '../rooster';
import type { IChangeCharacterLocationDto } from './types';
import type { EModules } from '../../../enums';
import type { ILocalUser } from '../../../types';
import type { IMapEntity } from '../../maps/entity';
import type { ICharacterLocationEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.CharacterLocation> {
  constructor() {
    super(new Rooster());
    this._mapsController = new MapsController();
  }

  private _mapsController: MapsController;

  private get mapsController(): MapsController {
    return this._mapsController;
  }

  async change(data: IChangeCharacterLocationDto, user: ILocalUser): Promise<void> {
    const payload = new ChangeCharacterLocationDto(data);

    const currentLocation = (await this.rooster.getByCharacter(user.userId)) as ICharacterLocationEntity;

    const currentMap = (await this.mapsController.get({ id: currentLocation.map.toString() })) as IMapEntity;
    this.shouldMove(payload, currentLocation, currentMap);

    if (payload.map) {
      // #TODO This should validate if "entrance" to another location has base coords. ATM there is only 1 map
      const targetMap = await this.mapsController.get({ name: payload.map });
      if (!targetMap) throw new IncorrectLocationTarget();
    }

    await this.rooster.updateByCharacter(user.userId, payload);
  }

  private shouldMove(target: IChangeCharacterLocationDto, current: ICharacterLocationEntity, map: IMapEntity): void {
    const splitted: number[][] = [];
    for (let i = 0; i < map.fields.length; i += map.width) {
      splitted.push(map.fields.slice(i, i + map.width));
    }

    if (!splitted[target.y] || (target.y > current.y ? target.y - current.y > 1 : current.y - target.y > 1)) {
      throw new IncorrectLocationTarget();
    }

    if (target.x > map.width || (target.x > current.x ? target.x - current.x > 1 : current.x - target.x > 1)) {
      throw new IncorrectLocationTarget();
    }

    if (target.x === current.x && target.y === current.y) throw new IncorrectLocationTarget();
  }
}
