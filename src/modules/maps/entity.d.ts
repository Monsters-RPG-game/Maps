import type { EFieldType } from '../../enums';

export interface IFieldAccess {
  top?: boolean;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
}

export interface IMapFields {
  x: number;
  y: number;
  type: EFieldType;
  access: IFieldAccess;
}

export interface IMapEntity {
  _id: string;
  name: string;
  height: number;
  width: number;
  fields: IMapFields[];
}
