import {DynamicComponent} from './dynamic-component.class';

export class FormFieldDeclaration {
  public bootstrapWidth?: number;
  public bootstrapXlWidth?: number;
  public bootstrapLgWidth?: number;
  public bootstrapMdWidth?: number;
  public bootstrapXsWidth?: number;
  public bootstrapSmWidth?: number;
  public formComponent?: DynamicComponent<any>;

  constructor(
    options?: {
      bootstrapWidth?: number;
      bootstrapXlWidth?: number;
      bootstrapLgWidth?: number;
      bootstrapMdWidth?: number;
      bootstrapXsWidth?: number;
      bootstrapSmWidth?: number;
      formComponent?: DynamicComponent<any>;
    }
  ) {
    if (!!options) {
      for (const key of Object.keys(options)) {
        // @ts-ignore
        if (options[key] !== undefined) {
          // @ts-ignore
          this[key] = options[key];
        }
      }
    }
  }
}
