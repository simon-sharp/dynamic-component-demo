import {FormFieldDeclaration} from './form-field-declaration.class';

export class FormSectionDeclaration {
    title?: string;
    id?: string;
    active?: boolean = true;
    formFields: FormFieldDeclaration[] = [];
    bootstrapWidth?: number;
    bootstrapXlWidth?: number;
    bootstrapLgWidth?: number;
    bootstrapMdWidth?: number;
    bootstrapXsWidth?: number;
    bootstrapSmWidth?: number;

    constructor(
      options?: {
        title?: string,
        id?: string,
        active?: boolean,
        formFields: FormFieldDeclaration[],
        bootstrapWidth?: number,
        bootstrapXlWidth?: number,
        bootstrapLgWidth?: number,
        bootstrapMdWidth?: number,
        bootstrapXsWidth?: number,
        bootstrapSmWidth?: number,
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
