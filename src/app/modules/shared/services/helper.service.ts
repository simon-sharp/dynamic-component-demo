import {Injectable} from '@angular/core';
import {SortOrder} from '../model/sort-order.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public isNullOrEmpty(obj: any): boolean {
    return (
      !obj
      || (
        (
          (typeof obj === 'string')
          || (obj instanceof Array)
        )
        && obj.length <= 0
      )
      || (this.isObject(obj) && obj.length <= 0)
    );
  }

  public isObject(value: any): boolean {
    if (value === null) {
      return false;
    }

    return (typeof value === 'object');
  }

  public isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  public isString(value: any): boolean {
    return (typeof value === 'string' || value instanceof String);
  }

  public capitalizeFirstLetter(wordOrSentence: string): string {
    return wordOrSentence.replace(/(^|\s)[a-z]/g, (f) => f.toUpperCase());
  }

  public getNestedDataBody(elemName: string, dataBody: any): any {
    let splittedElemName: string[] = elemName.split('.'),
      returnValue: any = dataBody;

    for (let currentElemName of splittedElemName) {
      if (this.isNullOrEmpty(returnValue)) {
        return '';
      }

      returnValue = returnValue[currentElemName];
    }

    if (this.isNullOrEmpty(returnValue)) {
      return '';
    }

    return returnValue;
  }

  public saveToNestedDataBody(elemName: string, dataBody: any, value: any): void {
    let splittedElemName: string[] = elemName.split('.');

    if (splittedElemName.length === 1) {
      dataBody[elemName] = value;
    } else {
      let firstIndex = splittedElemName[0];

      if (!dataBody[firstIndex]) {
        dataBody[firstIndex] = {};
      }

      splittedElemName.shift();

      this.saveToNestedDataBody(splittedElemName.join('.'), dataBody[firstIndex], value);
    }
  }

  public sortJson(byField: string, data: any[], sortOrder: SortOrder): any {
    return data.sort((a, b) => {
      let returnValue: number = 0,
        valA = this.getNestedDataBody(byField, a).toUpperCase(),
        valB = this.getNestedDataBody(byField, b).toUpperCase();

      if (valA > valB) {
        returnValue = 1;
      }

      if (valA === valB) {
        returnValue = 0;
      }

      if (valA < valB) {
        returnValue = -1;
      }

      if (sortOrder === SortOrder.DESC) {
        return returnValue * -1;
      }

      return returnValue;
    });
  }
}
