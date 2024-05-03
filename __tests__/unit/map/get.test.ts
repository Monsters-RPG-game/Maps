import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import { IMapEntity } from '../../../src/modules/maps/entity';
import { IGetMapDto } from '../../../src/modules/maps/get/types';
import * as utils from '../../utils';
import GetMapDto from '../../../src/modules/maps/get/dto';

describe('Map', () => {
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const getMap: IGetMapDto = {
    name: fakeMap.name,
    id: fakeMap._id,
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(getMap).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(getMap);
          delete clone[k];

          try {
            new GetMapDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('Name incorrect', () => {
        const clone = structuredClone(getMap);
        clone.name = 1 as unknown as string;

        try {
          new GetMapDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('name should be a string'));
        }
      });

      it('Id incorrect', () => {
        const clone = structuredClone(getMap);
        clone.id = 1 as unknown as string;

        try {
          new GetMapDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be string'));
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', () => {
      let err: Error | undefined = undefined;

      try {
        new GetMapDto(getMap);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
