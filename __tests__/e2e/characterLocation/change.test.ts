import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as utils from '../../utils';
import * as errors from '../../../src/errors';
import Controller from '../../../src/modules/locations/move';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import { IChangeCharacterLocationDto } from '../../../src/modules/locations/move/types';
import type { IFullError, ILocalUser } from '../../../src/types';
import { EUserTypes } from '../../../src/enums';
import { IMapEntity } from 'modules/maps/entity';

describe('Change character location', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const changeLocation: IChangeCharacterLocationDto = {
    x: 5,
    y: 6,
  };
  const user: ILocalUser = {
    userId: fakeCharacterLocation.character,
    tempId: '',
    validated: false,
    type: EUserTypes.User,
  };

  beforeEach(async () => {
    await db.maps._id(fakeMap._id).name(fakeMap.name).width(fakeMap.width).height(fakeMap.height).fields(fakeMap.fields).create();
    await db.characterLocation
      .character(fakeCharacterLocation.character)
      .x(fakeCharacterLocation.x)
      .y(fakeCharacterLocation.y)
      .map(fakeCharacterLocation.map)
      .create();
  })

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
    });

    describe('Incorrect data', () => {
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
      })

      it('Cannot move to selected field. Field is too far', async () => {
        let error: IFullError | undefined = undefined

        try {
          await controller.change({ ...changeLocation, x: 8 }, user)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectLocationTarget())
      });

      it('Cannot move to selected field. Field does not exist', async () => {
        let error: IFullError | undefined = undefined

        try {
          await controller.change({ ...changeLocation, x: 20 }, user)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectLocationTarget())
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
})
