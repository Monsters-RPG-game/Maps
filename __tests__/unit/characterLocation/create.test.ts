import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import { ICreateCharacterLocationDto } from '../../../src/modules/locations/create/types';
import mongoose from 'mongoose';
import CreateCharacterLocationDto from '../../../src/modules/locations/create/dto';

describe('CharacterLocation - Create', () => {
  const createLocation: ICreateCharacterLocationDto = {
    character: new mongoose.Types.ObjectId().toString(),
    x: 100,
    y: 100,
    map: new mongoose.Types.ObjectId().toString(),
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(createLocation).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(createLocation);
          delete clone[k];

          try {
            new CreateCharacterLocationDto(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('Character incorrect', () => {
        const clone = structuredClone(createLocation);
        clone.character = 'asd';

        try {
          new CreateCharacterLocationDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('character should be objectId'));
        }
      });

      it('X incorrect', () => {
        const clone = structuredClone(createLocation);
        clone.x = 'asd' as unknown as number;

        try {
          new CreateCharacterLocationDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('x should be number'));
        }
      });

      it('Y incorrect', () => {
        const clone = structuredClone(createLocation);
        clone.y = 'asd' as unknown as number;

        try {
          new CreateCharacterLocationDto(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('y should be number'));
        }
      });

      it('Map incorrect', () => {
        const clone = structuredClone(createLocation);
        clone.map = 'asd';

        try {
          new CreateCharacterLocationDto(clone);
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
        new CreateCharacterLocationDto(createLocation);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
