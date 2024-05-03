import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import mongoose from 'mongoose';
import { IChangeCharacterLocationDto } from '../../../src/modules/locations/move/types';
import ChangeCharacterLocationDto from '../../../src/modules/locations/move/dto';

describe('CharacterLocation - Change', () => {
  const changeLocation: IChangeCharacterLocationDto = {
    x: 10,
    y: 100,
    map: new mongoose.Types.ObjectId().toString(),
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(changeLocation).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(changeLocation);
          delete clone[k];

          try {
            new ChangeCharacterLocationDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('X incorrect', () => {
        const clone = structuredClone(changeLocation);
        clone.x = 'asd' as unknown as number;

        try {
          new ChangeCharacterLocationDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('x should be number'));
        }
      });

      it('Y incorrect', () => {
        const clone = structuredClone(changeLocation);
        clone.y = 'asd' as unknown as number;

        try {
          new ChangeCharacterLocationDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('y should be number'));
        }
      });

      it('Map incorrect', () => {
        const clone = structuredClone(changeLocation);
        clone.map = 'asd';

        try {
          new ChangeCharacterLocationDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('map should be objectId'));
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', () => {
      let err: Error | undefined = undefined;

      try {
        new ChangeCharacterLocationDto(changeLocation);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
