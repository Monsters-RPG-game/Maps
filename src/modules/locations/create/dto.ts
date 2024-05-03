import Validation from '../../../tools/validation';
import type { ICreateCharacterLocationDto } from './types';

export default class CreateCharacterLocationDto implements ICreateCharacterLocationDto {
  character: string;
  x: number;
  y: number;
  map: string;

  constructor(data: ICreateCharacterLocationDto) {
    this.character = data.character;
    this.x = data.x;
    this.y = data.y;
    this.map = data.map;

    this.validate();
  }

  private validate(): void {
    new Validation(this.character, 'character').isDefined().isObjectId();
    new Validation(this.x, 'x').isDefined().isNumber();
    new Validation(this.y, 'y').isDefined().isNumber();
    new Validation(this.map, 'map').isDefined().isObjectId();
  }
}
