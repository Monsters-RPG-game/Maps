import type { EFakeData } from '../enums';
import Maps from '../../../../src/modules/maps/model';
import { IMapsEntity } from '../../../../src/modules/maps/entity';

export type IFakeParam<T> = {
  [P in keyof T]?: T[P];
};

export interface IFakeState {
  [EFakeData.Maps]: IFakeParam<IMapsEntity>;
}

export interface IFakeModel {
  [EFakeData.Maps]: typeof Maps;
}

export type IAbstractBody<T> = {
  [P in keyof T]: ([arg]?: typeof P) => this;
};
