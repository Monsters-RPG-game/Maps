import type { EModules } from '../../enums';
import type { IMapEntity } from '../../modules/map/entity';
import type MapsController from '../../modules/maps/controller/';
import type { ICreateMapDto } from '../../modules/maps/create/types';
import type MapsRooster from '../../modules/maps/rooster';

export interface IModulesHandlers {
  [EModules.Maps]: MapsController;
}

export interface IModulesControllers {
  [EModules.Maps]: MapsRooster;
}

export interface IRoosterAddData {
  [EModules.Maps]: ICreateMapDto;
}

export interface IRoosterGetData {
  [EModules.Maps]: IMapEntity;
}

export interface IRoosterGetAllData {
  [EModules.Maps]: IMapEntity[];
}

export interface IRoosterUpdate {
  [EModules.Maps]: Partial<IMapEntity>;
}

interface IRoosterFactory<Z extends EModules> {
  add(data: IRoosterAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRoosterGetData[Z] | null>;

  getAll(page: number): Promise<IRoosterGetAllData[Z]>;

  update(id: string, data: unknown): Promise<void>;
}
