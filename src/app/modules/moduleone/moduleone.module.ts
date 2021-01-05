import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleoneRoutingModule} from './moduleone-routing.module';
import {ModuleoneStartpageComponent} from './pages/moduleone-startpage/moduleone-startpage.component';
import {ModuleoneLoadedComponent} from './components/moduleone-loaded/moduleone-loaded.component';
import {SsoDynamicModule} from '../../../../projects/sso-dynamic/src/lib/sso-dynamic.module';

@NgModule({
  declarations: [
    ModuleoneStartpageComponent,
    ModuleoneLoadedComponent,
  ],
  imports: [
    CommonModule,
    SsoDynamicModule,
    ModuleoneRoutingModule
  ],
})
export class ModuleoneModule {}
