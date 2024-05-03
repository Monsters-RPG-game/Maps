import CreateController from './create';
import GetController from './get';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { ICreateMapDto } from './create/types';
import type { IGetMapDto } from './get/types';
import type { EModules } from '../../enums';
import type { ILocalUser } from '../../types';

export default class MapHandler extends HandlerFactory<EModules.Maps> {
  private readonly _createController: CreateController;

  constructor() {
    super(new GetController());
    this._createController = new CreateController();
  }

  private get createController(): CreateController {
    return this._createController;
  }

  async create(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.createController.create(payload as ICreateMapDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.getController.get(payload as IGetMapDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }
}
