import { EFieldType } from '../../../enums';
import { NoDataProvided } from '../../../errors';
import Validation from '../../../tools/validation';
import type { IUpdateMapFields } from './types';
import type { IMapEntity } from '../entity';

export default class UpdateMapDto
  implements
    Partial<
      IMapEntity & {
        fields?: IUpdateMapFields[];
      }
    >
{
  _id: string;
  name?: string;
  fields?: IUpdateMapFields[];
  height?: number;
  width?: number;

  constructor(data: Partial<Omit<IMapEntity, '_id'>>, _id: string) {
    this._id = _id;
    this.name = data.name;
    this.height = data.height;
    this.width = data.width;
    this.fields = data.fields;

    this.validate();
  }

  private validate(): void {
    if (
      (!this.name && this.height === undefined && this.width === undefined && !this.fields) ||
      (this.fields?.length ?? 0) <= 0
    ) {
      throw new NoDataProvided();
    }
    new Validation(this._id, '_id').isDefined().isString().isObjectId();
    if (this.name) new Validation(this.name, 'name').isDefined().isString();
    if (this.height) new Validation(this.height, 'height').isDefined().isNumber();
    if (this.width) new Validation(this.width, 'width').isDefined().isNumber();

    if (this.fields && this.fields.length > 0) {
      new Validation(this.fields, 'fields').isDefined().isArray();

      this.fields.forEach((f) => {
        if (!f.toRemove) {
          new Validation(f.x, `field.${f.x}/${f.y}.x`).isDefined().isNumber();
          new Validation(f.y, `field.${f.x}/${f.y}.y`).isDefined().isNumber();
          new Validation(f.type, `field.${f.x}/${f.y}.type`).isDefined().isString().isPartOfEnum(EFieldType);
          new Validation(f.access, `field.${f.x}/${f.y}.access`).isDefined();
        }
      });
    }
  }
}
