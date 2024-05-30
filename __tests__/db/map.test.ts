import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import Rooster from '../../src/modules/maps/rooster';
import * as utils from '../utils';
import mongoose from 'mongoose';
import { IMapEntity } from '../../src/modules/maps/entity';

describe('Map', () => {
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const connection = new utils.Connection();
  const db = new utils.FakeFactory();

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
    it('No data in database', async () => {
      const rooster = new Rooster();
      const map = await rooster.get(new mongoose.Types.ObjectId());

      expect(map).toEqual(null);
    });

    it('Incorrect target', async () => {
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

      const rooster = new Rooster();
      const map = await rooster.getByName('a');

      expect(map).toEqual(null);
    });
  });

  describe('Should pass', () => {
    it('Get', async () => {
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

      const rooster = new Rooster();
      const map = await rooster.getByName('fakeMap');
      const { name, height, width } = map!;

      expect(name).toEqual(fakeMap.name);
      expect(height).toEqual(fakeMap.height);
      expect(width).toEqual(fakeMap.width);
    });

    it('Add', async () => {
      let err: Error | undefined = undefined;
      const rooster = new Rooster();

      try {
        await rooster.add(fakeMap);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
