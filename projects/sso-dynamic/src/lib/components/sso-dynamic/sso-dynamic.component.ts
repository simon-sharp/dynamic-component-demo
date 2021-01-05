import {Component, Input} from '@angular/core';
import {DynamicComponent} from '../../model/dynamic-component.class';

@Component({
  selector: 'sso-dynamic',
  templateUrl: './sso-dynamic.component.html'
})
export class SsoDynamicComponent {
  @Input() dynamicComponent: DynamicComponent;

  public hasDynamicComponent(): boolean {
    return !!(this.dynamicComponent);
  }

  public dynamicComponentHasModuleDeclared(): boolean {
    return !!(this.dynamicComponent.moduleType);
  }

  public showDynamicComponent() {
    return this.hasDynamicComponent() && !this.dynamicComponentHasModuleDeclared();
  }

  public showDynamicModuleComponent() {
    return this.hasDynamicComponent() && this.dynamicComponentHasModuleDeclared();
  }
}
