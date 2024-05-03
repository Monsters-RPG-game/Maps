import Validation from '../../../tools/validation';
import type { IChangeCharacterLocationDto } from './types';

export default class ChangeCharacterLocationDto implements IChangeCharacterLocationDto {
  x: number;
  y: number;
  map?: string;

  constructor(data: IChangeCharacterLocationDto) {
    this.x = data.x;
    this.y = data.y;
    this.map = data.map;

    this.validate();
  }

  private validate(): void {
    new Validation(this.x, 'x').isDefined().isNumber();
    new Validation(this.y, 'y').isDefined().isNumber();
    if (this.map) new Validation(this.map, 'map').isDefined().isObjectId();
  }
}
