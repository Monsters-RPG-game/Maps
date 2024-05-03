import type { EModules } from '../../enums';
import type { ICreateCharacterLocationDto } from '../../modules/locations/create/types';
import type { ICharacterLocationEntity } from '../../modules/locations/entity';
import type CharacterLocationController from '../../modules/locations/get';
import type CharacterLocationRooster from '../../modules/locations/rooster';
import type { ICreateMapDto } from '../../modules/maps/create/types';
import type { IMapEntity } from '../../modules/maps/entity';
import type MapsController from '../../modules/maps/get';
import type MapsRooster from '../../modules/maps/rooster';

export interface IModulesHandlers {
  [EModules.Maps]: MapsController;
  [EModules.CharacterLocation]: CharacterLocationController;
}

export interface IModulesControllers {
  [EModules.Maps]: MapsRooster;
  [EModules.CharacterLocation]: CharacterLocationRooster;
}

export interface IRoosterAddData {
  [EModules.Maps]: ICreateMapDto;
  [EModules.CharacterLocation]: ICreateCharacterLocationDto;
}

export interface IRoosterGetData {
  [EModules.Maps]: IMapEntity;
  [EModules.CharacterLocation]: ICharacterLocationEntity;
}

export interface IRoosterGetAllData {
  [EModules.Maps]: IMapEntity[];
  [EModules.CharacterLocation]: ICharacterLocationEntity[];
}

export interface IRoosterUpdate {
  [EModules.Maps]: Partial<IMapEntity>;
  [EModules.CharacterLocation]: Partial<ICharacterLocationEntity>;
}

interface IRoosterFactory<Z extends EModules> {
  add(data: IRoosterAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRoosterGetData[Z] | null>;

  getAll(page: number): Promise<IRoosterGetAllData[Z]>;

  update(id: string, data: unknown): Promise<void>;
}
