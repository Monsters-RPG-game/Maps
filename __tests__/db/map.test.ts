import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import Rooster from '../../src/modules/maps/rooster';
import * as utils from '../utils';
import mongoose from 'mongoose';
import { EFieldType } from '../../src/enums';
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
      await db.maps.name(fakeMap.name).width(fakeMap.width).height(fakeMap.height).fields(fakeMap.fields).create();

      const rooster = new Rooster();
      const map = await rooster.getByName('a');

      expect(map).toEqual(null);
    });
  });

  describe('Should pass', () => {
    it('Get', async () => {
      await db.maps.name(fakeMap.name).width(fakeMap.width).height(fakeMap.height).fields(fakeMap.fields).create();

      const rooster = new Rooster();
      const map = await rooster.getByName('testMap');
      const { name, height, width, fields } = map!;

      expect(name).toEqual(fakeMap.name);
      expect(height).toEqual(fakeMap.height);
      expect(width).toEqual(fakeMap.width);
      expect(fields).toEqual(fakeMap.fields);
    });

    it('Add', async () => {
      let err: Error | undefined = undefined;
      const rooster = new Rooster();

      try {
        await rooster.add({
          name: 'testMap',
          width: 20,
          height: 20,
          fields: [
            {
              x: 0,
              y: 0,
              type: EFieldType.Field,
              access: {
                top: true,
                left: true,
                right: true,
                bottom: true,
              },
            },
          ],
        });
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
