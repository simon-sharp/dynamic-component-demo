import {
  Directive,
  Input,
  ViewContainerRef,
  AfterViewInit,
  Compiler,
  OnDestroy,
  OnChanges,
  SimpleChange,
  Injector,
  Type,
  NgModuleRef,
  ComponentRef
} from '@angular/core';
import {DynamicComponent} from '../../model/dynamic-component.class';

const modules: Map<Function, NgModuleRef<any>> = new Map<Function, NgModuleRef<any>>();

@Directive({
  selector: 'sso-dynamic-module-component',
})
export class SsoDynamicModuleComponentDirective implements OnDestroy, OnChanges, AfterViewInit {
  @Input() dynamicComponent: DynamicComponent;

  private componentRef: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private compiler: Compiler,
    private injector: Injector
  ) {
  }

  private createComponent(module: NgModuleRef<any>) {
    window.requestAnimationFrame(() => {
      try {
        const factory = module.componentFactoryResolver.resolveComponentFactory(<Type<any>>this.dynamicComponent.componentType);
        this.componentRef = this.viewContainerRef.createComponent(factory);
        this.bindVariables();
      } catch (e) {
        console.error(
          'Could not instantiate dynamic component. Could it be that you declared the wrong module (module: %s, component: %s)',
          this.dynamicComponent.moduleType.name,
          this.dynamicComponent.componentType.name,
          e
        );
      }
    });
  }

  public ngAfterViewInit() {
    const moduleName = this.dynamicComponent.moduleType && this.dynamicComponent.moduleType.name || 'undefined';
    const componentName = this.dynamicComponent && this.dynamicComponent.componentType.name || 'undefined';

    if (this.dynamicComponent && this.dynamicComponent.moduleType) {
      let module = modules.get(this.dynamicComponent.moduleType);

      if (module) {
        this.createComponent(module);
      } else {
        try {
          const factory = this.compiler.compileModuleSync(<Type<any>>this.dynamicComponent.moduleType);
          modules.set(this.dynamicComponent.moduleType, module = factory.create(this.injector));
          this.createComponent(module);
        } catch (e) {
          console.error(
            'Could not compile module of dynamic component (module: %s, component: %s)',
            moduleName,
            componentName,
            e
          );
        }
      }
    }
  }

  public ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.componentRef) {
      this.bindVariables();
    }
  }

  public ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  private bindVariables() {
    if (this.componentRef) {
      if (this.dynamicComponent.inputs) {
        const bindingKeys = Object.keys(this.dynamicComponent.inputs);

        for (const bindingName of bindingKeys) {
          this.componentRef.instance[bindingName] = this.dynamicComponent.inputs[bindingName];
        }
      }

      if (this.dynamicComponent.outputs) {
        const eventKeys = Object.keys(this.dynamicComponent.outputs);

        for (const eventName of eventKeys) {
          this.componentRef.instance[eventName] = this.dynamicComponent.outputs[eventName];
        }
      }
    }
  }
}
