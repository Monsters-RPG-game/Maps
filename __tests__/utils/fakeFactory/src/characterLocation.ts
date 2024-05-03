import TemplateFactory from './abstracts';
import { EFakeData } from '../enums';
import type { IAbstractBody } from '../types/data';
import { ICharacterLocationEntity } from '../../../../src/modules/locations/entity';
import CharacterLocation from '../../../../src/modules/locations/model';

export default class FakeCharacterLocation
  extends TemplateFactory<EFakeData.CharacterLocation>
  implements IAbstractBody<ICharacterLocationEntity>
{
  constructor() {
    super(CharacterLocation);
  }

  _id(id: string): this {
    this.state._id = id;
    return this;
  }

  map(map: string): this {
    this.state.map = map;
    return this;
  }

  x(x: number): this {
    this.state.x = x;
    return this;
  }

  y(y: number): this {
    this.state.y = y;
    return this;
  }

  character(character: string): this {
    this.state.character = character;
    return this;
  }

  protected override fillState(): void {
    this.state = {
      _id: undefined,
      map: undefined,
      x: 0,
      y: 0,
      character: undefined,
    };
  }
}
