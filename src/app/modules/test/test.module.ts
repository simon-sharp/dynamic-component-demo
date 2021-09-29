import {NgModule} from '@angular/core';
import {TestStartpageComponent} from './pages/test-startpage/test-startpage.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../shared/shared.module';
import {TestRoutingModule} from './test-routing.module';

@NgModule({
  declarations: [
    TestStartpageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    TestRoutingModule,
  ]
})
export class TestModule {}
