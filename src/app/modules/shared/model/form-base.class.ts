import {FormLabelPosition} from './form-label-position.enum';
import {FormComponentDeclarationInterface} from './form-component-declaration.interface';
import {EventEmitter} from '@angular/core';
import {KeyValuePair} from './key-value-pair.class';

export class FormBase implements FormComponentDeclarationInterface {
	public label: string = '';
	public description: string = '';
	public name: string = '';
	public mandatory: boolean = false;
	public disabled: boolean = false;
	public labelPosition: FormLabelPosition = FormLabelPosition.none;

	public formValueChangedEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

	public isLabelTop(): boolean {
		return this.labelPosition === FormLabelPosition.top;
	}

	public isLabelInline(): boolean {
		return this.labelPosition === FormLabelPosition.inline;
	}
}
