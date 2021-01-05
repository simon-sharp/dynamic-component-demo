import {Component, Input} from '@angular/core';

@Component({
  selector: 'sso-dynamic-loading-test-loaded',
  templateUrl: './dynamic-loading-test-loaded.component.html',
})
export class DynamicLoadingTestLoadedComponent {
  @Input()
  public text?: string;
}
