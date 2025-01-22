import type * as enums from '../enums/index.js';
import type { IMapEntity } from '../modules/maps/entity.js';
import type { IAddMapDto } from '../modules/maps/subModules/add/types.js';

export interface IRepositoryAddData {
  [enums.EControllers.Map]: IAddMapDto;
}

export interface IRepositoryAddDefaultData {
  [enums.EControllers.Map]: Partial<IMapEntity>;
}

export interface IRepositoryGetData {
  [enums.EControllers.Map]: IMapEntity | null;
}

export interface IRepositoryUpdate {
  [enums.EControllers.Map]: Partial<IMapEntity>;
}

export interface IAbstractRepository<Z extends enums.EControllers> {
  add(data: IRepositoryAddData[Z]): Promise<string>;

  get(data: unknown): Promise<IRepositoryGetData[Z]>;
}
