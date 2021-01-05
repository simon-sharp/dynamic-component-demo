import {Type} from '@angular/core';

export class DynamicComponent {
  public moduleType?: Type<any>;
  public componentType: Type<any>;
  public inputs: any = {};
  public outputs: any = {};

  public constructor(config?: {
    moduleType?: Type<any>,
    componentType: Type<any>,
    inputs?: any,
    outputs?: any
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
