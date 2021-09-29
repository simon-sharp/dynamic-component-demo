import {HelperService} from './helper.service';
import {SortOrder} from '../model/sort-order.enum';

describe('Shared: Helper Service', () => {
  let helperService: HelperService;

  beforeAll(() => {
    helperService = new HelperService();
  });

  describe('when testing isNullOrEmpty', () => {
    describe('when testing with null', () => {
      it('should return true', () => {
        expect(helperService.isNullOrEmpty(null)).toEqual(true);
      });
    });

    describe('when testing with undefined', () => {
      it('should return true', () => {
        expect(helperService.isNullOrEmpty(undefined)).toEqual(true);
      });
    });

    describe('when testing with an empty string', () => {
      it('should return true', () => {
        expect(helperService.isNullOrEmpty('')).toEqual(true);
      });
    });

    describe('when testing with 0', () => {
      it('should return true', () => {
        expect(helperService.isNullOrEmpty(0)).toEqual(true);
      });
    });

    describe('when testing with false', () => {
      it('should return true', () => {
        expect(helperService.isNullOrEmpty(false)).toEqual(true);
      });
    });

    describe('when testing with a non empty string', () => {
      it('should return false', () => {
        expect(helperService.isNullOrEmpty('null')).toEqual(false);
      });
    });

    describe('when testing with an empty object', () => {
      it('should return false', () => {
        expect(helperService.isNullOrEmpty({})).toEqual(false);
      });
    });

    describe('when testing with an empty array', () => {
      it('should return true', () => {
        expect(helperService.isNullOrEmpty([])).toEqual(true);
      });
    });
  });

  describe('when testing isObject', () => {
    describe('when testing with null', () => {
      it('should return false', () => {
        expect(helperService.isObject(null)).toEqual(false);
      });
    });

    describe('when testing with undefined', () => {
      it('should return false', () => {
        expect(helperService.isObject(undefined)).toEqual(false);
      });
    });

    describe('when testing with an empty string', () => {
      it('should return false', () => {
        expect(helperService.isObject('')).toEqual(false);
      });
    });

    describe('when testing with 0', () => {
      it('should return false', () => {
        expect(helperService.isObject(0)).toEqual(false);
      });
    });

    describe('when testing with false', () => {
      it('should return false', () => {
        expect(helperService.isObject(false)).toEqual(false);
      });
    });

    describe('when testing with a non empty string', () => {
      it('should return false', () => {
        expect(helperService.isObject('null')).toEqual(false);
      });
    });

    describe('when testing with an empty object', () => {
      it('should return true', () => {
        expect(helperService.isObject({})).toEqual(true);
      });
    });

    describe('when testing with an empty array', () => {
      it('should return true', () => {
        expect(helperService.isObject([])).toEqual(true);
      });
    });

    describe('when testing with a filled object', () => {
      it('should return true', () => {
        expect(helperService.isObject({a: 5})).toEqual(true);
      });
    });

    describe('when testing with a filled array', () => {
      it('should return true', () => {
        expect(helperService.isObject([1, 2, 3])).toEqual(true);
      });
    });
  });

  describe('when testing isArray', () => {
    describe('when testing with null', () => {
      it('should return false', () => {
        expect(helperService.isArray(null)).toEqual(false);
      });
    });

    describe('when testing with undefined', () => {
      it('should return false', () => {
        expect(helperService.isArray(undefined)).toEqual(false);
      });
    });

    describe('when testing with an empty string', () => {
      it('should return false', () => {
        expect(helperService.isArray('')).toEqual(false);
      });
    });

    describe('when testing with 0', () => {
      it('should return false', () => {
        expect(helperService.isArray(0)).toEqual(false);
      });
    });

    describe('when testing with false', () => {
      it('should return false', () => {
        expect(helperService.isArray(false)).toEqual(false);
      });
    });

    describe('when testing with a non empty string', () => {
      it('should return false', () => {
        expect(helperService.isArray('null')).toEqual(false);
      });
    });

    describe('when testing with an empty object', () => {
      it('should return false', () => {
        expect(helperService.isArray({})).toEqual(false);
      });
    });

    describe('when testing with an empty array', () => {
      it('should return true', () => {
        expect(helperService.isArray([])).toEqual(true);
      });
    });

    describe('when testing with a filled object', () => {
      it('should return false', () => {
        expect(helperService.isArray({a: 5})).toEqual(false);
      });
    });

    describe('when testing with a filled array', () => {
      it('should return true', () => {
        expect(helperService.isArray([1, 2, 3])).toEqual(true);
      });
    });
  });

  describe('when testing isString', () => {
    describe('when testing with null', () => {
      it('should return false', () => {
        expect(helperService.isString(null)).toEqual(false);
      });
    });

    describe('when testing with undefined', () => {
      it('should return false', () => {
        expect(helperService.isString(undefined)).toEqual(false);
      });
    });

    describe('when testing with an empty string', () => {
      it('should return true', () => {
        expect(helperService.isString('')).toEqual(true);
      });
    });

    describe('when testing with 0', () => {
      it('should return false', () => {
        expect(helperService.isString(0)).toEqual(false);
      });
    });

    describe('when testing with false', () => {
      it('should return false', () => {
        expect(helperService.isString(false)).toEqual(false);
      });
    });

    describe('when testing with a non empty string', () => {
      it('should return true', () => {
        expect(helperService.isString('null')).toEqual(true);
      });
    });

    describe('when testing with an empty object', () => {
      it('should return false', () => {
        expect(helperService.isString({})).toEqual(false);
      });
    });

    describe('when testing with an empty array', () => {
      it('should return false', () => {
        expect(helperService.isString([])).toEqual(false);
      });
    });

    describe('when testing with a filled object', () => {
      it('should return false', () => {
        expect(helperService.isString({a: 5})).toEqual(false);
      });
    });

    describe('when testing with a filled array', () => {
      it('should return false', () => {
        expect(helperService.isString([1, 2, 3])).toEqual(false);
      });
    });
  });

  describe('when testing capitalizeFirstLetter', () => {
    describe('when testing with a lowercase string', () => {
      it('should return the first Letter Capitalized', () => {
        expect(helperService.capitalizeFirstLetter('null')).toEqual('Null');
      });
    });

    describe('when testing with a Uppercase string', () => {
      it('should return the same string', () => {
        expect(helperService.capitalizeFirstLetter('NULL')).toEqual('NULL');
      });
    });

    describe('when testing with a sentece', () => {
      it('should return the first letter of each wordcapitalized', () => {
        expect(helperService.capitalizeFirstLetter('this is a test')).toEqual('This Is A Test');
      });
    });
  });

  describe('when testing getNestedDataBody', () => {
    let testObj: any;

    beforeEach(() => {
      testObj = {
        a: {
          b: {
            c: 5
          }
        },
        d: 5,
        e: {
          f: 'test'
        }
      };
    });

    describe('when looking for an inner element', () => {
      it('should return return that element', () => {
        expect(helperService.getNestedDataBody('a.b.c', testObj)).toEqual(5);
      });
    });

    describe('when looking for an element that does not exist', () => {
      it('should return the same string', () => {
        expect(helperService.getNestedDataBody('a.q', testObj)).toEqual('');
      });
    });
  });

  describe('when testing saveToNestedDataBody', () => {
    let testObj: any;

    beforeEach(() => {
      testObj = {
        a: {
          b: {
            c: 5
          }
        },
        d: 5,
        e: {
          f: 'test',
          g: null,
        }
      };
    });

    describe('when setting an inner element', () => {
      beforeEach(() => {
        helperService.saveToNestedDataBody('a.b.c', testObj, 600);
      });

      it('should have the element overwritten', () => {
        expect(helperService.getNestedDataBody('a.b.c', testObj)).toEqual(600);
      });
    });

    describe('when setting an element that does not exist', () => {
      beforeEach(() => {
        helperService.saveToNestedDataBody('a.q', testObj, 30);
      });

      it('should have set that element', () => {
        expect(helperService.getNestedDataBody('a.q', testObj)).toEqual(30);
      });
    });

    describe('when setting a deep element that does not exist', () => {
      beforeEach(() => {
        helperService.saveToNestedDataBody('a.q.r.s.t', testObj, 'test');
      });

      it('should have set that element', () => {
        expect(helperService.getNestedDataBody('a.q.r.s.t', testObj)).toEqual('test');
      });
    });

    describe('when handing in an empty testObj', () => {
      it('should have set that element', () => {
        expect(helperService.getNestedDataBody('e.g', null)).toEqual('');
      });
    });
  });

  describe('when testing sortJson', () => {
    describe('when testing value sort', () => {
      let testArray: any[];

      beforeEach(() => {
        testArray = [
          {
            name: 'Januar',
            value: 'jan'
          },
          {
            name: 'Januar',
            value: 'jan'
          },
          {
            name: 'Dezember',
            value: 'dec'
          },
          {
            name: 'Juni',
            value: 'jun'
          },
          {
            name: 'Februar',
            value: 'feb'
          }
        ];
      });

      describe('when sorting ascending', () => {
        beforeEach(() => {
          testArray = helperService.sortJson('name', testArray, SortOrder.ASC);
        });

        it('should return the sorted array', () => {
          expect(testArray).toEqual([
            {
              name: 'Dezember',
              value: 'dec'
            },
            {
              name: 'Februar',
              value: 'feb'
            },
            {
              name: 'Januar',
              value: 'jan'
            },
            {
              name: 'Januar',
              value: 'jan'
            },
            {
              name: 'Juni',
              value: 'jun'
            },
          ]);
        });
      });

      describe('when sorting descending', () => {
        beforeEach(() => {
          testArray = helperService.sortJson('name', testArray, SortOrder.DESC);
        });

        it('should return the descending sorted array', () => {
          expect(testArray).toEqual([
            {
              name: 'Juni',
              value: 'jun'
            },
            {
              name: 'Januar',
              value: 'jan'
            },
            {
              name: 'Januar',
              value: 'jan'
            },
            {
              name: 'Februar',
              value: 'feb'
            },
            {
              name: 'Dezember',
              value: 'dec'
            },
          ]);
        });
      });
    });

    describe('when testing number sort', () => {
      let testArray: any[];

      beforeEach(() => {
        testArray = [
          {
            name: 'test60',
            value: 'test60'
          },
          {
            name: 'test30',
            value: 'test30'
          },
          {
            name: 'test200',
            value: 'test200'
          },
          {
            name: 'test10',
            value: 'test10'
          }
        ];
      });

      describe('when sorting', () => {
        beforeEach(() => {
          testArray = helperService.sortJson('name', testArray, SortOrder.ASC);
        });

        it('should the sorted array', () => {
          expect(testArray).toEqual([
            {
              name: 'test10',
              value: 'test10'
            },
            {
              name: 'test200',
              value: 'test200'
            },
            {
              name: 'test30',
              value: 'test30'
            },
            {
              name: 'test60',
              value: 'test60'
            },
          ]);
        });
      });
    });
  });
});
