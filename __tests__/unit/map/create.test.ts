import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import { IMapFields } from '../../../src/modules/maps/entity';
import { ICreateMapDto } from '../../../src/modules/maps/create/types';
import { EFieldType } from '../../../src/enums';
import CreateMapDto from '../../../src/modules/maps/create/dto';

describe('Map', () => {
  const createMap: ICreateMapDto = {
    name: 'testMap',
    height: 100,
    width: 100,
    fields: [
      {
        x: 0,
        y: 0,
        type: EFieldType.Field,
        access: {
          top: true,
          left: true,
          right: true,
          bottom: true,
        },
      },
    ],
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(createMap).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(createMap);
          delete clone[k];

          try {
            new CreateMapDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('Name incorrect', () => {
        const clone = structuredClone(createMap);
        clone.name = 1 as unknown as string;

        try {
          new CreateMapDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('name should be a string'));
        }
      });

      it('Height incorrect', () => {
        const clone = structuredClone(createMap);
        clone.height = 'a' as unknown as number;

        try {
          new CreateMapDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('height should be number'));
        }
      });

      it('Width incorrect', () => {
        const clone = structuredClone(createMap);
        clone.width = 'a' as unknown as number;

        try {
          new CreateMapDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('width should be number'));
        }
      });

      it('Fields incorrect', () => {
        const clone = structuredClone(createMap);
        clone.fields = 'a' as unknown as IMapFields[];

        try {
          new CreateMapDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('fields should be array'));
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', () => {
      const data = new CreateMapDto(createMap);
      expect(data.name).toEqual(createMap.name);
    });
  });
});
