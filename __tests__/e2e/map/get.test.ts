import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import * as utils from '../../utils';
import Controller from '../../../src/modules/maps/get';
import { IMapEntity } from '../../../src/modules/maps/entity';
import { IGetMapDto } from '../../../src/modules/maps/get/types';

describe('Get map', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const getMap: IGetMapDto = {
    name: fakeMap.name,
    id: fakeMap._id,
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
      it('Missing name', () => {
        const clone = structuredClone(getMap);
        clone.name = undefined!;
        controller.get(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('name'));
        });
      });

      it('Missing id', () => {
        const clone = structuredClone(getMap);
        clone.id = undefined!;
        controller.get(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('id'));
        });
      });
    });

    describe('Incorrect data', () => {
      beforeEach(async () => {
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
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('Name incorrect', () => {
        controller.get({ ...getMap, name: 1 as unknown as string }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('name should be a string'));
        });
      });

      it('Id incorrect', () => {
        controller.get({ ...getMap, id: 1 as unknown as string }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('id should be a string'));
        });
      });
    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
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

      const map = await controller.get(getMap);

      expect(map!.name).toEqual(fakeMap.name);
    });
  });
});
