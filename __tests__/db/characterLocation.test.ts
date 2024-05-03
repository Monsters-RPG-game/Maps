import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals';
import Rooster from '../../src/modules/locations/rooster';
import * as utils from '../utils';
import mongoose from 'mongoose';
import { ICharacterLocationEntity } from '../../src/modules/locations/entity';

describe('Character location', () => {
  const fakeCharacterLocation = utils.fakeData.locations[0] as ICharacterLocationEntity;
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
      await db.characterLocation
        .character(fakeCharacterLocation.character)
        .x(fakeCharacterLocation.x)
        .y(fakeCharacterLocation.y)
        .map(fakeCharacterLocation.map)
        .create();

      const rooster = new Rooster();
      const map = await rooster.getByCharacter(new mongoose.Types.ObjectId().toString());

      expect(map).toEqual(null);
    });
  });

  describe('Should pass', () => {
    it('Get', async () => {
      await db.characterLocation
        .character(fakeCharacterLocation.character)
        .x(fakeCharacterLocation.x)
        .y(fakeCharacterLocation.y)
        .map(fakeCharacterLocation.map)
        .create();

      const rooster = new Rooster();
      const dbMap = await rooster.getByCharacter(fakeCharacterLocation.character);
      const { character, x, y, map } = dbMap!;

      expect(character.toString()).toEqual(fakeCharacterLocation.character);
      expect(x).toEqual(fakeCharacterLocation.x);
      expect(y).toEqual(fakeCharacterLocation.y);
      expect(map.toString()).toEqual(fakeCharacterLocation.map);
    });

    it('Add', async () => {
      let err: Error | undefined = undefined;
      const rooster = new Rooster();

      try {
        await rooster.add({
          character: new mongoose.Types.ObjectId().toString(),
          x: 5,
          y: 0,
          map: new mongoose.Types.ObjectId().toString(),
        });
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });

    it('Change', async () => {
      await db.characterLocation
        .character(fakeCharacterLocation.character)
        .x(fakeCharacterLocation.x)
        .y(fakeCharacterLocation.y)
        .map(fakeCharacterLocation.map)
        .create();

      let err: Error | undefined = undefined;
      const rooster = new Rooster();

      try {
        await rooster.updateByCharacter(fakeCharacterLocation.character, {
          x: 20,
          y: 0,
          map: new mongoose.Types.ObjectId().toString(),
        });
      } catch (error) {
        err = error as Error;
      }

      const newData = await rooster.getByCharacter(fakeCharacterLocation.character);

      expect(err).toBeUndefined();
      expect(newData!.x).toEqual(20);
    });
  });
});
