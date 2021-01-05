import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreStartpageComponent} from './pages/core-startpage/core-startpage.component';
import {RouterModule} from '@angular/router';
import {Core404Component} from './pages/core-404/core-404.component';

@NgModule({
  declarations: [
    CoreStartpageComponent,
    Core404Component,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class CoreModule {}
