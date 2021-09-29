import {SharedDropdownComponent} from './shared-dropdown.component';
import {IconTypeEnum} from '../../model/icon-type.enum';

describe('Shared: Dropdown Component', () => {
  let component: SharedDropdownComponent;

  beforeAll(() => {
    component = new SharedDropdownComponent();
  });

  describe('when looking at the initialized variables', () => {
    it('should have an empty title', () => {
      expect(component.title).toEqual('');
    });

    it('should be active', () => {
      expect(component.active).toEqual(true);
    });

    it('should have an iconType of IconTypeEnum.STANDARD', () => {
      expect(component.iconType).toEqual(IconTypeEnum.FONT_AWESOME);
    });

    it('should have an empty icon', () => {
      expect(component.icon).toBe(undefined);
    });

    it('should have an empty dropdownComponents array', () => {
      expect(component.dropdownComponents).toEqual([]);
    });

    it('should have a showIconLeftOfText of false', () => {
      expect(component.showIconLeftOfText).toBe(false);
    });

    it('should have a dropdownOpensToTheLeft of false', () => {
      expect(component.dropdownOpensToTheLeft).toBe(false);
    });

    it('should have a dropdownOffset of 0', () => {
      expect(component.dropdownOffset).toBe(0);
    });

    it('should have a showDropdown of false', () => {
      expect(component.showDropdown).toBe(false);
    });
  });

  describe('when toggeling the dropdown', () => {
    describe('when active', () => {
      beforeEach(() => {
        component.showDropdown = false;
        component.active = true;

        component.toggleDropdown();
      });

      it('should have opened the dropdown', () => {
        expect(component.showDropdown).toBe(true);
      });
    });

    describe('when inactive', () => {
      beforeEach(() => {
        component.showDropdown = false;
        component.active = false;

        component.toggleDropdown();
      });

      it('should have opened the dropdown', () => {
        expect(component.showDropdown).toBe(false);
      });
    });
  });

  describe('when testing hideDropdown', () => {
    describe('when the ouside click is outside the sharedSelectComponent', () => {
      beforeEach(() => {
        let event: any = {};

        component.showDropdown = true;

        component.sharedDropdownComponent = {
          nativeElement: {
            contains: () => {
              return false;
            }
          }
        };

        component.hideDropdown(event);
      });

      it('should have disabled the dropdown', () => {
        expect(component.showDropdown).toEqual(false);
      });
    });

    describe('when the ouside click is outside the sharedSelectList', () => {
      beforeEach(() => {
        let event: any = {};

        component.showDropdown = true;

        component.sharedDropdownComponent = {
          nativeElement: {
            contains: () => {
              return true;
            }
          }
        };

        component.sharedDropdownList = {
          nativeElement: {
            contains: () => {
              return true;
            }
          }
        };

        component.hideDropdown(event);
      });

      it('should have disabled the dropdown', () => {
        expect(component.showDropdown).toEqual(false);
      });
    });


    describe('when the ouside click is inside', () => {
      beforeEach(() => {
        let event: any = {};

        component.showDropdown = true;

        component.sharedDropdownComponent = {
          nativeElement: {
            contains: () => {
              return true;
            }
          }
        };

        component.sharedDropdownList = {
          nativeElement: {
            contains: () => {
              return false;
            }
          }
        };

        component.hideDropdown(event);
      });

      it('should have disabled the dropdown', () => {
        expect(component.showDropdown).toEqual(true);
      });
    });
  });

  describe('when testing getComponentsOffsetStyle', () => {
    describe('when dropdownOpensToTheLeft is true and the offset is 10px', () => {
      beforeEach(() => {
        component.dropdownOpensToTheLeft = true;
        component.dropdownOffset = 10;
      });

      it('should have a displacement of 10px', () => {
        expect(component.getComponentsOffsetStyle()).toEqual({
          right: '10px'
        });
      });
    });

    describe('when dropdownOpensToTheLeft is false and the offset is 10px', () => {
      beforeEach(() => {
        component.dropdownOpensToTheLeft = false;
        component.dropdownOffset = 10;
      });

      it('should have a displacement of 10px', () => {
        expect(component.getComponentsOffsetStyle()).toEqual({
          left: '10px'
        });
      });
    });
  });

  describe('when testing getButtonCss', () => {
    describe('when component is active', () => {
      beforeEach(() => {
        component.active = true;
      });

      it('should have a displacement of 10px', () => {
        expect(component.getButtonCss()).toEqual({
          'shared-dropdown__toggle-button--is-active': true,
          'shared-dropdown__toggle-button--is-inactive': false
        });
      });
    });

    describe('when component is inactive', () => {
      beforeEach(() => {
        component.active = false;
      });

      it('should have a displacement of 10px', () => {
        expect(component.getButtonCss()).toEqual({
          'shared-dropdown__toggle-button--is-active': false,
          'shared-dropdown__toggle-button--is-inactive': true
        });
      });
    });
  });
});
