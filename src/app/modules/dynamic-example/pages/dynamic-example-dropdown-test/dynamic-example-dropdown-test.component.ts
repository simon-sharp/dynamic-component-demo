import {Component, OnInit} from '@angular/core';
import {DynamicComponent} from '../../../../../../projects/sso-dynamic/src/lib/model/dynamic-component.class';
import {DynamicExampleInsertedComponent} from '../../components/dynamic-example-inserted/dynamic-example-inserted.component';

@Component({
  selector: 'sso-dynamic-example-dropdown-test',
  templateUrl: './dynamic-example-dropdown-test.component.html',
})
export class DynamicExampleDropdownTestComponent implements OnInit {
  public dropdownComponents: DynamicComponent[];

  public ngOnInit(): void {
    this.dropdownComponents = [
      new DynamicComponent({
        componentType: DynamicExampleInsertedComponent,
        inputs: {
          text: 'Entry 1',
        },
      }),
      new DynamicComponent({
        componentType: DynamicExampleInsertedComponent,
        inputs: {
          text: 'Entry 2',
        },
      }),
    ];
  }
}
