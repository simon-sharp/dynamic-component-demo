import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/model/table-column.class';
import {FormSectionDeclaration} from '../../../shared/model/form-section-declaration.class';
import {FormFieldDeclaration} from '../../../shared/model/form-field-declaration.class';
import {SharedFormInputComponent} from '../../../shared/components/shared-form-input/shared-form-input.component';
import {DynamicComponent} from '../../../shared/model/dynamic-component.class';
import {SharedTextClickComponent} from '../../../shared/components/shared-text-click/shared-text-click.component';
import {KeyValuePair} from '../../../shared/model/key-value-pair.class';

@Component({
  selector: 'app-test-startpage',
  templateUrl: './test-startpage.component.html',
})
export class TestStartpageComponent implements OnInit {
  public tableColumns: TableColumn[] = [];
  public tableData: any[] = [];

  public formSections: FormSectionDeclaration[] = [];

  public movieClickedEmitter = new EventEmitter();

  public formDataEmitter = new EventEmitter();

  public ngOnInit(): void {
    this.initTableColumns();
    this.initTableData();
    this.initForm();
    this.initMovieClickedEmitter();
  }

  public initTableColumns(): void {
    this.tableColumns = [
      new TableColumn({
        title: 'Vorname',
        nameInData: 'vorname',
      }),
      new TableColumn({
        title: 'Nachname',
        nameInData: 'nachname',
      }),
      new TableColumn({
        title: 'Film',
        nameInData: 'movie',
        dynamicComponent: new DynamicComponent<SharedTextClickComponent>({
          componentType: SharedTextClickComponent,
          outputs: {
            clickedText: this.movieClickedEmitter
          }
        }),
        dynamicComponentRowInputValues: [
          new KeyValuePair('text', 'movie'),
          new KeyValuePair('emitValue', 'movie'),
        ]
      }),
    ];
  }

  public initTableData(): void {
    this.tableData = [
      {
        vorname: 'Chuck',
        nachname: 'Norris',
        movie: 'The Expandables',
      },
      {
        vorname: 'Bruce',
        nachname: 'Willis',
        movie: 'Die hard',
      },
      {
        vorname: 'Angelina',
        nachname: 'Jolie',
        movie: 'Lara Croft',
      },
      {
        vorname: 'Arnold',
        nachname: 'Schwarzenegger',
        movie: 'Terminator',
      },
      {
        vorname: 'Scarlet',
        nachname: 'Johansson',
        movie: 'Avengers',
      }
    ];
  }

  public initForm(): void {
    this.formSections = [
      new FormSectionDeclaration({
        formFields: [
          new FormFieldDeclaration({
            formComponent: new DynamicComponent<SharedFormInputComponent>({
              componentType: SharedFormInputComponent,
              inputs: {
                label: 'Vorname',
                name: 'vorname',
                mandatory: true,
                minLength: 5,
              },
              outputs: {
                formValueChangedEmitter: this.formDataEmitter,
              }
            }),
            bootstrapWidth: 6,
          }),
          new FormFieldDeclaration({
            formComponent: new DynamicComponent<SharedFormInputComponent>({
              componentType: SharedFormInputComponent,
              inputs: {
                label: 'Nachname',
                name: 'nachname',
              },
              outputs: {
                formValueChangedEmitter: this.formDataEmitter,
              }
            }),
            bootstrapWidth: 6,
          }),
          new FormFieldDeclaration({
            formComponent: new DynamicComponent<SharedFormInputComponent>({
              componentType: SharedFormInputComponent,
              inputs: {
                label: 'Strasse',
                name: 'street',
                value: 'street11111'
              },
              outputs: {
                formValueChangedEmitter: this.formDataEmitter,
              }
            }),
            bootstrapWidth: 12,
          })
        ]
      })
    ];
  }

  public initMovieClickedEmitter(): void {
    this.movieClickedEmitter.subscribe((data) => {
      console.log('movieClickedEmitter', data);
    });
  }

  public formDataEmitted(formData: any): void {
    console.log('formData', formData);
  }
}
