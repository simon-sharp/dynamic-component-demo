import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {
  DynamicExampleDropdownTestComponent
} from './pages/dynamic-example-dropdown-test/dynamic-example-dropdown-test.component';
import {
  DynamicExampleDropdownComponent
} from './components/dynamic-example-dropdown/dynamic-example-dropdown.component';
import {SsoDynamicModule} from '../../../../projects/sso-dynamic/src/lib/sso-dynamic.module';
import {DynamicExampleRoutingModule} from './dynamic-example-routing.module';
import {
  DynamicExampleInsertedComponent
} from './components/dynamic-example-inserted/dynamic-example-inserted.component';

@NgModule({
  declarations: [
    DynamicExampleDropdownTestComponent,
    DynamicExampleDropdownComponent,
    DynamicExampleInsertedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DynamicExampleRoutingModule,
    SsoDynamicModule,
  ],
})
export class DynamicExampleModule {}
