import CreateMapDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { ICreateMapDto } from './types';
import type { EModules } from '../../../enums';

export default class Controller extends ControllerFactory<EModules.Maps> {
  constructor() {
    super(new Rooster());
  }

  async create(data: ICreateMapDto): Promise<void> {
    const payload = new CreateMapDto(data);
    await this.rooster.add(payload);
  }
}
