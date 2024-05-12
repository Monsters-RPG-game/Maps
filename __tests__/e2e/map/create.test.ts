import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import * as utils from '../../utils';
import Controller from '../../../src/modules/maps/create';
import { ICreateMapDto } from '../../../src/modules/maps/create/types';
import { IMapEntity } from '../../../src/modules/maps/entity';

describe('Create map', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const createMap: ICreateMapDto = {
    name: 'testMap',
    height: 10,
    width: 10,
    fields: [1, 2, 3],
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
        const clone = structuredClone(createMap);
        clone.name = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('name'));
        });
      });

      it('Missing height', () => {
        const clone = structuredClone(createMap);
        clone.height = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('height'));
        });
      });

      it('Missing width', () => {
        const clone = structuredClone(createMap);
        clone.width = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('width'));
        });
      });

      it('Missing fields', () => {
        const clone = structuredClone(createMap);
        clone.fields = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError('fields'));
        });
      });
    });

    describe('Incorrect data', () => {
      beforeEach(async () => {
        await db.maps.name(fakeMap.name).width(fakeMap.width).height(fakeMap.height).fields(fakeMap.fields).create();
      });

      afterEach(async () => {
        await db.cleanUp();
      });

      it('Name incorrect', () => {
        controller.create({ ...createMap, name: 1 as unknown as string }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('name should be a string'));
        });
      });

      it('Height incorrect', () => {
        controller.create({ ...createMap, height: 'a' as unknown as number }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('height should be number'));
        });
      });

      it('Width incorrect', () => {
        controller.create({ ...createMap, width: 'a' as unknown as number }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('width should be number'));
        });
      });

      it('Fields incorrect', () => {
        controller.create({ ...createMap, fields: 'a' as unknown as number[] }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('fields should be array'));
        });
      });

    });
  });

  describe('Should pass', () => {
    it('Validated', async () => {
      let err: Error | undefined = undefined;

      try {
        await controller.create(createMap);
      } catch (error) {
        err = error as Error;
      }

      expect(err).toBeUndefined();
    });
  });
});
