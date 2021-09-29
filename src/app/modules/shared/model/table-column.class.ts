import {KeyValuePair} from './key-value-pair.class';
import {SortOrder} from './sort-order.enum';
import {Filter} from './filter.class';
import {DynamicComponent} from './dynamic-component.class';

export class TableColumn {
  public title: string = '';
  public nameInData?: string;
  public width?: number;
  public originalWidth?: number;
  public hideColumnWhenWindowNarrowerThanNrOfPixels?: number;
  public dynamicComponent?: DynamicComponent<any>;
  public dynamicComponentRowInputValues: KeyValuePair[] = [];
  public allowFiltering: boolean = false;
  public allowSorting: boolean = false;
  public allowResizing: boolean = false;
  public filter?: Filter;
  public showFilterSelector: boolean = false;
  public sortOrder: SortOrder = SortOrder.NONE;
  public hidden: boolean = false;

  constructor(config?: {
    title?: string,
    nameInData?: string,
    width?: number,
    originalWidth?: number,
    hideColumnWhenWindowNarrowerThanNrOfPixels?: number,
    dynamicComponent?: DynamicComponent<any>,
    dynamicComponentRowInputValues?: KeyValuePair[],
    allowFiltering?: boolean,
    allowSorting?: boolean,
    allowResizing?: boolean,
    filter?: Filter,
    showFilterSelector?: boolean,
    sortOrder?: SortOrder,
    hidden?: boolean,
  }) {
    if (!!config) {
      if (config.title) {
        this.title = config.title;
      }

      if (config.nameInData) {
        this.nameInData = config.nameInData;
      }

      if (config.width) {
        this.width = config.width;
      }

      if (config.originalWidth) {
        this.originalWidth = config.originalWidth;
      }

      if (config.hideColumnWhenWindowNarrowerThanNrOfPixels) {
        this.hideColumnWhenWindowNarrowerThanNrOfPixels = config.hideColumnWhenWindowNarrowerThanNrOfPixels;
      }

      if (config.dynamicComponent) {
        this.dynamicComponent = config.dynamicComponent;
      }

      if (config.dynamicComponentRowInputValues) {
        this.dynamicComponentRowInputValues = config.dynamicComponentRowInputValues;
      }

      if (config.allowFiltering) {
        this.allowFiltering = config.allowFiltering;
      }

      if (config.allowSorting) {
        this.allowSorting = config.allowSorting;
      }

      if (config.allowResizing) {
        this.allowResizing = config.allowResizing;
      }

      if (config.filter) {
        this.filter = config.filter;
      }

      if (config.showFilterSelector) {
        this.showFilterSelector = config.showFilterSelector;
      }

      if (config.sortOrder) {
        this.sortOrder = config.sortOrder;
      }

      if (config.hidden) {
        this.hidden = config.hidden;
      }
    }
  }
}
