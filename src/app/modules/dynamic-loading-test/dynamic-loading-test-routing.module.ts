import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DynamicLoadingTestStartpageComponent} from './pages/dynamic-loading-test-startpage/dynamic-loading-test-startpage.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicLoadingTestStartpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicLoadingTestRoutingModule {
}
