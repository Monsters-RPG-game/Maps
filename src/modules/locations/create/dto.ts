import Validation from '../../../tools/validation';
import type { ICreateCharacterLocationDto } from './types';

export default class CreateCharacterLocationDto implements ICreateCharacterLocationDto {
  character: string;
  x?: number;
  y?: number;
  map?: string;

  constructor(data: ICreateCharacterLocationDto) {
    this.character = data.character;
    this.x = data.x ?? 11; // hardcodded base location for user who just created account
    this.y = data.y ?? 38; // hardcodded base location for user who just created account
    this.map = data.map;

    this.validate();
  }

  private validate(): void {
    new Validation(this.character, 'character').isDefined().isObjectId();

    if (this.map) {
      new Validation(this.x, 'x').isDefined().isNumber();
      new Validation(this.y, 'y').isDefined().isNumber();
    }

    if (this.map) new Validation(this.map, 'map').isDefined().isObjectId();
  }
}
