import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedDynamicComponent} from './components/shared-dynamic/shared-dynamic.component';
import {SharedDynamicComponentDirective} from './directives/shared-dynamic-component/shared-dynamic-component.directive';
import {SharedEmptyComponent} from './components/shared-empty/shared-empty.component';
import {SharedDynamicModuleComponentDirective} from './directives/shared-dynamic-module-component/shared-dynamic-module-component.directive';
import {SharedCheckboxComponent} from './components/shared-checkbox/shared-checkbox.component';
import {SharedTextClickComponent} from './components/shared-text-click/shared-text-click.component';
import {SharedIconComponent} from './components/shared-icon/shared-icon.component';
import {SharedTableComponent} from './components/shared-table/shared-table.component';
import {SharedPageBrowserComponent} from './components/shared-page-browser/shared-page-browser.component';
import {SharedDropdownComponent} from './components/shared-dropdown/shared-dropdown.component';
import {SharedSelectionItemComponent} from './components/shared-selection-item/shared-selection-item.component';
import {SharedFilterSelectorComponent} from './components/shared-filter-selector/shared-filter-selector.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedFormComponent} from './components/shared-form/shared-form.component';
import {SharedFormBooleanComponent} from './components/shared-form-boolean/shared-form-boolean.component';
import {SharedFormInputComponent} from './components/shared-form-input/shared-form-input.component';
import {SharedFormRadioComponent} from './components/shared-form-radio/shared-form-radio.component';
import {SharedFormTextareaComponent} from './components/shared-form-textarea/shared-form-textarea.component';
import {SharedBaseComponent} from './components/shared-base/shared-base.component';

const COMPONENTS = [
  SharedBaseComponent,
  SharedDynamicComponent,
  SharedDynamicComponentDirective,
  SharedDynamicModuleComponentDirective,
  SharedEmptyComponent,
  SharedCheckboxComponent,
  SharedTextClickComponent,
  SharedIconComponent,
  SharedTableComponent,
  SharedPageBrowserComponent,
  SharedDropdownComponent,
  SharedSelectionItemComponent,
  SharedFilterSelectorComponent,
  SharedFormComponent,
  SharedFormBooleanComponent,
  SharedFormInputComponent,
  SharedFormRadioComponent,
  SharedFormTextareaComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule {}
