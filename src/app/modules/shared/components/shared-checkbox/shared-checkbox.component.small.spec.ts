import {SharedCheckboxComponent} from './shared-checkbox.component';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {CheckboxStateEnum} from '../../model/checkbox-state.enum';
import {IconTypeEnum} from '../../model/icon-type.enum';
import {EventEmitter} from '@angular/core';

describe('Shared: Checkbox Component', () => {
  let component: SharedCheckboxComponent;

  beforeAll(() => {
    component = new SharedCheckboxComponent();
  });

  describe('when testing getIcon', () => {
    describe('when checked is CheckboxStateEnum.NONE', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.NONE;
      });

      it('should return a SolidIcons.faCheckSquare', () => {
        expect(component.getIcon()).toEqual(RegularIcons.faSquare);
      });
    });

    describe('when checked is CheckboxStateEnum.CHECKED', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.CHECKED;
      });

      it('should return a SolidIcons.faCheckSquare', () => {
        expect(component.getIcon()).toEqual(SolidIcons.faCheckSquare);
      });
    });

    describe('when checked is CheckboxStateEnum.ALL_CHECKED', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.ALL_CHECKED;
      });

      it('should return a RegularIcons.faMinusSquare', () => {
        expect(component.getIcon()).toEqual(RegularIcons.faMinusSquare);
      });
    });

    describe('when checked is undefined', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.NONE;
      });

      it('should return a RegularIcons.faSquare', () => {
        expect(component.getIcon()).toEqual(RegularIcons.faSquare);
      });
    });
  });

  describe('when testing getCheckedIcon', () => {
    it('should return a SolidIcons.faCheckSquare', () => {
      expect(component.getCheckedIcon()).toEqual(SolidIcons.faCheckSquare);
    });
  });

  describe('when testing getUncheckedIcon', () => {
    it('should return a RegularIcons.faSquare', () => {
      expect(component.getUncheckedIcon()).toEqual(RegularIcons.faSquare);
    });
  });

  describe('when testing getAllCheckedIcon', () => {
    it('should return a RegularIcons.faMinusSquare', () => {
      expect(component.getAllCheckedIcon()).toEqual(RegularIcons.faMinusSquare);
    });
  });

  describe('when testing onCheckboxClick', () => {
    describe('when the state is CheckboxStateEnum.NONE', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.NONE;
        component.onCheckboxClick();
      });

      it('should have set the checkbox checked to CheckboxStateEnum.CHECKED', () => {
        expect(component.checked).toEqual(CheckboxStateEnum.CHECKED);
      });
    });

    describe('when the state is CheckboxStateEnum.CHECKED', () => {
      describe('when hasThreeStates is true', () => {
        beforeAll(() => {
          component.hasThreeStates = true;
          component.checked = CheckboxStateEnum.CHECKED;
          component.valueChanged = new EventEmitter<CheckboxStateEnum>();

          component.onCheckboxClick();
        });

        it('should have a checked of CheckboxStateEnum.ALL_CHECKED', () => {
          expect(component.checked).toEqual(CheckboxStateEnum.ALL_CHECKED);
        });
      });

      describe('when hasThreeStates is false', () => {
        beforeAll(() => {
          component.hasThreeStates = false;
          component.checked = CheckboxStateEnum.CHECKED;

          component.onCheckboxClick();
        });

        it('should have a checked of CheckboxStateEnum.NONE', () => {
          expect(component.checked).toEqual(CheckboxStateEnum.NONE);
        });
      });
    });

    describe('when the state is CheckboxStateEnum.ALL_CHECKED', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.ALL_CHECKED;
        component.onCheckboxClick();
      });

      it('should have set the checkbox checked to CheckboxStateEnum.NONE', () => {
        expect(component.checked).toEqual(CheckboxStateEnum.NONE);
      });
    });

    describe('when the state is undefined', () => {
      beforeAll(() => {
        component.checked = CheckboxStateEnum.NONE;
        component.onCheckboxClick();
      });

      it('should have set the checkbox checked to CheckboxStateEnum.NONE', () => {
        expect(component.checked).toEqual(CheckboxStateEnum.NONE);
      });
    });
  });

  describe('when testing getIconType', () => {
    it('should return a IconTypeEnum.FONT_AWESOME', () => {
      expect(component.getIconType()).toEqual(IconTypeEnum.FONT_AWESOME);
    });
  });
});
