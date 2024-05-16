import CreateController from './create';
import GetController from './get';
import ChangeController from './move';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { ICreateCharacterLocationDto } from './create/types';
import type { IGetCharacterLocationDto } from './get/types';
import type { IChangeCharacterLocationDto } from './move/types';
import type { EModules } from '../../enums';
import type { ILocalUser } from '../../types';

export default class MapHandler extends HandlerFactory<EModules.CharacterLocation> {
  private readonly _createController: CreateController;
  private readonly _changeController: ChangeController;

  constructor() {
    super(new GetController());
    this._createController = new CreateController();
    this._changeController = new ChangeController();
  }

  private get createController(): CreateController {
    return this._createController;
  }

  private get changeController(): ChangeController {
    return this._changeController;
  }

  async create(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.createController.create(payload as ICreateCharacterLocationDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }

  async change(payload: unknown, user: ILocalUser): Promise<void> {
    await this.changeController.change(payload as IChangeCharacterLocationDto, user);
    const attack = this.canBeAttacked();
    return State.broker.send(user.tempId, { attack }, enums.EMessageTypes.Send);
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.getController.get(payload as IGetCharacterLocationDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }

  private canBeAttacked(): boolean {
    // This is placeholder. Chance of getting attacked will be moved to map data and will be dependent of map
    const chance = Math.round(Math.random() * 100);
    return chance < 20;
  }
}
