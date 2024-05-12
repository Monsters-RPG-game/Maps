import TemplateFactory from './abstracts';
import { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';
import { IMapEntity } from '../../../../src/modules/maps/entity';
import Maps from '../../../../src/modules/maps/model';

export default class FakeMap extends TemplateFactory<EFakeData.Maps> implements IAbstractBody<IMapEntity> {
  constructor() {
    super(Maps);
  }

  _id(id: string): this {
    this.state._id = id;
    return this;
  }

  fields(fields: number[]): this {
    this.state.fields = fields;
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

  protected override fillState(): void {
    this.state = {
      _id: undefined,
      fields: [],
      height: undefined,
      width: undefined,
      name: undefined,
    };
  }
}
