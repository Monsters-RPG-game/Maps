import TemplateFactory from './abstracts';
import { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';
import { IMapEntity } from '../../../../src/modules/maps/entity';
import Maps from '../../../../src/modules/maps/model';
import type { IMapLayer, IMapObjectLayer, IMapProperties, IMapTilesets } from '../../../../src/modules/maps/types';

export default class FakeMap extends TemplateFactory<EFakeData.Maps> implements IAbstractBody<IMapEntity> {
  constructor() {
    super(Maps);
  }

  _id(id: string): this {
    this.state._id = id;
    return this;
  }

  height(height: number): this {
    this.state.height = height;
    return this;
  }

  width(width: number): this {
    this.state.width = width;
    return this;
  }

  name(name: string): this {
    this.state.name = name;
    return this;
  }

  layers(val: IMapLayer[] | IMapObjectLayer[]): this {
    this.state.layers = val;
    return this;
  }

  nextlayerid(val: number): this {
    this.state.nextlayerid = val;
    return this;
  }

  nextobjectid(val: number): this {
    this.state.nextlayerid = val;
    return this;
  }

  orientation(val: string): this {
    this.state.orientation = val;
    return this;
  }

  properties(val: IMapProperties[]): this {
    this.state.properties = val;
    return this;
  }

  renderorder(val: string): this {
    this.state.renderorder = val
    return this;
  }

  tiledversion(val: string): this {
    this.state.tiledversion = val
    return this;
  }

  tileheight(val: number): this {
    this.state.tileheight = val
    return this;
  }

  tilesets(val: IMapTilesets[]): this {
    this.state.tilesets = val
    return this;
  }

  tilewidth(val: number): this {
    this.state.tilewidth = val
    return this;
  }

  type(val: string): this {
    this.state.type = val
    return this;
  }

  version(val: number): this {
    this.state.version = val
    return this
  }

  infinite(val: boolean) {
    this.state.infinite = val
    return this
  }

  protected override fillState(): void {
    this.state = {
      _id: undefined,
      height: undefined,
      width: undefined,
      name: undefined,
      layers: [],
      nextlayerid: 0,
      nextobjectid: 0,
      orientation: undefined,
      properties: [],
      renderorder: undefined,
      tiledversion: undefined,
      tileheightt: 0,
      tilesets: [],
      ttilewidth: 0,
      type: undefined,
      version: 0,
      infinite: false
    };
  }
}
