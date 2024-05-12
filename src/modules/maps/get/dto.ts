import Validation from '../../../tools/validation';
import type { IGetMapDto } from './types';

export default class GetMapDto implements IGetMapDto {
  name?: string;
  id?: string;

  constructor(data: IGetMapDto) {
    this.name = data.name;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (!this.id) new Validation(this.name, 'name').isDefined().isString();
    if (!this.name) new Validation(this.id, 'id').isDefined().isObjectId();
  }
}
