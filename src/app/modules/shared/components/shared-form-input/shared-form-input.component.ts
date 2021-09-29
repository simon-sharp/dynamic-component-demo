import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormLabelPosition} from '../../model/form-label-position.enum';
import {FormComponentDeclarationInterface} from '../../model/form-component-declaration.interface';
import {FormBase} from '../../model/form-base.class';
import {KeyValuePair} from '../../model/key-value-pair.class';

@Component({
  selector: 'app-shared-form-input',
  templateUrl: './shared-form-input.component.html',
  styleUrls: ['./shared-form-input.component.scss']
})
export class SharedFormInputComponent extends FormBase implements FormComponentDeclarationInterface {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() mandatory: boolean = false;
  @Input() disabled: boolean = false;
  @Input() pattern: string = '';
  @Input() patternErrorText: string = 'Der String hat nicht die gewünschte Form';
  @Input() maxLength: number = 9999999999999999999;
  @Input() minLength: number = 0;
  @Input() labelPosition: FormLabelPosition = FormLabelPosition.top;

  @Output() formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  @ViewChild('formInput') formInput: ElementRef = {} as ElementRef<any>;

  public onChange(): void {
    if (this.formValueChangedEmitter) {
      this.formValueChangedEmitter.emit(new KeyValuePair(this.name, this.value));
    }
  }

  public getInputClass(): any {
    return {
      'form--input--element--inline': this.labelPosition === FormLabelPosition.inline,
      'form--input--element--top': this.labelPosition === FormLabelPosition.top,
    };
  }
}
