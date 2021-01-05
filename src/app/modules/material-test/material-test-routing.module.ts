import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MaterialTestStartpageComponent} from './pages/material-test-startpage/material-test-startpage.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialTestStartpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialTestRoutingModule {
}
