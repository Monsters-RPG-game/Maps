import Validation from '../../../../tools/validation.js';
import type { IGetMapDto } from './types.js';

export default class GetMapDto implements IGetMapDto {
  id: string;

  constructor(data: IGetMapDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString().isObjectId();
  }
}
