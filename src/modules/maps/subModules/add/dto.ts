import type { IAddMapDto } from './types.js';

export default class AddMapDto implements IAddMapDto {
  [key: string]: string;

  constructor(data: IAddMapDto) {
    Object.entries(data).forEach(([k, v]) => {
      this[k] = v as string;
    });
  }
}
