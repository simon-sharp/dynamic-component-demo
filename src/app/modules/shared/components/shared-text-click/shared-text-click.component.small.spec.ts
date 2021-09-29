import {SharedTextClickComponent} from './shared-text-click.component';
import {EventEmitter} from '@angular/core';

describe('Shared: Text Click Component', () => {
  let component: SharedTextClickComponent;

  beforeAll(() => {
    component = new SharedTextClickComponent();
  });

  describe('when looking at the initialized variables', () => {
    it('should have a text of standardtext', () => {
      expect(component.text).toEqual('standardtext');
    });

    it('should have a emitValue of undefined', () => {
      expect(component.emitValue).toEqual(undefined);
    });

    it('should have a emitTextIfValueIsNotPresent of false', () => {
      expect(component.emitTextIfValueIsNotPresent).toEqual(false);
    });

    it('should have a text of cssClasses', () => {
      expect(component.cssClasses).toEqual({});
    });

    it('should have a text of clickedText', () => {
      expect(component.clickedText).toEqual(new EventEmitter<string>());
    });
  });

  describe('when testing onClick', () => {
    describe('when value is present', () => {
      let emitted: string | undefined = undefined;

      beforeEach(() => {
        component.emitValue = 'Test';

        component.clickedText.subscribe((data) => {
          emitted = data;
        });

        component.onClick();
      });

      it('should emitted a text', () => {
        expect(emitted).toEqual('Test');
      });
    });

    describe('when only the text is present and this should be emitted', () => {
      let emitted: string | undefined = undefined;

      beforeEach(() => {
        component.emitValue = undefined;
        component.emitTextIfValueIsNotPresent = true;
        component.text = 'Test2';

        component.clickedText.subscribe((data) => {
          emitted = data;
        });

        component.onClick();
      });

      it('should emitted a text', () => {
        expect(emitted).toBe('Test2');
      });
    });


    describe('when only the text is present and this should be emitted', () => {
      let emitted: string | undefined = undefined;

      beforeEach(() => {
        component.emitValue = undefined;
        component.emitTextIfValueIsNotPresent = false;
        component.text = 'Test3';

        component.clickedText.subscribe((data) => {
          emitted = data;
        });

        component.onClick();
      });

      it('should emitted a text', () => {
        expect(emitted).toBe(undefined);
      });
    });
  });
});
