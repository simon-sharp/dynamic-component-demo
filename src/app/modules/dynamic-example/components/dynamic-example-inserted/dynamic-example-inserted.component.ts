import {Component, Input} from '@angular/core';

@Component({
  selector: 'sso-dynamic-example-inserted',
  templateUrl: './dynamic-example-inserted.component.html',
})
export class DynamicExampleInsertedComponent {
  @Input()
  public text: string;
}
