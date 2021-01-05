import {NgModule} from '@angular/core';

import {SsoDynamicComponentDirective} from './directives/sso-dynamic-component/sso-dynamic-component.directive';
import {SsoDynamicModuleComponentDirective} from './directives/sso-dynamic-module-component/sso-dynamic-module-component.directive';
import {SsoDynamicComponent} from './components/sso-dynamic/sso-dynamic.component';
import {CommonModule} from '@angular/common';

const COMPONENTS = [
  SsoDynamicComponent,
  SsoDynamicComponentDirective,
  SsoDynamicModuleComponentDirective
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SsoDynamicModule {
}
