import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {DynamicLoadingTestLoadedComponent} from './components/dynamic-loading-test-loaded/dynamic-loading-test-loaded.component';
import {DynamicLoadingTestRoutingModule} from './dynamic-loading-test-routing.module';
import {DynamicLoadingTestStartpageComponent} from './pages/dynamic-loading-test-startpage/dynamic-loading-test-startpage.component';

@NgModule({
  declarations: [
    DynamicLoadingTestStartpageComponent,
    DynamicLoadingTestLoadedComponent,
  ],
  imports: [
    DynamicLoadingTestRoutingModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class DynamicLoadingTestModule {}
