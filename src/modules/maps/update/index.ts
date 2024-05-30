import UpdateMapDto from './dto';
import { IncorrectTargetError } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IUpdateMapDto } from './types';
import type { EModules } from 'enums';

export default class Controller extends ControllerFactory<EModules.Maps> {
  constructor() {
    super(new Rooster());
  }

  async update(data: IUpdateMapDto): Promise<void> {
    const payload = new UpdateMapDto(data);

    const map = await this.rooster.get(payload._id);
    if (!map) throw new IncorrectTargetError();
    if (payload.remove) return this.rooster.remove(map._id);

    return this.rooster.update(data._id, { ...map, ...payload });
  }
}
