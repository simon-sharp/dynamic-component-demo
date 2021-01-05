import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModuleoneStartpageComponent} from './pages/moduleone-startpage/moduleone-startpage.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleoneStartpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleoneRoutingModule {
}
