import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import * as utils from '../../utils';
import Controller from '../../../src/modules/locations/get';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import { IGetCharacterLocationDto } from '../../../src/modules/locations/get/types';

describe('Get character location', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
  const getLocation: IGetCharacterLocationDto = {
    character: fakeCharacterLocation.character,
    id: fakeCharacterLocation._id,
  };

  beforeAll(async () => {
    await connection.connect();
  });

  afterEach(async () => {
    await db.cleanUp();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Should throw', () => {
    describe('No data passed', () => {
      it('Missing data', () => {
        const clone = structuredClone(getLocation);
        clone.character = undefined!;
        clone.id = undefined!;
        controller.get(clone).catch((err) => {
          expect(err).toEqual(new errors.NoDataProvided());
        });
      });
    });

    describe('Incorrect data', () => {
      beforeEach(async () => {
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('Character incorrect', () => {
        controller.get({ ...getLocation, character: 'asd' }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('character should be objectId'));
        });
      });

      it('Id incorrect', () => {
        controller.get({ ...getLocation, id: 'as' }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be objectId'));
        });
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      let err: Error | undefined = undefined;

      try {
        await controller.get(getLocation);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
