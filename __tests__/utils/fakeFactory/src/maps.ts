import TemplateFactory from './abstracts';
import { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';
import { IMapsEntity } from '../../../../src/modules/maps/entity';
import Maps from '../../../../src/modules/maps/model';

export default class FakeLog extends TemplateFactory<EFakeData.Maps> implements IAbstractBody<IMapsEntity> {
  constructor() {
    super(Maps);
  }

  _id(id: string): this {
    this.state._id = id;
    return this;
  }

  protected override fillState(): void {
    this.state = {
      _id: undefined,
    };
  }
}
