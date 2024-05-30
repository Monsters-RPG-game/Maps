import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import { ICreateMapDto } from '../../../src/modules/maps/create/types';
import CreateMapDto from '../../../src/modules/maps/create/dto';
import * as utils from '../../utils';
import { IMapEntity } from 'modules/maps/entity';

describe('Map', () => {
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const createMap: ICreateMapDto = fakeMap;

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
    });
  });

  describe('Should pass', () => {
    it('Validated', () => {
      const data = new CreateMapDto(createMap);
      expect(data.name).toEqual(createMap.name);
    });
  });
});
