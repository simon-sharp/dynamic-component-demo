import {SortOrder} from './sort-order.enum';
import {HelperService} from '../services/helper.service';

export class Sorting {
  title?: string;
  nameInData?: string;
  order: SortOrder = SortOrder.NONE;

  constructor(
    public helperService: HelperService
  ) {
  }

  public sortData(data: any[]): any[] {
    if (data === undefined || data === null || data.length === 0) {
      return [];
    }

    return this.helperService.sortJson(this.nameInData ?? '', data, this.order);
  }
}
