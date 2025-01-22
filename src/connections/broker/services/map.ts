import getController from './utils.js';
import * as enums from '../../../enums/index.js';
import AddMapDto from '../../../modules/maps/subModules/add/dto.js';
import GetMapDto from '../../../modules/maps/subModules/get/dto.js';
import State from '../../../tools/state.js';
import type { IAddMapDto } from '../../../modules/maps/subModules/add/types.js';
import type { IGetMapDto } from '../../../modules/maps/subModules/get/types.js';
import type { IUserBrokerInfo } from '../../../types/user.js';

export default class MapService {
  async get(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.Map, enums.EMapActions.Get);

    const callback = await action.execute(new GetMapDto(payload as IGetMapDto));
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }

  async add(payload: unknown, user: IUserBrokerInfo): Promise<void> {
    const action = getController(enums.EControllers.Map, enums.EMapActions.Add);

    const callback = await action.execute(new AddMapDto(payload as IAddMapDto));
    return State.broker.send(user.tempId, callback, enums.EMessageTypes.Send);
  }
}
