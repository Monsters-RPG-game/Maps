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
    const data = await this.changeController.change(payload as IChangeCharacterLocationDto, user);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.getController.get(payload as IGetCharacterLocationDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }
}
