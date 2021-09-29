import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {TableColumn} from '../../model/table-column.class';
import {ObjectService} from '../../services/object.service';
import {Sorting} from '../../model/sorting.class';
import {Paging} from '../../model/paging.class';
import {SortOrder} from '../../model/sort-order.enum';
import {HelperService} from '../../services/helper.service';
import {Filter} from '../../model/filter.class';
import {CheckboxStateEnum} from '../../model/checkbox-state.enum';
import {IconTypeEnum} from '../../model/icon-type.enum';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {SharedSelectionItemComponent} from '../shared-selection-item/shared-selection-item.component';
import {KeyValuePair} from '../../model/key-value-pair.class';
import {Subscription} from 'rxjs';
import {DynamicComponent} from '../../model/dynamic-component.class';
import {SharedEmptyComponent} from '../shared-empty/shared-empty.component';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public columns: TableColumn[] = [];

  @Input()
  public data: any;

  @Input()
  public sorting?: Sorting;

  @Input()
  public paging: Paging = new Paging();

  @Input()
  public showPageBrowser: boolean = true;

  @Input()
  public rowComponent?: DynamicComponent<any>;

  @Input()
  public rowComponentRowInputValues?: KeyValuePair[];

  @Input()
  public showColumnsForSelection: boolean = true;

  @Input()
  public rowsSelectable: boolean = false;

  @Input()
  public selectRowsWhenClicked: boolean = false;

  @Input()
  public selectRowsWhenDrag: boolean = false;

  @Input()
  public allRowsAreSelected: boolean = false;

  @Input()
  public rowsSelectedByFieldName: string = 'ROW_IS_SELECTED';

  @Input()
  public returnContentOfThisFieldWhenSelected?: string;

  @Input()
  public emptyCellContent: string = ' ';

  @Input()
  public enableRowComponentDropDown: boolean = true;

  @Input()
  public showRowComponentMarkerName: string = 'SHOWROWCOMPONENT';

  @Input()
  public noDataText: string = 'Keine Einträge vorhanden';

  @Input()
  public noColumnsText: string = 'Keine Spalten definiert';

  @Output()
  public sortingChanged: EventEmitter<Sorting> = new EventEmitter<Sorting>();

  @Output()
  public pagingChanged: EventEmitter<Paging> = new EventEmitter<Paging>();

  @Output()
  public selectedRowsChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output()
  public filterChanged: EventEmitter<TableColumn> = new EventEmitter<TableColumn>();

  public availableColumnsDropDown: DynamicComponent<any>[] = [];
  public availableColumnsChangeEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();
  public availableColumnsChangeEmitterSubscription: Subscription = new Subscription();

  public selectedRows: any[] = [];

  public windowWidth: number = 0;

  public hiddenColumnsByWindowWidth: TableColumn[] = [];

  public hasRowComponentToggleButton: boolean = false;

  public resizing: boolean = false;
  public resizeStartXOffset: number = 0;
  public resizingColumn?: TableColumn;

  public mouseDown: boolean = false;
  public isFirstSelectionRowSelected?: boolean = false;

  public selectionBoxTopStart: number = 0;
  public selectionBoxLeftStart: number = 0;
  public selectionBoxTop: number = 0;
  public selectionBoxLeft: number = 0;
  public selectionBoxWidth: number = 0;
  public selectionBoxHeight: number = 0;
  public selectionStartRowIndex: number = -1;
  public selectionCurrentRowIndex: number = -1;
  public selectionEndRowIndex: number = -1;

  constructor(
    public objectService: ObjectService,
    public helperService: HelperService,
  ) {
  }

  public ngOnInit(): void {
    this.generateAvailableColumnsDropDownData();
    this.initAvailableColumnsChangeEmitter();
    this.initWindowWidth();
    this.preCalculateHiddenColumns();
    this.setHasRowComponentToggleButton();
    this.initSorting();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.generateAvailableColumnsDropDownData();
      this.preCalculateHiddenColumns();
      this.setHasRowComponentToggleButton();
    }
  }

  public ngOnDestroy(): void {
    if (this.availableColumnsChangeEmitterSubscription) {
      this.availableColumnsChangeEmitterSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event: any): void {
    this.windowWidth = event.target.innerWidth;

    this.setHasRowComponentToggleButton();
  }

  @HostListener('body:mouseup')
  public onSelectionEnd(): void {
    if (this.selectRowsWhenDrag) {
      this.setSelectionStartAndEndRowIndex();

      for (let index = this.selectionStartRowIndex; index <= this.selectionEndRowIndex; index++) {
        if (index !== -1) {
          this.data[index][this.rowsSelectedByFieldName] = !this.isFirstSelectionRowSelected;
          this.onRowClicked(this.data[index]);
        }
      }

      this.mouseDown = false;
      this.isFirstSelectionRowSelected = undefined;
      this.resetSelectionAreaValues();
    }
  }

  public initSorting(): void {
    if (this.sorting && this.columns) {
      for (let column of this.columns) {
        if (column.nameInData === this.sorting.nameInData) {
          column.sortOrder = this.sorting.order;
        }
      }
    }
  }

  public preCalculateHiddenColumns(): void {
    if (this.columns) {
      for (let column of this.columns) {
        this.showColumn(column);
      }
    }
  }

  public setHasRowComponentToggleButton(): void {
    this.hasRowComponentToggleButton = this.showRowComponentToggleButton();
  }

  public initWindowWidth(): void {
    this.windowWidth = (window.screen.width);
  }

  public generateAvailableColumnsDropDownData(): void {
    this.availableColumnsDropDown = [];

    if (this.columns) {
      for (let column of this.columns) {
        this.availableColumnsDropDown.push(
          new DynamicComponent(
            {
              componentType: SharedSelectionItemComponent,
              inputs: {
                text: column.title,
                checked: !column.hidden,
                emitValue: column
              },
              outputs: {
                valueChanged: this.availableColumnsChangeEmitter
              }
            }
          )
        );
      }
    }
  }

  public initAvailableColumnsChangeEmitter(): void {
    this.availableColumnsChangeEmitterSubscription = this.availableColumnsChangeEmitter.subscribe(
      (changedColumnVisibilityState: KeyValuePair) => {
        switch (changedColumnVisibilityState.key) {
          case 'checked':
            changedColumnVisibilityState.value.hidden = false;

            this.setColumnCheckedInAvailableColumnsDropDown(
              changedColumnVisibilityState.value,
              true
            );

            break;
          case 'unchecked':
            changedColumnVisibilityState.value.hidden = true;

            this.setColumnCheckedInAvailableColumnsDropDown(
              changedColumnVisibilityState.value,
              false
            );

            break;
        }
      }
    );
  }

  public setColumnCheckedInAvailableColumnsDropDown(column: TableColumn, checked: boolean): void {
    for (let element of this.availableColumnsDropDown) {
      if (
        element.inputs.emitValue.title === column.title
        && element.inputs.emitValue.nameInData === column.nameInData
      ) {
        element.inputs.checked = checked;
      }
    }
  }

  public getAttributeFromObject(
    data: any,
    cellName: string,
    ifEmptyContent: any,
    visibleColumn: TableColumn | undefined
  ): any {
    switch (cellName) {
      case '*':
        return data;
      case '**':
        return {
          visibleColumn: visibleColumn,
          data: data
        };
      default:
        return this.objectService.getAttributeFromObject(data, cellName, ifEmptyContent);
    }
  }

  public getDynamicComponent(visibleColumn: TableColumn, row: any): DynamicComponent<any> {
    let dynamicComponent: DynamicComponent<any> = new DynamicComponent();

    dynamicComponent.moduleType = visibleColumn.dynamicComponent?.moduleType;
    dynamicComponent.componentType = visibleColumn.dynamicComponent?.componentType ?? SharedEmptyComponent;
    dynamicComponent.inputs = visibleColumn.dynamicComponent?.inputs;
    dynamicComponent.outputs = visibleColumn.dynamicComponent?.outputs;

    if (visibleColumn.dynamicComponentRowInputValues) {
      for (let rowInputValue of visibleColumn.dynamicComponentRowInputValues) {
        dynamicComponent.inputs[rowInputValue.key] = this.getAttributeFromObject(
          row,
          rowInputValue.value,
          null,
          visibleColumn
        );
      }
    }

    return dynamicComponent;
  }

  public getHeaderStyle(tableColumn: TableColumn): any {
    let returnValue: any = {};

    if (tableColumn.width) {
      returnValue.width = tableColumn.width + 'px';
    }

    return returnValue;
  }

  public showRowComponentSection(row: any): boolean {
    return (
      (
        !!this.rowComponent
        || this.hasHiddenColumnsByWindowWidth()
      )
      && !!row[this.showRowComponentMarkerName]
      && row[this.showRowComponentMarkerName] === true
    );
  }

  public showRowComponentToggleButton(): boolean {
    return (
      (
        this.hasHiddenColumnsByWindowWidth()
        || this.rowComponent !== undefined
      )
      && this.enableRowComponentDropDown
    );
  }

  public toggleRowComponent(row: any): void {
    if (row[this.showRowComponentMarkerName] === undefined) {
      row[this.showRowComponentMarkerName] = true;
    } else {
      row[this.showRowComponentMarkerName] = !row[this.showRowComponentMarkerName];
    }
  }

  public isRowComponentVisible(row: any): boolean {
    if (row[this.showRowComponentMarkerName] === undefined) {
      return false;
    }

    return row[this.showRowComponentMarkerName];
  }

  public getToggleRowComponentIcon(row: any): SolidIcons.IconDefinition {
    if (this.isRowComponentVisible(row)) {
      return SolidIcons.faAngleUp;
    }

    return SolidIcons.faAngleDown;
  }

  public showColumn(tableColumn: TableColumn): boolean {
    if (tableColumn.hidden) {
      return false;
    }

    if (
      !tableColumn.hideColumnWhenWindowNarrowerThanNrOfPixels
      || tableColumn.hideColumnWhenWindowNarrowerThanNrOfPixels < this.windowWidth
    ) {
      let tableColumnPosition = this.hiddenColumnsByWindowWidth.indexOf(tableColumn);

      if (tableColumnPosition !== -1) {
        this.hiddenColumnsByWindowWidth.splice(tableColumnPosition, 1);
      }

      return true;
    }

    if (this.hiddenColumnsByWindowWidth.indexOf(tableColumn) === -1) {
      this.hiddenColumnsByWindowWidth.push(tableColumn);
    }

    return false;
  }

  public hasHiddenColumnsByWindowWidth(): boolean {
    return !!this.hiddenColumnsByWindowWidth && this.hiddenColumnsByWindowWidth.length > 0;
  }

  public calculateColSpanForRowComponent(): number {
    let colspanForSelectorCheckbox = this.rowsSelectable
      ? 1
      : 0;

    if (
      this.columns
      && this.columns.length > 0
    ) {
      if (
        this.hiddenColumnsByWindowWidth
        && this.hiddenColumnsByWindowWidth.length > 0
      ) {
        return this.columns.length - this.hiddenColumnsByWindowWidth.length + colspanForSelectorCheckbox + 1;
      }

      return this.columns.length + colspanForSelectorCheckbox + 1;
    }

    return 1 + colspanForSelectorCheckbox;
  }

  public hasPageBrowser(): boolean {
    return (
      this.showPageBrowser
      && !!this.paging
      && (this.paging.total > 0)
      && (this.paging.take > 0)
      && (this.paging.total > this.paging.take)
    );
  }

  public columnAllowsFiltering(column: TableColumn): boolean {
    return (
      column.allowFiltering === true
    );
  }

  public columnAllowsSorting(column: TableColumn): boolean {
    return (
      column.allowSorting === true
    );
  }

  public hasNoSortOrder(column: TableColumn): boolean {
    return (
      column.sortOrder === SortOrder.NONE
    );
  }

  public hasAscendingSortOrder(column: TableColumn): boolean {
    return (
      column.sortOrder === SortOrder.ASC
    );
  }

  public hasDescendingSortOrder(column: TableColumn): boolean {
    return (
      column.sortOrder === SortOrder.DESC
    );
  }

  public getFilterIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faFilter;
  }

  public getNoSortOrderIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faSort;
  }

  public getAscendingSortOrderIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faSortAlphaUp;
  }

  public getDescendingSortOrderIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faSortAlphaDown;
  }

  public getIconType(): IconTypeEnum {
    return IconTypeEnum.FONT_AWESOME;
  }

  public changeColumnSortOrder(column: TableColumn): void {
    if (this.columnAllowsSorting(column)) {
      let tempSortOrder: SortOrder = column.sortOrder;
      this.resetAllColumnSortOrders();
      this.setSortOrderByReferenceSortOrder(column, tempSortOrder);
      this.emitSortData(column);
    }
  }

  public resetAllColumnSortOrders(): void {
    if (this.columns) {
      for (let visibleColumn of this.columns) {
        visibleColumn.sortOrder = SortOrder.NONE;
      }
    }
  }

  public setSortOrderByReferenceSortOrder(column: TableColumn, referenceSortOrder: SortOrder): void {
    if (
      referenceSortOrder === SortOrder.NONE
      || referenceSortOrder === undefined
      || referenceSortOrder === null
    ) {
      column.sortOrder = SortOrder.ASC;
    } else if (referenceSortOrder === SortOrder.ASC) {
      column.sortOrder = SortOrder.DESC;
    } else if (referenceSortOrder === SortOrder.DESC) {
      column.sortOrder = SortOrder.ASC;
    }
  }

  public emitSortData(column: TableColumn): void {
    if (this.sortingChanged) {
      if (!this.sorting) {
        this.sorting = new Sorting(this.helperService);
      }

      this.sorting.title = column.title;
      this.sorting.nameInData = column.nameInData;
      this.sorting.order = column.sortOrder;

      this.sortingChanged.emit(this.sorting);
    }
  }

  public emitPagingData(paging: Paging): void {
    if (this.pagingChanged) {
      this.pagingChanged.emit(paging);
    }
  }

  public rowsSelectableChange(event: CheckboxStateEnum, row: any): void {
    if (this.rowsSelectedByFieldName) {
      row[this.rowsSelectedByFieldName] = (event !== CheckboxStateEnum.NONE);
    }

    this.pushPopSelectedRows(row);
  }

  public pushPopSelectedRows(row: any): void {
    if (
      this.selectedRows[0] === '*'
    ) {
      this.selectedRows = [];
      this.allRowsAreSelected = false;

      if (this.data) {
        for (let entry of this.data) {
          if (entry[this.rowsSelectedByFieldName]) {
            if (
              this.returnContentOfThisFieldWhenSelected
              && entry[this.returnContentOfThisFieldWhenSelected]
            ) {
              this.selectedRows.push(entry[this.returnContentOfThisFieldWhenSelected]);
            } else {
              this.selectedRows.push(entry);
            }
          }
        }
      }
    } else if (this.returnContentOfThisFieldWhenSelected) {
      let itemIndex = this.selectedRows.indexOf(row[this.returnContentOfThisFieldWhenSelected]);

      if (itemIndex === -1) {
        if (row[this.returnContentOfThisFieldWhenSelected]) {
          this.selectedRows.push(row[this.returnContentOfThisFieldWhenSelected]);
        } else {
          this.selectedRows.push(row);
        }
      } else {
        this.selectedRows.splice(itemIndex, 1);
      }
    } else {
      let itemIndex = this.selectedRows.indexOf(row);

      if (itemIndex === -1) {
        this.selectedRows.push(row);
      } else {
        this.selectedRows.splice(itemIndex, 1);
      }
    }

    if (this.selectedRowsChanged) {
      this.selectedRowsChanged.emit(this.selectedRows);
    }
  }

  public selectDeselectAll(event: CheckboxStateEnum): void {
    if (event === CheckboxStateEnum.ALL_CHECKED) {
      this.allRowsAreSelected = true;

      this.selectedRows = ['*'];

      if (this.data) {
        for (let row of this.data) {
          row[this.rowsSelectedByFieldName] = true;
        }
      }

      if (this.selectedRowsChanged) {
        this.selectedRowsChanged.emit(this.selectedRows);
      }

      return;
    }

    this.allRowsAreSelected = false;

    if (event === CheckboxStateEnum.CHECKED) {
      if (this.rowsSelectedByFieldName) {
        this.selectedRows = [];

        if (this.data) {
          for (let entry of this.data) {
            entry[this.rowsSelectedByFieldName] = true;

            if (this.returnContentOfThisFieldWhenSelected) {
              this.selectedRows.push(entry[this.returnContentOfThisFieldWhenSelected]);
            } else {
              this.selectedRows.push(entry);
            }
          }
        }
      } else {
        this.selectedRows = this.data;
      }
    } else {
      if (this.data) {
        for (let entry of this.data) {
          entry[this.rowsSelectedByFieldName] = false;
        }
      }

      this.selectedRows = [];
    }

    if (this.selectedRowsChanged) {
      this.selectedRowsChanged.emit(this.selectedRows);
    }
  }

  public isCheckboxChecked(row: any): CheckboxStateEnum {
    if (
      !!this.selectedRows
      && this.selectedRows.length === 1
      && this.selectedRows[0] === '*'
    ) {
      return CheckboxStateEnum.CHECKED;
    }

    if (this.rowsSelectedByFieldName) {
      if (row[this.rowsSelectedByFieldName]) {
        return CheckboxStateEnum.CHECKED;
      } else {
        return CheckboxStateEnum.NONE;
      }
    } else {
      if (this.selectedRows.indexOf(row) !== -1) {
        return CheckboxStateEnum.CHECKED;
      } else {
        return CheckboxStateEnum.NONE;
      }
    }
  }

  public areAllEntriesSelected(): CheckboxStateEnum {
    if (this.allRowsAreSelected) {
      return CheckboxStateEnum.ALL_CHECKED;
    }

    if (
      !!this.data
      && this.data.length === 0
    ) {
      return CheckboxStateEnum.NONE;
    }

    if (this.data) {
      for (let row of this.data) {
        if (this.rowsSelectedByFieldName) {
          if (!row[this.rowsSelectedByFieldName]) {
            return CheckboxStateEnum.NONE;
          }
        } else {
          if (this.selectedRows.indexOf(row) === -1) {
            return CheckboxStateEnum.NONE;
          }
        }
      }
    }

    return CheckboxStateEnum.CHECKED;
  }

  public allDataIsPresent(): boolean {
    return !!this.data
      && !!this.paging
      && this.data.length === this.paging.getTotal();
  }

  public hasNoData(): boolean {
    return !this.data || this.data.length === 0;
  }

  public hasNoVisibleColumns(): boolean {
    return !this.columns || this.columns.length === 0;
  }

  public showFilterSelector(visibleColumn: TableColumn): boolean {
    return visibleColumn.showFilterSelector;
  }

  public toggleShowFilterSelector(visibleColumn: TableColumn): void {
    if (!visibleColumn.filter) {
      this.initFilterForColumn(visibleColumn);
    }

    visibleColumn.showFilterSelector = !visibleColumn.showFilterSelector;
  }

  public initFilterForColumn(column: TableColumn): void {
    column.filter = new Filter();
    column.filter.idInData = column.nameInData;
  }

  public setFilter(column: TableColumn): void {
    column.showFilterSelector = false;

    if (this.filterChanged) {
      this.filterChanged.emit(column);
    }
  }

  public deleteFilter(column: TableColumn): void {
    column.filter = undefined;
    column.showFilterSelector = false;

    if (this.filterChanged) {
      this.filterChanged.emit(column);
    }
  }

  public cancelFilter(column: TableColumn): void {
    column.showFilterSelector = false;
  }

  public getFilter(filter?: Filter): any {
    return filter ?? new Filter();
  }

  public isResizingAllowed(column: TableColumn): boolean {
    return column.allowResizing;
  }

  public resizeStart(mouseDownEvent: any, column: TableColumn): void {
    this.resizing = true;
    this.resizeStartXOffset = mouseDownEvent.clientX;

    /* tslint:disable:no-string-literal */
    column.originalWidth = mouseDownEvent.target['parentElement'].offsetWidth ?? 0;
    this.resizingColumn = column;
  }

  public resizeDrag(event: MouseEvent): void {
    if (this.resizing && this.resizingColumn) {
      this.resizingColumn.width = (this.resizingColumn.originalWidth ?? 0) + (event.x - this.resizeStartXOffset);
    }
  }

  public resizeEnd(): void {
    if (this.resizing) {
      this.resizing = false;
      this.resizingColumn = undefined;
    }
  }

  public getResizeIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faArrowsAltH;
  }

  public onRowClicked(row: any): void {
    if (this.selectRowsWhenDrag) {
      row[this.rowsSelectedByFieldName] = !this.isFirstSelectionRowSelected;
      this.pushPopSelectedRows(row);
    } else if (this.selectRowsWhenClicked) {
      row[this.rowsSelectedByFieldName] = !row[this.rowsSelectedByFieldName];
      this.pushPopSelectedRows(row);
    }
  }

  public getTableHeaderRowClass(): any {
    return {
      'shared-table__selected-header-row': this.areAllEntriesSelected()
    };
  }

  public getTableDataRowClass(row: any): any {
    return {
      'shared-table__selected-row': this.isCheckboxChecked(row)
    };
  }

  public getShowAvailableColumnsForSelectionIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faList;
  }

  public showStaticInvisibleColumn(column: TableColumn): boolean {
    if (column.hidden) {
      return false;
    }

    return !column.dynamicComponent && !this.showColumn(column);
  }

  public showDynamicInvisibleColumn(column: TableColumn): boolean {
    if (column.hidden) {
      return false;
    }

    return !!column.dynamicComponent && !this.showColumn(column);
  }

  public onSelectionStart(event: MouseEvent, index: number): void {
    if (this.selectRowsWhenDrag) {
      event.preventDefault();
      this.isFirstSelectionRowSelected = !!this.data[index][this.rowsSelectedByFieldName];
      this.selectionStartRowIndex = index;
    }
  }

  public onSelection(index: number): void {
    if (this.selectRowsWhenDrag) {
      if (!this.mouseDown) {
        return;
      }

      if (this.isFirstSelectionRowSelected === undefined) {
        this.isFirstSelectionRowSelected = !!this.data[index][this.rowsSelectedByFieldName];
      }

      this.setCurrentRowIndex(index);
    }
  }

  public repositionSelectionRectangular(event: MouseEvent): void {
    this.selectionBoxLeftStart = event.clientX;
    this.selectionBoxTopStart = event.clientY;
  }

  public getSelectionAreaStyle(): any {
    return {
      top: this.selectionBoxTop + 'px',
      left: this.selectionBoxLeft + 'px',
      width: this.selectionBoxWidth + 'px',
      height: this.selectionBoxHeight + 'px'
    };
  }

  public onDrawSelectionAreaStart(event: MouseEvent): void {
    if (this.selectRowsWhenDrag) {
      this.mouseDown = true;
      this.repositionSelectionRectangular(event);
    }
  }

  public drawSelectionArea(event: MouseEvent): void {
    if (this.selectRowsWhenDrag && this.mouseDown) {
      if (event.clientX < this.selectionBoxLeftStart) {
        this.selectionBoxLeft = event.clientX;
        this.selectionBoxWidth = this.selectionBoxLeftStart - event.clientX;
      } else {
        this.selectionBoxLeft = this.selectionBoxLeftStart;
        this.selectionBoxWidth = event.clientX - this.selectionBoxLeftStart;
      }

      if (event.clientY < this.selectionBoxTopStart) {
        this.selectionBoxTop = event.clientY;
        this.selectionBoxHeight = this.selectionBoxTopStart - event.clientY;
      } else {
        this.selectionBoxTop = this.selectionBoxTopStart;
        this.selectionBoxHeight = event.clientY - this.selectionBoxTopStart;
      }
    }
  }

  public resetSelectionAreaValues(): void {
    this.selectionBoxTopStart = 0;
    this.selectionBoxLeftStart = 0;
    this.selectionBoxLeft = 0;
    this.selectionBoxTop = 0;
    this.selectionBoxWidth = 0;
    this.selectionBoxHeight = 0;

    this.selectionStartRowIndex = -1;
    this.selectionCurrentRowIndex = -1;
    this.selectionEndRowIndex = -1;
  }

  public setSelectionStartAndEndRowIndex(): void {
    if (
      this.selectionStartRowIndex === -1
      && this.selectionEndRowIndex !== -1
      && this.selectionCurrentRowIndex === -1
    ) {
      this.selectionStartRowIndex = this.selectionEndRowIndex;
    } else if (
      this.selectionStartRowIndex !== -1
      && this.selectionEndRowIndex === -1
      && this.selectionCurrentRowIndex === -1
    ) {
      this.selectionEndRowIndex = this.selectionStartRowIndex;
    } else if (
      this.selectionStartRowIndex < this.selectionCurrentRowIndex
    ) {
      this.selectionEndRowIndex = this.selectionCurrentRowIndex;
    } else {
      this.selectionEndRowIndex = this.selectionStartRowIndex;
      this.selectionStartRowIndex = this.selectionCurrentRowIndex;
    }
  }

  public setCurrentRowIndex(index: number): void {
    if (this.selectionStartRowIndex === -1) {
      this.selectionStartRowIndex = index;
    }

    this.selectionCurrentRowIndex = index;
  }

  public getRowComponent(row: any): DynamicComponent<any> {
    let dynamicComponent: DynamicComponent<any> = new DynamicComponent();

    dynamicComponent.moduleType = this.rowComponent?.moduleType;
    dynamicComponent.componentType = this.rowComponent?.componentType ?? SharedEmptyComponent;
    dynamicComponent.inputs = this.rowComponent?.inputs;
    dynamicComponent.outputs = this.rowComponent?.outputs;

    if (this.rowComponentRowInputValues) {
      for (let rowInputValue of this.rowComponentRowInputValues) {
        dynamicComponent.inputs[rowInputValue.key] = this.getAttributeFromObject(
          row,
          rowInputValue.value,
          null,
          undefined
        );
      }
    }

    return dynamicComponent;
  }
}
