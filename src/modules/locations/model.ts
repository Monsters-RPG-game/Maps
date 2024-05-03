import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { ICharacterLocation } from './types';

export const characterLocationSchema = new mongoose.Schema({
  character: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Character not provided'],
  },
  x: {
    type: Number,
    required: [true, 'X not provided'],
  },
  y: {
    type: Number,
    required: [true, 'Y not provided'],
  },
  map: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Map not provided'],
  },
});

const CharacterLocation = mongoose.model<ICharacterLocation>(
  'CharacterLocation',
  characterLocationSchema,
  enums.EDbCollections.CharacterLocation,
);
export default CharacterLocation;
