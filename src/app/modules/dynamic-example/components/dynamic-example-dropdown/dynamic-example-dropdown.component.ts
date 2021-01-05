import {Component, Input} from '@angular/core';
import {DynamicComponent} from '../../../../../../projects/sso-dynamic/src/lib/model/dynamic-component.class';

@Component({
  selector: 'sso-dynamic-example-dropdown',
  templateUrl: './dynamic-example-dropdown.component.html',
  styleUrls: [
    './dynamic-example-dropdown.component.scss',
  ],
})
export class DynamicExampleDropdownComponent {
  @Input()
  public dropdownComponents: DynamicComponent[];

  public dropdownVisible = false;

  public toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
