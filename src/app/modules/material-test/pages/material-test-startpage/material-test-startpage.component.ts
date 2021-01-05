import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MaterialTestModalComponent} from '../../components/material-test-modal/material-test-modal.component';

@Component({
  selector: 'sso-material-test-startpage',
  templateUrl: './material-test-startpage.component.html',
})
export class MaterialTestStartpageComponent {
  public dialogRef;

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    this.closeModalIfAlreadyOpened();

    this.dialogRef = this.dialog.open(
      MaterialTestModalComponent,
      {
        height: '400px',
        width: '600px',
      }
    );
  }

  public closeModalIfAlreadyOpened(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
