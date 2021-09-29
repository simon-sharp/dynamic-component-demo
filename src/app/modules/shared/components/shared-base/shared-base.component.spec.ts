import { SharedBaseComponent } from './shared-base.component';
import { Subscription } from 'rxjs';

describe('Shared: SharedBaseComponent', () => {
  let component: SharedBaseComponent;

  beforeAll(() => {
    component = new SharedBaseComponent();
  });

  describe('when looking at the instance', () => {
    it('should have created an instance of the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('when testing ngOnDestroy', () => {
    describe('when subscriptions are present', () => {
      beforeEach(() => {
        component.subscriptions.add(new Subscription());
        component.ngOnDestroy();
      });

      it('should have unsubscribed all subscriptions', () => {
        expect(component.subscriptions.closed).toBe(true);
      });
    });
  });
});
