import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { IMap } from './types';

export const mapSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name not provided'],
  },
  height: {
    type: Number,
    required: [true, 'Height not provided'],
  },
  width: {
    type: Number,
    required: [true, 'Width not provided'],
  },
  fields: {
    type: [Number],
    default: [],
  },
});

const Map = mongoose.model<IMap>('Map', mapSchema, enums.EDbCollections.Map);
export default Map;
