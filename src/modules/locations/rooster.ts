import CharacterLocation from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { ICharacterLocationEntity } from './entity';
import type { ICharacterLocation } from './types';
import type { EModules } from '../../enums';

export default class Rooster extends RoosterFactory<
  ICharacterLocation,
  typeof CharacterLocation,
  EModules.CharacterLocation
> {
  constructor() {
    super(CharacterLocation);
  }

  async getByCharacter(character: string): Promise<ICharacterLocationEntity | null> {
    return this.model.findOne({ character }).lean();
  }

  async updateByCharacter(character: string, data: Partial<ICharacterLocationEntity>): Promise<void> {
    await this.model.findOneAndUpdate({ character }, data);
  }
}
