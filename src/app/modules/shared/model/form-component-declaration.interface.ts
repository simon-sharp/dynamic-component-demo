import {EventEmitter} from '@angular/core';
import {FormLabelPosition} from './form-label-position.enum';
import {KeyValuePair} from './key-value-pair.class';

export interface FormComponentDeclarationInterface {
	label: string;
	description: string;
	name: string;
	mandatory: boolean;
	disabled: boolean;
	labelPosition: FormLabelPosition;

	formValueChangedEmitter: EventEmitter<KeyValuePair>;

	value?: any;
	placeholder?: string;
	options?: KeyValuePair[];
	type?: string;
	pattern?: string;
	patternErrorText?: string;
	acceptedDragAndDropTypes?: string[];
	dropZoneText?: string;
	accept?: string;
	maxLength?: number;
	minLength?: number;
}
