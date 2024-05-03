import GetCharacterLocation from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IGetCharacterLocationDto } from './types';
import type { EModules } from '../../../enums';
import type { ICharacterLocationEntity } from '../entity';

export default class Controller extends ControllerFactory<EModules.CharacterLocation> {
  constructor() {
    super(new Rooster());
  }

  async get(data: IGetCharacterLocationDto): Promise<ICharacterLocationEntity | null> {
    const payload = new GetCharacterLocation(data);

    if (payload.character) return this.rooster.getByCharacter(payload.character);
    return this.rooster.get(payload.id);
  }
}
