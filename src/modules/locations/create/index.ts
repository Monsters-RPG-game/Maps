import CreateCharacterLocationDto from './dto';
import { NoDefaultMap } from '../../../errors';
import ControllerFactory from '../../../tools/abstract/controller';
import MapController from '../../maps/get';
import Rooster from '../rooster';
import type { ICreateCharacterLocationDto } from './types';
import type { EModules } from '../../../enums';

export default class Controller extends ControllerFactory<EModules.CharacterLocation> {
  constructor() {
    super(new Rooster());
    this._mapController = new MapController();
  }

  private _mapController: MapController;

  private get mapController(): MapController {
    return this._mapController;
  }

  async create(data: ICreateCharacterLocationDto): Promise<{ id: string }> {
    const payload = new CreateCharacterLocationDto(data);

    if (!payload.map) {
      const defaultMap = await this.mapController.get({ name: 'main' });
      if (!defaultMap) throw new NoDefaultMap();
      return { id: await this.rooster.addDefault(payload.character, defaultMap._id) };
    }
    return { id: await this.rooster.add(payload) };
  }
}
