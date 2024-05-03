import GetMapDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetMapDto } from './types';
import type { EModules } from '../../../enums';
import type { IMapEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.Maps> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetMapDto): Promise<IMapEntity | null> {
    const payload = new GetMapDto(data);

    if (payload.name) return this.rooster.getByName(data.name as string);
    return this.rooster.get(data.id);
  }
}
