import AbstractRepository from '../../../tools/abstractions/repository.js';
import type * as enums from '../../../enums/index.js';
import type Map from '../model.js';
import type { IMap } from '../types.js';

export default class MapRepository extends AbstractRepository<IMap, typeof Map, enums.EControllers.Map> {}
