import {Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../shared/model/table-column.class';

@Component({
  selector: 'app-test-startpage',
  templateUrl: './test-startpage.component.html',
})
export class TestStartpageComponent implements OnInit {
  public tableColumns: TableColumn[] = [];
  public tableData: any[] = [];

  public ngOnInit(): void {
    this.initTableColumns();
    this.initTableData();
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
}
