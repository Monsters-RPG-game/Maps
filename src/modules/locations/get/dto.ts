import { NoDataProvided } from '../../../errors';
import Validation from '../../../tools/validation';
import type { IGetCharacterLocationDto } from './types';

export default class GetCharacterLocation implements IGetCharacterLocationDto {
  character?: string;
  id?: string;

  constructor(data: IGetCharacterLocationDto) {
    this.character = data.character;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (this.character) new Validation(this.character, 'character').isDefined().isObjectId();
    if (this.id) new Validation(this.character, 'character').isDefined().isObjectId();

    if (this.id === undefined && this.character === undefined) throw new NoDataProvided();
  }
}
