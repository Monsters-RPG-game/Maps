import mongoose from 'mongoose';
import { EDbCollections } from '../../enums/index.js';
import type { IMap } from './types.js';

export const mapSchema = new mongoose.Schema({});

const Map = mongoose.model<IMap>('Map', mapSchema, EDbCollections.Maps);
export default Map;
