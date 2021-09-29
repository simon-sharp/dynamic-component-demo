import {Component, Input} from '@angular/core';
import {DynamicComponent} from '../../model/dynamic-component.class';
import {SharedEmptyComponent} from '../shared-empty/shared-empty.component';

@Component({
  selector: 'app-shared-dynamic',
  templateUrl: './shared-dynamic.component.html'
})
export class SharedDynamicComponent {
  @Input() dynamicComponent: DynamicComponent<any> = new DynamicComponent<SharedEmptyComponent>({
    componentType: SharedEmptyComponent
  });

  public hasDynamicComponent(): boolean {
    return !!(this.dynamicComponent);
  }

  public dynamicComponentHasModuleDeclared(): boolean {
    if (!this.dynamicComponent) {
      return false;
    }

    return !!(this.dynamicComponent.moduleType);
  }

  public showDynamicComponent(): boolean {
    return this.hasDynamicComponent() && !this.dynamicComponentHasModuleDeclared();
  }

  public showDynamicModuleComponent(): boolean {
    return this.hasDynamicComponent() && this.dynamicComponentHasModuleDeclared();
  }
}
