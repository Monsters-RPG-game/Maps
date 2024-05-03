import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { IMap } from './types';

export const accessSchema = new mongoose.Schema(
  {
    top: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: true,
    },
    right: {
      type: Boolean,
      default: true,
    },
    bottom: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

export const fieldsSchema = new mongoose.Schema(
  {
    x: {
      type: Number,
      required: [true, 'Field x not provided'],
    },
    y: {
      type: Number,
      required: [true, 'Field y not provided'],
    },
    type: {
      type: String,
      enum: Object.values(enums.EFieldType),
      required: [true, 'Field type not provided'],
    },
    access: {
      type: accessSchema,
      required: [true, 'Field access not provided'],
    },
  },
  { _id: false },
);

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
    type: [fieldsSchema],
    default: [],
  },
});

const Map = mongoose.model<IMap>('Map', mapSchema, enums.EDbCollections.Map);
export default Map;
