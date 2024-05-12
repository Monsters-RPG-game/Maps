import Maps from './model';
import RoosterFactory from '../../tools/abstract/rooster';
import type { IMapEntity } from './entity';
import type { IMap } from './types';
import type { EModules } from '../../enums';

export default class Rooster extends RoosterFactory<IMap, typeof Maps, EModules.Maps> {
  constructor() {
    super(Maps);
  }

  async getByName(name: string): Promise<IMapEntity | null> {
    return this.model.findOne({ name }).lean();
  }

  async remove(_id: string): Promise<void> {
    await this.model.findOneAndDelete({ _id });
  }
}
