import {SharedIconComponent} from './shared-icon.component';
import {IconTypeEnum} from '../../model/icon-type.enum';
import {IconBootstrapTypeEnum} from '../../model/icon-bootstrap-type.enum';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

describe('Shared: Icon Component', () => {
  let component: SharedIconComponent;

  beforeAll(() => {
    component = new SharedIconComponent();
  });

  describe('when looking at the initialized variables', () => {
    it('should have an iconType of IconTypeEnum.FONT_AWESOME', () => {
      expect(component.iconType).toEqual(IconTypeEnum.FONT_AWESOME);
    });

    it('should have an icon of SolidIcons.faHome', () => {
      expect(component.icon).toEqual(SolidIcons.faHome);
    });

    it('should have an empty description', () => {
      expect(component.description).toEqual('');
    });
  });

  describe('when testing getFontAwesomeIcon', () => {
    beforeAll(() => {
      component.icon = SolidIcons.faRoad;
    });

    it('should return the default icon', () => {
      expect(component.getFontAwesomeIcon()).toEqual(SolidIcons.faRoad);
    });
  });

  describe('when testing getBootstrapIcon', () => {
    it('should return the default icon', () => {
      expect(component.getBootstrapIcon()).toEqual({'glyphicon-home': true});
    });
  });

  describe('when testing isFontAwesomeIcon', () => {
    describe('when nothing additional is set', () => {
      beforeEach(() => {
        component.iconType = IconTypeEnum.BOOTSTRAP;
      });

      it('should return the default icon', () => {
        expect(component.isFontAwesomeIcon()).toEqual(false);
      });
    });

    describe('when font_awesome is chosen as icon library', () => {
      beforeEach(() => {
        component.iconType = IconTypeEnum.FONT_AWESOME;
      });

      it('should return the default icon', () => {
        expect(component.isFontAwesomeIcon()).toEqual(true);
      });
    });
  });

  describe('when testing isBootstrapIcon', () => {
    describe('when nothing additional is set', () => {
      beforeEach(() => {
        component.iconType = IconTypeEnum.FONT_AWESOME;
      });

      it('should return the default icon', () => {
        expect(component.isBootstrapIcon()).toEqual(false);
      });
    });

    describe('when bootstrap is chosen as icon library', () => {
      beforeEach(() => {
        component.iconType = IconTypeEnum.BOOTSTRAP;
      });

      it('should return the default icon', () => {
        expect(component.isBootstrapIcon()).toEqual(true);
      });
    });
  });

  describe('when testing getBootstrapIconName', () => {
    describe('when testing with IconBootstrapTypeEnum.HOME', () => {
      beforeEach(() => {
        component.icon = IconBootstrapTypeEnum.HOME;
      });

      it('should return home', () => {
        expect(component.getBootstrapIconName()).toEqual('home');
      });
    });

    describe('when testing with IconBootstrapTypeEnum.CONFIG', () => {
      beforeEach(() => {
        component.icon = IconBootstrapTypeEnum.CONFIG;
      });

      it('should return wrench', () => {
        expect(component.getBootstrapIconName()).toEqual('wrench');
      });
    });

    describe('when testing with IconBootstrapTypeEnum.JOBS', () => {
      beforeEach(() => {
        component.icon = IconBootstrapTypeEnum.JOBS;
      });

      it('should return briefcase', () => {
        expect(component.getBootstrapIconName()).toEqual('briefcase');
      });
    });

    describe('when testing with IconBootstrapTypeEnum.LOG', () => {
      beforeEach(() => {
        component.icon = IconBootstrapTypeEnum.LOG;
      });

      it('should return check', () => {
        expect(component.getBootstrapIconName()).toEqual('check');
      });
    });

    describe('when testing with IconBootstrapTypeEnum.SEARCH', () => {
      beforeEach(() => {
        component.icon = IconBootstrapTypeEnum.SEARCH;
      });

      it('should return search ', () => {
        expect(component.getBootstrapIconName()).toEqual('search');
      });
    });

    describe('when testing with IconBootstrapTypeEnum.UPLOAD', () => {
      beforeEach(() => {
        component.icon = IconBootstrapTypeEnum.UPLOAD;
      });

      it('should return upload', () => {
        expect(component.getBootstrapIconName()).toEqual('upload');
      });
    });

    describe('when testing with the default icon', () => {
      beforeEach(() => {
        component.icon = undefined;
      });

      it('should return home', () => {
        expect(component.getBootstrapIconName()).toEqual('home');
      });
    });
  });
});
