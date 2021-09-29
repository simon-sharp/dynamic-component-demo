import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-base',
  templateUrl: './shared-base.component.html',
})
export class SharedBaseComponent implements OnDestroy {
  public subscriptions: Subscription = new Subscription();

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
