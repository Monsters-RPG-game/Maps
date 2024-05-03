import ChangeCharacterLocationDto from './dto';
import ControllerFactory from '../../../tools/abstract/controller';
import Rooster from '../rooster';
import type { IChangeCharacterLocationDto } from './types';
import type { EModules } from '../../../enums';
import type { ILocalUser } from '../../../types';

export default class Controller extends ControllerFactory<EModules.CharacterLocation> {
  constructor() {
    super(new Rooster());
  }

  async change(data: IChangeCharacterLocationDto, user: ILocalUser): Promise<void> {
    const payload = new ChangeCharacterLocationDto(data);

    await this.rooster.updateByCharacter(user.userId, payload);
  }
}
