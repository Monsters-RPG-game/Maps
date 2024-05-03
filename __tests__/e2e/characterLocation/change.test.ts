import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as utils from '../../utils';
import * as errors from '../../../src/errors';
import Controller from '../../../src/modules/locations/move';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import mongoose from 'mongoose';
import { IChangeCharacterLocationDto } from '../../../src/modules/locations/move/types';
import type { ILocalUser } from '../../../src/types';
import { EUserTypes } from '../../../src/enums';

describe('Change character location', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
  const changeLocation: IChangeCharacterLocationDto = {
    x: 10,
    y: 100,
    map: new mongoose.Types.ObjectId().toString(),
  };
  const user: ILocalUser = {
    userId: fakeCharacterLocation.character,
    tempId: '',
    validated: false,
    type: EUserTypes.User,
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
      it('Missing x', () => {
        const clone = structuredClone(changeLocation);
        clone.x = undefined!;
        controller.change(clone, user).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('x'));
        });
      });

      it('Missing y', () => {
        const clone = structuredClone(changeLocation);
        clone.y = undefined!;
        controller.change(clone, user).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('y'));
        });
      });

      it('Missing map', () => {
        const clone = structuredClone(changeLocation);
        clone.map = undefined!;
        controller.change(clone, user).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('map'));
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

      it('X incorrect', () => {
        controller.change({ ...changeLocation, x: 'a' as unknown as number }, user).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('x should be number'));
        });
      });

      it('Y incorrect', () => {
        controller.change({ ...changeLocation, y: 'a' as unknown as number }, user).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('y should be number'));
        });
      });

      it('Map incorrect', () => {
        controller.change({ ...changeLocation, map: 'as' }, user).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('map should be objectId'));
        });
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      let err: Error | undefined = undefined;

      try {
        await controller.change(changeLocation, user);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
