import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormLabelPosition} from '../../model/form-label-position.enum';
import {FormComponentDeclarationInterface} from '../../model/form-component-declaration.interface';
import {FormBase} from '../../model/form-base.class';
import {KeyValuePair} from '../../model/key-value-pair.class';

@Component({
  selector: 'app-shared-form-textarea',
  templateUrl: 'shared-form-textarea.component.html',
  styleUrls: ['./shared-form-textarea.component.scss']
})
export class SharedFormTextareaComponent extends FormBase implements FormComponentDeclarationInterface {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() mandatory: boolean = false;
  @Input() disabled: boolean = false;
  @Input() pattern: string = '';
  @Input() patternErrorText: string = 'Der String hat nicht die gewünschte Form';
  @Input() maxLength: number = 99999999999999999999999999;
  @Input() minLength: number = 0;
  @Input() labelPosition: FormLabelPosition = FormLabelPosition.top;

  @Output() formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  public onChange(): void {
    if (this.formValueChangedEmitter) {
      this.formValueChangedEmitter.emit(
        new KeyValuePair(this.name, this.value)
      );
    }
  }
}
