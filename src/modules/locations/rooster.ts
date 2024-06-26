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

  async addDefault(character: string, map: string): Promise<string> {
    // #TODO Move this hardcodded data to config, which will be easy to manipulate. Because this project does not have any maps, this is used as placeholder
    const newElement = new this.model({ character, map, x: 11, y: 38 }); // This data is hardcodded to comply with current map. It will be fetched from database later
    const callback = await newElement.save();
    return callback._id.toString();
  }
}
