import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckboxStateEnum} from '../../model/checkbox-state.enum';
import {KeyValuePair} from '../../model/key-value-pair.class';

@Component({
  selector: 'app-shared-selection-item',
  templateUrl: './shared-selection-item.component.html',
})
export class SharedSelectionItemComponent {
  @Input()
  public text: string = '';

  @Input()
  public checked: boolean = false;

  @Input()
  public emitValue?: any;

  @Output()
  public valueChanged: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  public getCheckedState(): CheckboxStateEnum {
    if (this.checked) {
      return CheckboxStateEnum.CHECKED;
    }

    return CheckboxStateEnum.NONE;
  }

  public checkboxClicked(): void {
    this.checked = !this.checked;

    if (this.valueChanged) {
      this.valueChanged.emit(
        new KeyValuePair(
          this.checked
            ? 'checked'
            : 'unchecked',
          this.emitValue
        )
      );
    }
  }
}
