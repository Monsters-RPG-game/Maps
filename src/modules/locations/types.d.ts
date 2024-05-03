import type { ICharacterLocationEntity } from './entity';
import type mongoose from 'mongoose';

export interface ICharacterLocation extends ICharacterLocationEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
