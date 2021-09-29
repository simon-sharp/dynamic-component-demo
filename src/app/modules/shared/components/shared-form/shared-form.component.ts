import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormFieldDeclaration} from '../../model/form-field-declaration.class';
import {FormSectionDeclaration} from '../../model/form-section-declaration.class';
import {HelperService} from '../../services/helper.service';
import {KeyValuePair} from '../../model/key-value-pair.class';
import {DynamicComponent} from '../../model/dynamic-component.class';
import {SharedEmptyComponent} from '../shared-empty/shared-empty.component';

@Component({
  selector: 'app-shared-form',
  templateUrl: 'shared-form.component.html',
  styleUrls: ['./shared-form.component.scss']
})
export class SharedFormComponent implements OnInit, OnDestroy {
  @Input() formSections: FormSectionDeclaration[] = [];
  @Input() hasSubmitButton: boolean = true;
  @Input() submitButtonText: string = 'Speichern';
  @Input() hasCancelButton: boolean = false;
  @Input() cancelButtonText: string = 'Abbrechen';
  @Input() formData: any = {};
  @Input() formComponentEmitters: EventEmitter<any>[] = [];

  @Output() formSubmitEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() formCancelEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() formDataEmitter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('formReference') formReference: any;

  public formIsValid: boolean = false;

  public formComponentEmitterSubscriptions: any[] = [];

  constructor(
    public helperService: HelperService
  ) {
  }

  public ngOnInit(): void {
    this.initFormChangeBehaviour();
  }

  public initFormChangeBehaviour(): void {
    if (!!this.formComponentEmitters && this.formComponentEmitters !== []) {
      for (let formComponentEmitter of this.formComponentEmitters) {
        this.formComponentEmitterSubscriptions.push(
          formComponentEmitter.subscribe(
            (data: KeyValuePair) => {
              this.helperService.saveToNestedDataBody(data.key, this.formData, data.value);

              if (this.formDataEmitter) {
                this.formDataEmitter.emit(this.formData);
              }
            }
          )
        );
      }
    }
  }

  public ngOnDestroy(): void {
    if (!!this.formComponentEmitterSubscriptions) {
      for (let formComponentEmitterSubscription of this.formComponentEmitterSubscriptions) {
        formComponentEmitterSubscription.unsubscribe();
      }
    }
  }

  public formChange(form: any): void {
    this.validateForm(form.target.form);
  }

  public submitButtonPressed(form: any): boolean {
    this.validateForm(form.target);

    if (this.formIsValid) {
      this.formSubmitEmitter.emit(null);

      return true;
    }

    return false;
  }

  public cancelButtonPressed(): void {
    this.formCancelEmitter.emit(null);
  }

  public validateForm(form: any): void {
    let hasOnlyValidElements = true;

    for (let i = 0; i < form.length; i++) {
      if (
        form[i.toString()].willValidate
        && !form[i.toString()].validity.valid
      ) {
        hasOnlyValidElements = false;
      }
    }

    this.formIsValid = hasOnlyValidElements;
  }

  public calculateBootstrapWidthForFormSection(section: FormSectionDeclaration): any {
    let returnValue: any = {};

    if (section.bootstrapWidth) {
      returnValue['col-' + section.bootstrapWidth] = true;
    } else if (
      !section.bootstrapXlWidth
      && !section.bootstrapLgWidth
      && !section.bootstrapMdWidth
      && !section.bootstrapXsWidth
      && !section.bootstrapSmWidth
    ) {
      returnValue['col-12'] = true;
    }

    if (section.bootstrapXlWidth) {
      returnValue['col-xl-' + section.bootstrapXlWidth] = true;
    }

    if (section.bootstrapLgWidth) {
      returnValue['col-lg-' + section.bootstrapLgWidth] = true;
    }

    if (section.bootstrapMdWidth) {
      returnValue['col-md-' + section.bootstrapMdWidth] = true;
    }

    if (section.bootstrapXsWidth) {
      returnValue['col-xs-' + section.bootstrapXsWidth] = true;
    }

    if (section.bootstrapSmWidth) {
      returnValue['col-sm-' + section.bootstrapSmWidth] = true;
    }

    return returnValue;
  }

  public calculateBootstrapWidthForFormElement(field: FormFieldDeclaration): any {
    let returnValue: any = {};

    if (field.bootstrapWidth) {
      returnValue['col-' + field.bootstrapWidth] = true;
    } else if (
      !field.bootstrapXlWidth
      && !field.bootstrapLgWidth
      && !field.bootstrapMdWidth
      && !field.bootstrapXsWidth
      && !field.bootstrapSmWidth
    ) {
      returnValue['col-12'] = true;
    }

    if (field.bootstrapXlWidth) {
      returnValue['col-xl-' + field.bootstrapXlWidth] = true;
    }

    if (field.bootstrapLgWidth) {
      returnValue['col-lg-' + field.bootstrapLgWidth] = true;
    }

    if (field.bootstrapMdWidth) {
      returnValue['col-md-' + field.bootstrapMdWidth] = true;
    }

    if (field.bootstrapXsWidth) {
      returnValue['col-xs-' + field.bootstrapXsWidth] = true;
    }

    if (field.bootstrapSmWidth) {
      returnValue['col-sm-' + field.bootstrapSmWidth] = true;
    }

    return returnValue;
  }

  public isFormSectionActive(formSection: FormSectionDeclaration): boolean {
    return formSection.active === undefined || formSection.active;
  }

  public getDynamicComponent(formField: FormFieldDeclaration): DynamicComponent<any> {
    return formField.formComponent ?? new DynamicComponent<SharedEmptyComponent>({
      componentType: SharedEmptyComponent,
    });
  }
}
