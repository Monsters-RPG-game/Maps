import type { IMapEntity, IMapFields } from '../entity';

export interface IUpdateMapFields extends IMapFields {
  toRemove?: boolean;
}

export interface IUpdateMapDto {
  id: string;
  map: Partial<Omit<IMapEntity, '_id'>> & {
    fields?: IUpdateMapFields[];
  };
}
