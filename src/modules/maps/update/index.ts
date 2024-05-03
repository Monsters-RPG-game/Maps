import UpdateMapDto from './dto';
import { IncorrectTargetError } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IUpdateMapDto } from './types';
import type { EModules } from '../../../enums';

export default class Controller extends ControllerFactory<EModules.Maps> {
  constructor() {
    super(new Rooster());
  }

  async update(data: IUpdateMapDto): Promise<void> {
    const payload = new UpdateMapDto(data.map, data.id);

    const map = await this.rooster.get(payload._id);
    if (!map) throw new IncorrectTargetError();
    const preparedFields = map.fields;

    payload.fields?.forEach((f) => {
      const index = preparedFields.findIndex((i) => {
        return i.x === f.x && i.y === f.y;
      });
      if (f.toRemove) {
        preparedFields.splice(index, 1);
      } else {
        if (index !== -1) {
          preparedFields[index] = f;
        } else {
          preparedFields.push(f);
        }
      }
    });

    await this.rooster.update(data.id, { ...map, ...payload, fields: preparedFields });
  }
}
