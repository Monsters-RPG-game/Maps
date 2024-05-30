import Validation from '../../../tools/validation';
import type { ICreateMapDto } from './types';
import type { IMapLayer, IMapObjectLayer, IMapProperties, IMapTilesets } from '../types';

export default class CreateMapDto implements ICreateMapDto {
  name: string;
  layers: IMapLayer[] | IMapObjectLayer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  properties: IMapProperties[];
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: IMapTilesets[];
  tilewidth: number;
  type: string;
  version: number;
  width: number;
  height: number;
  infinite: boolean;

  constructor(data: ICreateMapDto) {
    this.name = data.name;
    this.layers = data.layers;
    this.nextlayerid = data.nextlayerid;
    this.nextobjectid = data.nextobjectid;
    this.orientation = data.orientation;
    this.properties = data.properties;
    this.renderorder = data.renderorder;
    this.tiledversion = data.tiledversion;
    this.tileheight = data.tileheight;
    this.tilesets = data.tilesets;
    this.tilewidth = data.tilewidth;
    this.type = data.type;
    this.width = data.width;
    this.version = data.version;
    this.height = data.height;
    this.infinite = data.infinite;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.nextlayerid, 'nextlayerid').isDefined().isNumber();
    new Validation(this.nextobjectid, 'nextobjectid').isDefined().isNumber();
    new Validation(this.orientation, 'orientation').isDefined().isString();
    new Validation(this.renderorder, 'renderorder').isDefined().isString();
    new Validation(this.tiledversion, 'tiledversion').isDefined().isString();
    new Validation(this.tileheight, 'tileheight').isDefined().isNumber();
    new Validation(this.tilewidth, 'tilewidth').isDefined().isNumber();
    new Validation(this.type, 'type').isDefined().isString();
    new Validation(this.version, 'version').isDefined().isNumber();
    new Validation(this.width, 'width').isDefined().isNumber();
    new Validation(this.height, 'height').isDefined().isNumber();
    new Validation(this.infinite, 'infinite').isDefined().isBoolean();

    new Validation(this.layers, 'layers').isDefined().isArray();
    this.layers.forEach((l: IMapLayer | IMapObjectLayer) => {
      new Validation(l.x, 'x').isDefined().isNumber();
      new Validation(l.y, 'y').isDefined().isNumber();
      new Validation(l.opacity, 'opacity').isDefined().isNumber();
      new Validation(l.id, 'id').isDefined().isNumber();
      new Validation(l.type, 'type').isDefined().isString();
      new Validation(l.name, 'name').isDefined().isString();
      new Validation(l.visible, 'visible').isDefined().isBoolean();

      if (Object.hasOwn(l, 'draworder')) {
        const target = l as IMapObjectLayer;
        new Validation(target.draworder, 'draworder').isDefined().isString();
        new Validation(target.objects, 'mapObjectLayer.objects').isDefined().isArray();
        target.objects.forEach((o) => {
          new Validation(o.type, 'mapObjectLayer.objects.type').isDefined().isString();
          new Validation(o.x, 'mapObjectLayer.objects.x').isDefined().isNumber();
          new Validation(o.y, 'mapObjectLayer.objects.y').isDefined().isNumber();
          new Validation(o.visible, 'mapObjectLayer.objects.visible').isDefined().isBoolean();
          new Validation(o.name, 'mapObjectLayer.objects.name').isDefined().isString();
          new Validation(o.width, 'mapObjectLayer.objects.width').isDefined().isNumber();
          new Validation(o.height, 'mapObjectLayer.objects.height').isDefined().isNumber();
          new Validation(o.rotation, 'mapObjectLayer.objects.rotation').isDefined().isNumber();
          new Validation(o.point, 'mapObjectLayer.objects.point').isDefined().isBoolean();
        });
      } else {
        const target = l as IMapLayer;
        new Validation(target.width, 'mapLayer.width').isDefined().isNumber();
        new Validation(target.height, 'mapLayer.height').isDefined().isNumber();
        new Validation(target.data, 'mapLayer.data').isDefined().isNumberArray();
      }
    });
    new Validation(this.properties, 'properties').isDefined().isArray();
    this.properties.forEach((p) => {
      new Validation(p.type, 'mapProperties.type').isDefined().isString();
      new Validation(p.type, 'mapProperties.type').isDefined().isString();
      new Validation(p.value, 'mapProperties.value').isDefined().isString();
    });
    new Validation(this.tilesets, 'tilesets').isDefined().isArray();
    this.tilesets.forEach((t) => {
      new Validation(t.name, 'name').isDefined().isString();
      new Validation(t.tilewidth, 'tilesets.tilewidth').isDefined().isNumber();
      new Validation(t.tileheight, 'tilesets.tileheight').isDefined().isNumber();
      new Validation(t.spacing, 'tilesets.spacing').isDefined().isNumber();
      new Validation(t.margin, 'tilesets.margin').isDefined().isNumber();
      new Validation(t.image, 'tilesets.image').isDefined().isString();
      new Validation(t.columns, 'tilesets.columns').isDefined().isNumber();
      new Validation(t.firstgid, 'tilesets.firstgid').isDefined().isNumber();
      new Validation(t.tilecount, 'tilesets.tilecount').isDefined().isNumber();
      new Validation(t.imagewidth, 'tilesets.imageWidth').isDefined().isNumber();
      new Validation(t.imageheight, 'tilesets.imageHeight').isDefined().isNumber();

      new Validation(t.tiles, 'tilesets.tiles').isDefined().isArray();
      t.tiles.forEach((tile) => {
        new Validation(tile.properties, 'properties').isDefined().isArray();
        tile.properties.forEach((p) => {
          new Validation(p.name, 'tilesets.tiles.name').isDefined().isString();
          new Validation(p.value, 'tilesets.tiles.value').isDefined().isBoolean();
          new Validation(p.type, 'tilesets.tiles.type').isDefined().isString();
        });
        new Validation(tile.id, 'tilesets.tiles.id').isDefined().isNumber();
      });

      new Validation(t.terrains, 'tilesets.terrain').isDefined().isArray();
      t.terrains.forEach((ter) => {
        new Validation(ter.name, 'tilesets.terrain.name').isDefined().isString();
        new Validation(ter.tile, 'tilesets.terrain.tile').isDefined().isNumber();
      });

      new Validation(t.grid, 'tilesets.grid').isDefined();
      new Validation(t.grid.orientation, 'tilesets.grid.orientation').isDefined().isString();
      new Validation(t.grid.height, 'tilesets.grid.height').isDefined().isNumber();
      new Validation(t.grid.width, 'tilesets.grid.width').isDefined().isNumber();
    });
  }
}
