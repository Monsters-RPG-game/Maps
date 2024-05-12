import UpdateMapDto from './dto';
import { EFieldUpdateActions, type EModules } from '../../../enums';
import { IncorrectTargetError } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IUpdateMapDto } from './types';

export default class Controller extends ControllerFactory<EModules.Maps> {
  constructor() {
    super(new Rooster());
  }

  async update(data: IUpdateMapDto): Promise<void> {
    const payload = new UpdateMapDto(data);

    const map = await this.rooster.get(payload._id);
    if (!map) throw new IncorrectTargetError();
    const preparedFields = map.fields;

    if (payload.remove) return this.rooster.remove(map._id);

    payload.fields?.forEach((f) => {
      switch (f.action) {
        case EFieldUpdateActions.Update:
          preparedFields.splice(f.position, 1);
          break;
        case EFieldUpdateActions.Remove:
          preparedFields[f.position] = f.newType as number;
          break;
        default:
          preparedFields.splice(f.position, 0, f.newType as number);
          break;
      }
    });

    return this.rooster.update(data._id, { ...map, ...payload, fields: preparedFields });
  }
}
