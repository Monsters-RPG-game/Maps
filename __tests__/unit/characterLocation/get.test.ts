import { describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import * as utils from '../../utils';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import { IGetCharacterLocationDto } from '../../../src/modules/locations/get/types';
import GetCharacterLocation from '../../../src/modules/locations/get/dto';

describe('CharacterLocation - Get', () => {
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
  const getLocation: IGetCharacterLocationDto = {
    character: fakeCharacterLocation.character,
    id: fakeCharacterLocation._id,
  };

  describe('Should throw', () => {
    describe('No data passed', () => {
      Object.keys(getLocation).forEach((k) => {
        return it(`Missing ${k}`, () => {
          const clone = structuredClone(getLocation);
          delete clone[k];

          try {
            new GetCharacterLocation(clone);
          } catch (err) {
            expect(err).toEqual(new errors.MissingArgError(k));
          }
        });
      });
    });

    describe('Incorrect data', () => {
      it('Character incorrect', () => {
        const clone = structuredClone(getLocation);
        clone.character = 'asd';

        try {
          new GetCharacterLocation(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('character should be objectId'));
        }
      });

      it('Id incorrect', () => {
        const clone = structuredClone(getLocation);
        clone.id = 'asd';

        try {
          new GetCharacterLocation(clone);
        } catch (err) {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be objectId'));
        }
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', () => {
      let err: Error | undefined = undefined;

      try {
        new GetCharacterLocation(getLocation);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
