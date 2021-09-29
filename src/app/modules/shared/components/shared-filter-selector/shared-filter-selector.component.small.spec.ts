import {SharedFilterSelectorComponent} from './shared-filter-selector.component';
import {EventEmitter} from '@angular/core';

describe('Shared: Filter Selector Component', () => {
  let component: SharedFilterSelectorComponent;

  beforeAll(() => {
    component = new SharedFilterSelectorComponent();
  });

  describe('when looking at the initialized values', () => {
    it('should have an undefined filter', () => {
      expect(component.filter).toEqual(undefined);
    });

    it('should have an save output EventEmitter', () => {
      expect(component.save).toBeTruthy();
    });

    it('should have an delete output EventEmitter', () => {
      expect(component.delete).toBeTruthy();
    });

    it('should have an cancel output EventEmitter', () => {
      expect(component.cancel).toBeTruthy();
    });
  });

  describe('when testing setFilter', () => {
    describe('when save is set', () => {
      let saveCalled: boolean = false,
        subscription: any;

      beforeEach(() => {
        subscription = component.save?.subscribe(() => {
          saveCalled = true;
        });

        component.setFilter();
      });

      afterEach(() => {
        subscription.unsubscribe();
      });

      it('should have emmited a save', () => {
        expect(saveCalled).toBe(true);
      });
    });

    describe('when save is not set', () => {
      let saveCalled: boolean = false,
        subscription: any;

      beforeEach(() => {
        subscription = component.save?.subscribe(() => {
          saveCalled = true;
        });

        component.save = new EventEmitter<any>();
        component.setFilter();
      });

      afterEach(() => {
        subscription.unsubscribe();
      });

      it('should have emmited a save', () => {
        expect(saveCalled).toBe(false);
      });
    });
  });

  describe('when testing deleteFilter', () => {
    describe('when delete is set', () => {
      let deleteCalled: boolean = false,
        subscription: any;

      beforeEach(() => {
        subscription = component.delete?.subscribe(() => {
          deleteCalled = true;
        });

        component.deleteFilter();
      });

      afterEach(() => {
        subscription.unsubscribe();
      });

      it('should have emmited a delete', () => {
        expect(deleteCalled).toBe(true);
      });
    });

    describe('when delete is not set', () => {
      let deleteCalled: boolean = false,
        subscription: any;

      beforeEach(() => {
        subscription = component.delete?.subscribe(() => {
          deleteCalled = true;
        });

        component.delete = new EventEmitter<any>();
        component.deleteFilter();
      });

      afterEach(() => {
        subscription.unsubscribe();
      });

      it('should have emmited a delete', () => {
        expect(deleteCalled).toBe(false);
      });
    });
  });

  describe('when testing cancelEdit', () => {
    describe('when cancel is set', () => {
      let cancelCalled: boolean = false,
        subscription: any;

      beforeEach(() => {
        subscription = component.cancel?.subscribe(() => {
          cancelCalled = true;
        });

        component.cancelEdit();
      });

      afterEach(() => {
        subscription.unsubscribe();
      });

      it('should have emmited a cancel', () => {
        expect(cancelCalled).toBe(true);
      });
    });

    describe('when cancel is not set', () => {
      let cancelCalled: boolean = false,
        subscription: any;

      beforeEach(() => {
        subscription = component.cancel?.subscribe(() => {
          cancelCalled = true;
        });

        component.cancel = new EventEmitter<any>();
        component.cancelEdit();
      });

      afterEach(() => {
        subscription.unsubscribe();
      });

      it('should have emmited a cancel', () => {
        expect(cancelCalled).toBe(false);
      });
    });
  });
});
