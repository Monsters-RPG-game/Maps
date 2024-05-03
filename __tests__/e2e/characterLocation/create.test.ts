import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as utils from '../../utils';
import * as errors from '../../../src/errors';
import Controller from '../../../src/modules/locations/create';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import { ICreateCharacterLocationDto } from '../../../src/modules/locations/create/types';
import mongoose from 'mongoose';

describe('Create character location', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
  const createLocation: ICreateCharacterLocationDto = {
    character: new mongoose.Types.ObjectId().toString(),
    x: 100,
    y: 100,
    map: new mongoose.Types.ObjectId().toString(),
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
      it('Missing character', () => {
        const clone = structuredClone(createLocation);
        clone.character = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('character'));
        });
      });

      it('Missing x', () => {
        const clone = structuredClone(createLocation);
        clone.x = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('x'));
        });
      });

      it('Missing y', () => {
        const clone = structuredClone(createLocation);
        clone.y = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('y'));
        });
      });

      it('Missing map', () => {
        const clone = structuredClone(createLocation);
        clone.map = undefined!;
        controller.create(clone).catch((err) => {
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

      it('Character incorrect', () => {
        controller.create({ ...createLocation, character: 'asd' }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('character should be objectId'));
        });
      });

      it('X incorrect', () => {
        controller.create({ ...createLocation, x: 'a' as unknown as number }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('x should be number'));
        });
      });

      it('Y incorrect', () => {
        controller.create({ ...createLocation, y: 'a' as unknown as number }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('y should be number'));
        });
      });

      it('Map incorrect', () => {
        controller.create({ ...createLocation, map: 'as' }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('map should be objectId'));
        });
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      let err: Error | undefined = undefined;

      try {
        await controller.create(createLocation);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
