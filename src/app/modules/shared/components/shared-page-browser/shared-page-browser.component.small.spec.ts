import {SharedPageBrowserComponent} from './shared-page-browser.component';
import {Paging} from '../../model/paging.class';
import {EventEmitter} from '@angular/core';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

describe('Shared: Page Browser Component', () => {
  let component: SharedPageBrowserComponent;

  beforeAll(() => {
    component = new SharedPageBrowserComponent();
  });

  describe('when looking at initial values', () => {
    it('should have an empty paging', () => {
      expect(component.paging).toEqual(new Paging());
    });

    it('should have a paging Emitter set', () => {
      expect(component.pagingChange).toEqual(new EventEmitter<Paging>());
    });

    it('should have an undefined numberOfPages', () => {
      expect(component.numberOfPages).toEqual(undefined);
    });

    it('should have an undefined currentPage', () => {
      expect(component.currentPage).toEqual(undefined);
    });
  });

  describe('when calling ngOnInit', () => {
    beforeAll(() => {
      component.ngOnInit();
    });

    it('should have a Paging Object', () => {
      expect(component.paging).toEqual(new Paging(0, 10, 0));
    });

    it('should have calculated the numberOfPages', () => {
      expect(component.numberOfPages).toEqual(0);
    });

    it('should have a currentPage of 1', () => {
      expect(component.currentPage).toEqual(1);
    });
  });

  describe('when calling initPagingObject and the paging is already set', () => {
    beforeAll(() => {
      component.paging = new Paging(0, 10, 10);
      component.initPagingObject();
    });

    it('should have a Paging Object', () => {
      expect(component.paging).toEqual(new Paging(0, 10, 10));
    });
  });

  describe('when calling calculateNumberOfPages and the paging is not set', () => {
    beforeAll(() => {
      component.paging = new Paging();
      component.calculateNumberOfPages();
    });

    it('should have a numberOfPages of 0', () => {
      expect(component.numberOfPages).toEqual(0);
    });
  });

  describe('when calling getEndOfDisplayRange', () => {
    describe('when calling it within the search radius', () => {
      beforeAll(() => {
        component.paging = new Paging(0, 10, 10);
      });

      it('should have a getEndOfDisplayRange of 10', () => {
        expect(component.getEndOfDisplayRange()).toEqual(10);
      });
    });

    describe('when calling it outside the search radius', () => {
      beforeAll(() => {
        component.paging = new Paging(20, 10, 10);
      });

      it('should have a getEndOfDisplayRange of 10', () => {
        expect(component.getEndOfDisplayRange()).toEqual(10);
      });
    });
  });

  describe('when calling jumpToFirstPage', () => {
    beforeAll(() => {
      component.paging = new Paging(200, 10, 10);
      component.jumpToFirstPage();
    });

    it('should have moved to the first page', () => {
      expect(component.paging.getSkip()).toEqual(0);
    });
  });

  describe('when calling jumpToLastPage', () => {
    beforeAll(() => {
      component.paging = new Paging(0, 10, 99);
      component.jumpToLastPage();
    });

    it('should have moved to the last page', () => {
      expect(component.paging.getSkip()).toEqual(90);
    });
  });

  describe('when calling goNPagesForward', () => {
    describe('when calling it within existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(0, 10, 99);
        component.goNPagesForward(2);
      });

      it('should have moved to the nth page', () => {
        expect(component.paging.getSkip()).toEqual(20);
      });
    });

    describe('when calling it outside the existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(90, 10, 99);
        component.goNPagesForward(2);
      });

      it('should have moved to the nth page', () => {
        expect(component.paging.getSkip()).toEqual(90);
      });
    });
  });

  describe('when calling goNPagesBackwards', () => {
    describe('when calling it within existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(50, 10, 99);
        component.goNPagesBackwards(2);
      });

      it('should have moved to the nth page', () => {
        expect(component.paging.getSkip()).toEqual(30);
      });
    });

    describe('when calling it outside the existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(0, 10, 99);
        component.goNPagesBackwards(2);
      });

      it('should have moved to the nth page', () => {
        expect(component.paging.getSkip()).toEqual(0);
      });
    });
  });

  describe('when calling showMinusNPagesButton', () => {
    describe('when calling it within existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(50, 10, 99);
      });

      it('should have moved to the nth page', () => {
        expect(component.showMinusNPagesButton(1)).toEqual(true);
      });
    });

    describe('when calling it outside the existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(0, 10, 99);
        component.goNPagesBackwards(2);
      });

      it('should have moved to the nth page', () => {
        expect(component.showMinusNPagesButton(1)).toEqual(false);
      });
    });
  });

  describe('when calling showPlusNPagesButton', () => {
    describe('when calling it within existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(50, 10, 99);
      });

      it('should have moved to the nth page', () => {
        expect(component.showPlusNPagesButton(1)).toEqual(true);
      });
    });

    describe('when calling it outside the existing pages', () => {
      beforeAll(() => {
        component.paging = new Paging(90, 10, 99);
      });

      it('should have moved to the nth page', () => {
        expect(component.showPlusNPagesButton(1)).toEqual(false);
      });
    });

    describe('when calling it with plus 0 pages', () => {
      beforeAll(() => {
        component.paging = new Paging(90, 10, 99);
      });

      it('should have moved to the nth page', () => {
        expect(component.showPlusNPagesButton(0)).toEqual(false);
      });
    });
  });

  describe('when calling getGoToStartIcon', () => {
    it('should return the icon', () => {
      expect(component.getGoToStartIcon()).toEqual(SolidIcons.faAngleDoubleLeft);
    });
  });

  describe('when calling getPreviousIcon', () => {
    it('should return the icon', () => {
      expect(component.getPreviousIcon()).toEqual(SolidIcons.faAngleLeft);
    });
  });

  describe('when calling getNextIcon', () => {
    it('should return the icon', () => {
      expect(component.getNextIcon()).toEqual(SolidIcons.faAngleRight);
    });
  });

  describe('when calling getGoToEndIcon', () => {
    it('should return the icon', () => {
      expect(component.getGoToEndIcon()).toEqual(SolidIcons.faAngleDoubleRight);
    });
  });
});
