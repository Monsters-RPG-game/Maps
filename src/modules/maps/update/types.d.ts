import type { IMapFields } from '../entity';
import type { EFieldUpdateActions } from 'enums';

export interface IUpdateMapFields extends IMapFields {
  position: number; // Field position in array
  action: EFieldUpdateActions;
  newType?: number; // If field will be updated, specify field type
}

export interface IUpdateMapDto {
  _id: string;
  fields?: IUpdateMapFields[];
  remove?: boolean;
}
