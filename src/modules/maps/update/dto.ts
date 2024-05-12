import { EFieldUpdateActions } from '../../../enums';
import { NoDataProvided } from '../../../errors';
import Validation from '../../../tools/validation';
import type { IUpdateMapFields, IUpdateMapDto } from './types';

export default class UpdateMapDto implements IUpdateMapDto {
  _id: string;
  remove?: boolean;
  fields?: IUpdateMapFields[];

  constructor(data: IUpdateMapDto) {
    this._id = data._id;
    this.fields = data.fields;
    this.remove = data.remove;

    this.validate();
  }

  private validate(): void {
    if (!this._id && !this.remove && (!this.fields || this.fields.length === 0)) {
      throw new NoDataProvided();
    }

    new Validation(this._id, '_id').isDefined().isString().isObjectId();
    if (this.remove !== undefined) new Validation(this.remove, 'remove').isDefined().isBoolean();
    if (this.fields && this.fields.length > 0) {
      new Validation(this.fields, 'fields').isDefined().isNumberArray();

      this.fields.forEach((f) => {
        new Validation(f.position, `fields.${f.position}`).isDefined().isNumber();
        if (f.action === EFieldUpdateActions.Update) {
          new Validation(f.newType, `fields.${f.position}`).isDefined().isNumber();
        }
      });
    }
  }
}
