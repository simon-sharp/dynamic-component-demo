import {
  Directive,
  Input,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChange,
  ComponentRef, ComponentFactoryResolver
} from '@angular/core';
import {DynamicComponent} from '../../model/dynamic-component.class';
import {SharedEmptyComponent} from '../../components/shared-empty/shared-empty.component';

// tslint:disable
@Directive({
  selector: 'app-shared-dynamic-component',
})
// tslint:enable
export class SharedDynamicComponentDirective implements OnDestroy, OnChanges, AfterViewInit {
  @Input() dynamicComponent?: DynamicComponent<any> = new DynamicComponent({
    componentType: SharedEmptyComponent
  });

  private componentRef?: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  private createComponent(): void {
    window.requestAnimationFrame(() => {
      if (this.dynamicComponent) {
        try {
          const factory = this.componentFactoryResolver.resolveComponentFactory(this.dynamicComponent.componentType);

          this.componentRef = this.viewContainerRef.createComponent(factory);
          this.bindVariables();
        } catch (e) {
          console.error(
            'Could not instantiate dynamic component. Could it be that you declared the wrong module (component: %s)',
            this.dynamicComponent.componentType.name,
            e
          );
        }
      }
    });
  }

  public ngAfterViewInit(): void {
    const componentName = this.dynamicComponent && this.dynamicComponent.componentType.name || 'undefined';

    try {
      this.createComponent();
    } catch (e) {
      console.error('Could not compile module of dynamic component (component: %s)', componentName, e);
    }
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    if (this.componentRef) {
      this.bindVariables();
    }
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private bindVariables(): void {
    if (this.componentRef) {
      if (this.dynamicComponent?.inputs) {
        const bindingKeys = Object.keys(this.dynamicComponent.inputs);

        for (const bindingName of bindingKeys) {
          this.componentRef.instance[bindingName] = this.dynamicComponent.inputs[bindingName];
        }
      }

      if (this.dynamicComponent?.outputs) {
        const eventKeys = Object.keys(this.dynamicComponent.outputs);

        for (const eventName of eventKeys) {
          this.componentRef.instance[eventName] = this.dynamicComponent.outputs[eventName];
        }
      }
    }
  }
}
