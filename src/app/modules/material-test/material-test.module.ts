import {NgModule} from '@angular/core';
import {MaterialTestRoutingModule} from './material-test-routing.module';
import {MaterialTestStartpageComponent} from './pages/material-test-startpage/material-test-startpage.component';
import {MaterialTestModalComponent} from './components/material-test-modal/material-test-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    MaterialTestStartpageComponent,
    MaterialTestModalComponent,
  ],
  imports: [
    MaterialTestRoutingModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class MaterialTestModule {}
