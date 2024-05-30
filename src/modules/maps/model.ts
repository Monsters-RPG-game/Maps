import mongoose from 'mongoose';
import * as enums from '../../enums';
import type { IMap } from './types';

// #TODO Not sure how to properly use discriminators in mongoose without adding addititonal fields to existing schemas

// const mapLayersSchema = new mongoose.Schema(
//   {
//     data: {
//       type: [Number],
//       required: [true, 'Map layers data not provided'],
//     },
//     height: {
//       type: Number,
//       require: [true, 'Map layers height not provided'],
//     },
//     width: {
//       type: Number,
//       require: [true, 'Map layers width not provided'],
//     },
//   },
//   { _id: false },
// );
//
// const mapObjectsSchema = new mongoose.Schema(
//   {
//     height: {
//       type: Number,
//       require: [true, 'Map objects height not provided'],
//     },
//     id: {
//       type: Number,
//       require: [true, 'Map objects id not provided'],
//     },
//     name: {
//       type: String,
//       require: [true, 'Map objects name not provided'],
//     },
//     point: {
//       type: Number,
//       require: [true, 'Map objects point not provided'],
//     },
//     rotation: {
//       type: Number,
//       require: [true, 'Map objects rotation not provided'],
//     },
//     type: {
//       type: String,
//       require: [true, 'Map objects type not provided'],
//     },
//     visibility: {
//       type: Boolean,
//       require: [true, 'Map objects visibility not provided'],
//     },
//     width: {
//       type: Number,
//       require: [true, 'Map objects width not provided'],
//     },
//     x: {
//       type: Number,
//       require: [true, 'Map objects X not provided'],
//     },
//     y: {
//       type: Number,
//       require: [true, 'Map objects y not provided'],
//     },
//   },
//   { _id: false },
// );

// const mapObjectLayerSchema = new mongoose.Schema(
//   {
//     draworder: {
//       type: String,
//       require: [true, 'Map object layer draworder not provided'],
//     },
//     objects: {
//       type: [mapObjectsSchema],
//       require: [true, 'Map object layer objects not provided'],
//     },
//   },
//   { _id: false },
// );

export const mapPropertiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Map properties name not provided'],
    },
    type: {
      type: String,
      required: [true, 'Map properties type not provided'],
    },
    value: {
      type: String,
      required: [true, 'Map properties value not provided'],
    },
  },
  { _id: false },
);

export const mapTilesetsGridSchema = new mongoose.Schema(
  {
    height: {
      type: Number,
      required: [true, 'Map tilesets grid height not provided'],
    },
    orientation: {
      type: String,
      required: [true, 'Map tilesets grid orientation not provided'],
    },
    width: {
      type: Number,
      required: [true, 'Map tilesets grid width not provided'],
    },
  },
  { _id: false },
);

export const mapTilesetsTerrainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Map tilesets terrain name not provided'],
    },
    tile: {
      type: Number,
      required: [true, 'Map tilesets terrain tile not provided'],
    },
  },
  { _id: false },
);

export const mapTilesetsTilesPropertiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Map tilesets tiles properties name not provided'],
    },
    type: {
      type: String,
      required: [true, 'Map tilesets tiles properties type not provided'],
    },
    value: {
      type: Boolean,
      required: [true, 'Map tilesets tiles properties boolean not provided'],
    },
  },
  { _id: false },
);

export const mapTilesetsTilesSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Map tilesets tiles id not provided'],
    },
    properties: {
      type: [mapTilesetsTilesPropertiesSchema],
      required: [true, 'Map tilesets tiles properties not provided'],
    },
  },
  { _id: false },
);

export const mapTilesetsSchema = new mongoose.Schema(
  {
    columns: {
      type: Number,
      required: [true, 'Map tilesets columns not provided'],
    },
    firstgid: {
      type: Number,
    },
    grid: {
      type: mapTilesetsGridSchema,
      required: [true, 'Map tilesets grid not profided'],
    },
    image: {
      type: String,
      required: [true, 'Map tilesets image not provided'],
    },
    imageheight: {
      type: Number,
      required: [true, 'Map tilesets image height not provided'],
    },
    imagewidth: {
      type: Number,
      required: [true, 'Map tilesets image width not provided'],
    },
    margin: {
      type: Number,
      required: [true, 'Map tilesets margin not provided'],
    },
    name: {
      type: String,
      required: [true, 'Map tilesets name not provided'],
    },
    spacing: {
      type: Number,
      required: [true, 'Map tilesets spacing not provided'],
    },
    terrains: {
      type: [mapTilesetsTerrainSchema],
      required: [true, 'Map tilesets terrain not provided'],
    },
    tilecount: {
      type: Number,
      required: [true, 'Map tilesets tile count not provided'],
    },
    tileheight: {
      type: Number,
      required: [true, 'Map tilesets tile height not provided'],
    },
    tiles: {
      type: [mapTilesetsTilesSchema],
      required: [true, 'Map tilesets tiles not provided'],
    },
    tilewidth: {
      type: Number,
      required: [true, 'Map tilesets tile width not provided'],
    },
  },
  { _id: false },
);

export const mapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name not provided'],
    },
    layers: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    nextlayerid: {
      type: Number,
      required: [true, 'Next layer id not provided'],
    },
    nextobjectid: {
      type: Number,
      required: [true, 'Next object id not provided'],
    },
    orientation: {
      type: String,
      required: [true, 'Orientation not provided'],
    },
    properties: {
      type: [mapPropertiesSchema],
      required: [true, 'Properties not provided'],
    },
    rederorder: {
      type: String,
    },
    type: {
      type: String,
      required: [true, 'Map type not provided'],
    },
    version: {
      type: Number,
      required: [true, 'Map version not provided'],
    },
    tiledversion: {
      type: String,
      required: [true, 'Tiled version not provided'],
    },
    tilesets: {
      type: [mapTilesetsSchema],
      required: [true, 'Map tilesets not provided'],
    },
    tileheight: {
      type: Number,
      required: [true, 'Tile height not provided'],
    },
    width: {
      type: Number,
      required: [true, 'Map width not provided'],
    },
    height: {
      type: Number,
      required: [true, 'Map height not provided'],
    },
    tilewidth: {
      type: Number,
      required: [true, 'Tile width not provided'],
    },
    infinite: {
      type: Boolean,
      required: [true, 'Map inifinite not provided'],
    },
    renderorder: {
      type: String,
      required: [true, 'Map renderorder not provided'],
    },
  },
  { timestamps: true },
);

const Map = mongoose.model<IMap>('map', mapSchema, enums.EDbCollections.Map);
export default Map;
