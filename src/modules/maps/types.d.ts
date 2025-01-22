import type { IMapEntity } from './entity.js';
import type mongoose from 'mongoose';

export interface IMap extends IMapEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
