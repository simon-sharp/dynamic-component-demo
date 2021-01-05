import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoreStartpageComponent} from './modules/core/pages/core-startpage/core-startpage.component';
import {Core404Component} from './modules/core/pages/core-404/core-404.component';

const routes: Routes = [
  {
    path: '',
    component: CoreStartpageComponent,
  },
  {
    path: 'material',
    loadChildren: () => import('./modules/material-test/material-test.module').then(
      (m) => m.MaterialTestModule
    ),
  },
  {
    path: 'dynamic',
    loadChildren: () => import('./modules/dynamic-loading-test/dynamic-loading-test.module').then(
      (m) => m.DynamicLoadingTestModule
    ),
  },
  {
    path: 'dynamic-example',
    loadChildren: () => import('./modules/dynamic-example/dynamic-example.module').then(
      (m) => m.DynamicExampleModule
    ),
  },
  {
    path: 'moduleone',
    loadChildren: () => import('./modules/moduleone/moduleone.module').then(
      (m) => m.ModuleoneModule
    ),
  },
  {
    path: 'moduletwo',
    loadChildren: () => import('./modules/moduletwo/moduletwo.module').then(
      (m) => m.ModuletwoModule
    ),
  },
  {
    path: '**',
    component: Core404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
