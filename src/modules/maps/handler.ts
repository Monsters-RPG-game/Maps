import CreateController from './create';
import GetController from './get';
import UpdateController from './update';
import * as enums from '../../enums';
import HandlerFactory from '../../tools/abstract/handler';
import State from '../../tools/state';
import type { ICreateMapDto } from './create/types';
import type { IGetMapDto } from './get/types';
import type { IUpdateMapDto } from './update/types';
import type { EModules } from '../../enums';
import type { ILocalUser } from '../../types';

export default class MapHandler extends HandlerFactory<EModules.Maps> {
  private readonly _createController: CreateController;
  private readonly _updateController: UpdateController;

  constructor() {
    super(new GetController());
    this._createController = new CreateController();
    this._updateController = new UpdateController();
  }

  private get createController(): CreateController {
    return this._createController;
  }

  private get updateController(): UpdateController {
    return this._updateController;
  }

  async create(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.createController.create(payload as ICreateMapDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }

  async get(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.getController.get(payload as IGetMapDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }

  async update(payload: unknown, user: ILocalUser): Promise<void> {
    const data = await this.updateController.update(payload as IUpdateMapDto);
    return State.broker.send(user.tempId, data, enums.EMessageTypes.Send);
  }
}
