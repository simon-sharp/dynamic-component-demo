import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  public getAttributeFromObject(data: any, attributeName: string, ifEmptyContent: any): any {
    if (
      attributeName
      && attributeName.indexOf('.') !== -1
    ) {
      let attributeNameParts: string[] = attributeName.split('.');

      if (data[attributeNameParts[0]]) {
        let firstAttributeNamePart: string | undefined = attributeNameParts.shift();

        return this.getAttributeFromObject(data[firstAttributeNamePart ?? ''], attributeNameParts.join('.'), ifEmptyContent);
      } else {
        return ifEmptyContent;
      }
    }

    if (!data[attributeName]) {
      return ifEmptyContent;
    }

    return data[attributeName];
  }
}
