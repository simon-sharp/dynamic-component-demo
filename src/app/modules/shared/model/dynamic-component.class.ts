import {EventEmitter, Type} from '@angular/core';
import {SharedEmptyComponent} from '../components/shared-empty/shared-empty.component';

export class DynamicComponent<T> {
  public moduleType?: Type<any>;
  public componentType: Type<any> = SharedEmptyComponent;
  public inputs?: any = {};
  public outputs?: { [K in keyof T]?: T[K] extends EventEmitter<any> ? T[K] : never } = {};

  public constructor(config?: {
    moduleType?: Type<any>,
    componentType: Type<T>,
    inputs?: any,
    outputs?: { [K in keyof T]?: T[K] extends EventEmitter<any> ? T[K] : never }
  }) {
    if (config && config.moduleType) {
      this.moduleType = config.moduleType;
    }

    if (config && config.componentType) {
      this.componentType = config.componentType;
    }

    if (config && config.inputs) {
      this.inputs = config.inputs;
    }

    if (config && config.outputs) {
      this.outputs = config.outputs;
    }
  }
}
