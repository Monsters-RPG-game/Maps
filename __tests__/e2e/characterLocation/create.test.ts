import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as utils from '../../utils';
import * as errors from '../../../src/errors';
import Controller from '../../../src/modules/locations/create';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import { ICreateCharacterLocationDto } from '../../../src/modules/locations/create/types';
import mongoose from 'mongoose';
import { IFullError } from 'types';

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
      it('Missing character', async () => {
        let error: IFullError | undefined = undefined
        const clone = structuredClone(createLocation);

        clone.character = undefined!;

        try {
          await controller.create(clone)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.MissingArgError('character'));
      });

      it('Missing x', async () => {
        let error: IFullError | undefined = undefined
        const clone = structuredClone(createLocation);

        clone.x = undefined!;

        try {
          await controller.create(clone)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.MissingArgError('x'));
      });

      it('Missing y', async () => {
        let error: IFullError | undefined = undefined
        const clone = structuredClone(createLocation);

        clone.y = undefined!;

        try {
          await controller.create(clone)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.MissingArgError('y'));
      });

      it('Missing map', async () => {
        let error: IFullError | undefined = undefined
        const clone = structuredClone(createLocation);

        clone.map = undefined!;

        try {
          await controller.create(clone)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.NoDefaultMap());
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

      it('Character incorrect', async () => {
        let error: IFullError | undefined = undefined

        try {
          await controller.create({ ...createLocation, character: 'asd' })
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectArgTypeError("character should be objectId"))
      });

      it('X incorrect', async () => {
        let error: IFullError | undefined = undefined

        try {
          await controller.create({ ...createLocation, x: 'a' as unknown as number })
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectArgTypeError('x should be number'));
      });

      it('Y incorrect', async () => {
        let error: IFullError | undefined = undefined

        try {
          await controller.create({ ...createLocation, y: "a" as unknown as number })
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectArgTypeError('y should be number'));
      });

      it('Map incorrect', async () => {
        let error: IFullError | undefined = undefined

        try {
          await controller.create({ ...createLocation, map: "as" })
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectArgTypeError('map should be objectId'));
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
