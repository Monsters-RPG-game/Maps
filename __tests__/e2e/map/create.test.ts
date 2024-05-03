import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import * as errors from '../../../src/errors';
import * as utils from '../../utils';
import Controller from '../../../src/modules/maps/create';
import { ICreateMapDto } from '../../../src/modules/maps/create/types';
import { EFieldType } from '../../../src/enums';
import { IMapEntity, IMapFields } from '../../../src/modules/maps/entity';

describe('Create map', () => {
  const db = new utils.FakeFactory();
  const controller = new Controller();
  const connection = new utils.Connection();
  const fakeMap = utils.fakeData.maps[0] as IMapEntity;
  const createMap: ICreateMapDto = {
    name: 'testMap',
    height: 100,
    width: 100,
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

      it('Missing fields.x', () => {
        const clone = structuredClone(createMap);
        clone.fields[0]!.x = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError(`field.undefined/${createMap.fields[0]!.y}.x`));
        });
      });

      it('Missing fields.y', () => {
        const clone = structuredClone(createMap);
        clone.fields[0]!.y = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(new errors.MissingArgError(`field.${createMap.fields[0]!.x}/undefined.y`));
        });
      });

      it('Missing fields.type', () => {
        const clone = structuredClone(createMap);
        clone.fields[0]!.type = undefined!;
        controller.create(clone).catch((err) => {
          expect(err).toEqual(
            new errors.MissingArgError(`field.${createMap.fields[0]!.x}/${createMap.fields[0]!.y}.type`),
          );
        });
      });

      it('Missing fields.access', () => {
        const clone = structuredClone(createMap);
        clone.fields[0]!.access = undefined!;
        controller.create(clone).catch((err) => {
          console.log('err');
          console.log(err);
          expect(err).toEqual(
            new errors.MissingArgError(`field.${createMap.fields[0]!.x}/${createMap.fields[0]!.y}.access`),
          );
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
        controller.create({ ...createMap, fields: 'a' as unknown as IMapFields[] }).catch((err) => {
          expect(err).toEqual(new errors.IncorrectArgTypeError('fields should be array'));
        });
      });

      it('Fields.x incorrect', () => {
        controller
          .create({
            ...createMap,
            fields: createMap.fields.map((f) => {
              return {
                ...f,
                x: 'a' as unknown as number,
              };
            }),
          })
          .catch((err) => {
            expect(err).toEqual(new errors.IncorrectArgTypeError('field.a/0.x should be number'));
          });
      });

      it('Fields.y incorrect', () => {
        controller
          .create({
            ...createMap,
            fields: createMap.fields.map((f) => {
              return {
                ...f,
                y: 'a' as unknown as number,
              };
            }),
          })
          .catch((err) => {
            expect(err).toEqual(new errors.IncorrectArgTypeError('field.0/a.y should be number'));
          });
      });

      it('Fields.type incorrect', () => {
        controller
          .create({
            ...createMap,
            fields: createMap.fields.map((f) => {
              return {
                ...f,
                type: 'a' as unknown as EFieldType,
              };
            }),
          })
          .catch((err) => {
            expect(err).toEqual(new errors.IncorrectArgTypeError('field.0/0.type has incorrect type'));
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
