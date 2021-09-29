import {Component, Input, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/model/table-column.class';
import {FormSectionDeclaration} from '../../../shared/model/form-section-declaration.class';
import {FormFieldDeclaration} from '../../../shared/model/form-field-declaration.class';
import {SharedFormInputComponent} from '../../../shared/components/shared-form-input/shared-form-input.component';
import {DynamicComponent} from '../../../shared/model/dynamic-component.class';

@Component({
  selector: 'app-test-startpage',
  templateUrl: './test-startpage.component.html',
})
export class TestStartpageComponent implements OnInit {
  public tableColumns: TableColumn[] = [];
  public tableData: any[] = [];

  public formSections: FormSectionDeclaration[] = [];

  public ngOnInit(): void {
    this.initTableColumns();
    this.initTableData();

    this.initForm();
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
    ];
  }

  public initTableData(): void {
    this.tableData = [
      {
        vorname: 'Chuck',
        nachname: 'Norris',
      },
      {
        vorname: 'Bruce',
        nachname: 'Willis',
      },
      {
        vorname: 'Angelina',
        nachname: 'Jolie',
      },
      {
        vorname: 'Arnold',
        nachname: 'Schwarzenegger',
      },
      {
        vorname: 'Scarlet',
        nachname: 'Johansson',
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
              }
            }),
            bootstrapWidth: 6,
          })
        ]
      })
    ];
  }
}
