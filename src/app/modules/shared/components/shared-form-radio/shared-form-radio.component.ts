import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormLabelPosition} from '../../model/form-label-position.enum';
import {FormComponentDeclarationInterface} from '../../model/form-component-declaration.interface';
import {FormBase} from '../../model/form-base.class';
import {KeyValuePair} from '../../model/key-value-pair.class';

@Component({
  selector: 'app-shared-form-radio',
  templateUrl: 'shared-form-radio.component.html',
  styleUrls: ['./shared-form-radio.component.scss']
})
export class SharedFormRadioComponent extends FormBase implements FormComponentDeclarationInterface {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() options: KeyValuePair[] = [];
  @Input() mandatory: boolean = false;
  @Input() disabled: boolean = false;
  @Input() pattern: string = '';
  @Input() patternErrorText: string = 'Treffen sie eine Wahl';
  @Input() labelPosition: FormLabelPosition = FormLabelPosition.top;

  @Output() formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  public onChange(): void {
    if (this.formValueChangedEmitter) {
      this.formValueChangedEmitter.emit(new KeyValuePair(this.name, this.value));
    }
  }

  public setValue(value: string): void {
    this.value = value;
    this.onChange();
  }
}
