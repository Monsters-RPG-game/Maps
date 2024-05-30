import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import * as utils from '../../utils';
import * as errors from '../../../src/errors';
import Controller from '../../../src/modules/locations/move';
import { ICharacterLocationEntity } from '../../../src/modules/locations/entity';
import type { ILocalUser, IFullError } from '../../../src/types';
import { EUserTypes } from '../../../src/enums';
import { IMapEntity } from '../../../src/modules/maps/entity';
import { IChangeCharacterLocationDto } from '../../../src/modules/locations/move/types';

describe('Change character location', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const changeLocation: IChangeCharacterLocationDto = {
    x: 1,
    y: 0,
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
      it('Missing x', async () => {
        await db.maps
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        const clone = structuredClone(changeLocation);
        clone.x = undefined!;
        controller.change(clone, user).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('x'));
        });
      });

      it('Missing y', async () => {
        await db.maps
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

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

      it('X incorrect', async () => {
        await db.maps
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        controller.change({ ...changeLocation, x: 'a' as unknown as number }, user).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('x should be number'));
        });
      });

      it('Y incorrect', async () => {
        await db.maps
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        controller.change({ ...changeLocation, y: 'a' as unknown as number }, user).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('y should be number'));
        });
      });

      it('Map incorrect', async () => {
        await db.maps
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        controller.change({ ...changeLocation, map: 'as' }, user).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('map should be objectId'));
        });
      })

      it('Cannot move to selected field. Field is too far', async () => {
        let error: IFullError | undefined = undefined
        await db.maps
          ._id(fakeMap._id)
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        try {
          await controller.change({ ...changeLocation, x: 8 }, user)
        } catch (err) {
          console.log(err)
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectLocationTarget())
      });

      it('Cannot move to selected field. Field does not exist', async () => {
        let error: IFullError | undefined = undefined
        await db.maps
          ._id(fakeMap._id)
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        try {
          await controller.change({ ...changeLocation, x: 20 }, user)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectLocationTarget())
      });

      it('Cannot move outside map scope', async () => {
        await db.maps
          ._id(fakeMap._id)
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(0)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

        let error: IFullError | undefined = undefined

        try {
          await controller.change({ x: -1, y: fakeCharacterLocation.y }, user)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectLocationTarget())
      });

      it('Cannot move outside map scope', async () => {
        await db.maps
          ._id(fakeMap._id)
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(0)
          .map(fakeCharacterLocation.map)
          .create();

        let error: IFullError | undefined = undefined

        try {
          await controller.change({ x: fakeCharacterLocation.x, y: -1 }, user)
        } catch (err) {
          error = err as IFullError
        }

        expect(error).toEqual(new errors.IncorrectLocationTarget())
      });
    });

    describe('Should pass', () => {
      it('Validated', async () => {
        let err: Error | undefined = undefined;
        await db.maps
          ._id(fakeMap._id)
          .name(fakeMap.name)
          .width(fakeMap.width)
          .height(fakeMap.height)
          .infinite(fakeMap.infinite)
          .type(fakeMap.type)
          .tilesets(fakeMap.tilesets)
          .tileheight(fakeMap.tileheight)
          .tiledversion(fakeMap.tiledversion)
          .version(fakeMap.version)
          .renderorder(fakeMap.renderorder)
          .properties(fakeMap.properties)
          .orientation(fakeMap.orientation)
          .nextobjectid(fakeMap.nextobjectid)
          .nextlayerid(fakeMap.nextlayerid)
          .layers(fakeMap.layers)
          .tilewidth(fakeMap.tilewidth)
          .create();
        await db.characterLocation
          .character(fakeCharacterLocation.character)
          .x(fakeCharacterLocation.x)
          .y(fakeCharacterLocation.y)
          .map(fakeCharacterLocation.map)
          .create();

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
