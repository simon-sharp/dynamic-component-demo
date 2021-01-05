import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuletwoRoutingModule} from './moduletwo-routing.module';
import {ModuletwoStartpageComponent} from './pages/moduletwo-startpage/moduletwo-startpage.component';

@NgModule({
  declarations: [
    ModuletwoStartpageComponent
  ],
  imports: [
    CommonModule,
    ModuletwoRoutingModule
  ],
  providers: []
})
export class ModuletwoModule {
}
