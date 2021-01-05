import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModuletwoStartpageComponent} from './pages/moduletwo-startpage/moduletwo-startpage.component';

const routes: Routes = [
  {
    path: '',
    component: ModuletwoStartpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuletwoRoutingModule {
}
