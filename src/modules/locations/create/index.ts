import CreateCharacterLocationDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { ICreateCharacterLocationDto } from './types';
import type { EModules } from '../../../enums';

export default class Controller extends ControllerFactory<EModules.CharacterLocation> {
  constructor() {
    super(new Rooster());
  }

  async create(data: ICreateCharacterLocationDto): Promise<string> {
    const payload = new CreateCharacterLocationDto(data);

    return this.rooster.add(payload);
  }
}
