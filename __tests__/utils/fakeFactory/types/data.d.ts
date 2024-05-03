import type { EFakeData } from '../enums';
import Maps from '../../../../src/modules/maps/model';
import { IMapsEntity } from '../../../../src/modules/maps/entity';
import { ICharacterLocationEntity } from '../../../../src/modules/locations/entity';
import CharacterLocation from '../../../../src/modules/locations/model';

export type IFakeParam<T> = {
  [P in keyof T]?: T[P];
};

export interface IFakeState {
  [EFakeData.Maps]: IFakeParam<IMapsEntity>;
  [EFakeData.CharacterLocation]: IFakeParam<ICharacterLocationEntity>;
}

export interface IFakeModel {
  [EFakeData.Maps]: typeof Maps;
  [EFakeData.CharacterLocation]: typeof CharacterLocation;
}

export type IAbstractBody<T> = {
  [P in keyof T]: ([arg]?: typeof P) => this;
};
