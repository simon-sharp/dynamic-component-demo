import {ObjectService} from './object.service';

describe('Shared: Object Service', () => {
  let objectService: ObjectService;

  beforeAll(() => {
    objectService = new ObjectService();
  });

  describe('when testing isNullOrEmpty', () => {
    let testObj: any;

    beforeAll(() => {
      testObj = {
        a: 5,
        b: {
          c: {
            d: 'test'
          }
        }
      };
    });

    describe('when testing with a flat value', () => {
      it('should return the flat value', () => {
        expect(
          objectService.getAttributeFromObject(testObj, 'a', 'Value not set')
        ).toEqual(5);
      });
    });

    describe('when testing with a nested value', () => {
      it('should return the nested value', () => {
        expect(
          objectService.getAttributeFromObject(testObj, 'b.c.d', 'Value not set')
        ).toEqual('test');
      });
    });

    describe('when testing with a non existing value', () => {
      it('should return the ifEmptyContent value', () => {
        expect(
          objectService.getAttributeFromObject(testObj, 'b.c.d.fail', 'Value not set')
        ).toEqual('Value not set');
      });
    });

    describe('when testing with a non existing value', () => {
      it('should return the ifEmptyContent value', () => {
        expect(
          objectService.getAttributeFromObject(testObj, 'fail.a', 'Value not set')
        ).toEqual('Value not set');
      });
    });
  });
});
