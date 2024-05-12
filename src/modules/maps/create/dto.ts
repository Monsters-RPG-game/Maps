import Validation from '../../../tools/validation';
import type { ICreateMapDto } from './types';

export default class CreateMapDto implements ICreateMapDto {
  name: string;
  fields: number[];
  height: number;
  width: number;

  constructor(data: ICreateMapDto) {
    this.name = data.name;
    this.height = data.height;
    this.width = data.width;
    this.fields = data.fields;

    this.validate();
  }

  private validate(): void {
    new Validation(this.name, 'name').isDefined().isString();
    new Validation(this.height, 'height').isDefined().isNumber();
    new Validation(this.width, 'width').isDefined().isNumber();
    new Validation(this.fields, 'fields').isDefined().isArray().isNumberArray();
  }
}
