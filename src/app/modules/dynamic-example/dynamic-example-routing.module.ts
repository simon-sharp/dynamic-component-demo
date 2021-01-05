import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  DynamicExampleDropdownTestComponent
} from './pages/dynamic-example-dropdown-test/dynamic-example-dropdown-test.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicExampleDropdownTestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicExampleRoutingModule {
}
