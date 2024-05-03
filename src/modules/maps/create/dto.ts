import { EFieldType } from '../../../enums';
import Validation from '../../../tools/validation';
import type { ICreateMapDto } from './types';
import type { IMapFields } from '../entity';

export default class CreateMapDto implements ICreateMapDto {
  name: string;
  fields: IMapFields[];
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
    new Validation(this.fields, 'fields').isDefined().isArray();

    this.fields.forEach((f) => {
      new Validation(f.x, `field.${f.x}/${f.y}.x`).isDefined().isNumber();
      new Validation(f.y, `field.${f.x}/${f.y}.y`).isDefined().isNumber();
      new Validation(f.type, `field.${f.x}/${f.y}.type`).isDefined().isString().isPartOfEnum(EFieldType);
      new Validation(f.access, `field.${f.x}/${f.y}.access`).isDefined();
    });
  }
}
