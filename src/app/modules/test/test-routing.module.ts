import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {TestStartpageComponent} from './pages/test-startpage/test-startpage.component';

const testRoutes: Routes = [
  {
    path: '',
    component: TestStartpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(testRoutes)],
  exports: [RouterModule]
})
export class TestRoutingModule {
}
