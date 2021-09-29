import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormComponentDeclarationInterface} from '../../model/form-component-declaration.interface';
import {FormLabelPosition} from '../../model/form-label-position.enum';
import {FormBase} from '../../model/form-base.class';
import {KeyValuePair} from '../../model/key-value-pair.class';
import {CheckboxStateEnum} from '../../model/checkbox-state.enum';

@Component({
  selector: 'app-shared-form-boolean',
  templateUrl: 'shared-form-boolean.component.html',
  styleUrls: ['./shared-form-boolean.component.scss']
})
export class SharedFormBooleanComponent extends FormBase implements FormComponentDeclarationInterface {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() name: string = '';
  @Input() value: boolean= false;
  @Input() mandatory: boolean = false;
  @Input() disabled: boolean = false;
  @Input() labelPosition: FormLabelPosition = FormLabelPosition.top;

  @Output() formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  public touched: boolean = false;

  public onChange(value: CheckboxStateEnum): void {
    this.touched = true;

    switch (value) {
      case CheckboxStateEnum.NONE:
        this.value = false;

        break;
      case CheckboxStateEnum.CHECKED:
        this.value = true;

        break;
      case CheckboxStateEnum.ALL_CHECKED:
        this.value = true;

        break;
    }

    if (this.formValueChangedEmitter) {
      this.formValueChangedEmitter.emit(
        new KeyValuePair(this.name, this.value)
      );
    }
  }

  public getCheckboxValue(): CheckboxStateEnum {
    if (this.value === false) {
      return CheckboxStateEnum.NONE;
    } else {
      return CheckboxStateEnum.CHECKED;
    }
  }
}
