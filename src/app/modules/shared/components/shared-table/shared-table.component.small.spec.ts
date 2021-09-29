import {SharedTableComponent} from './shared-table.component';
import {ObjectService} from '../../services/object.service';
import {HelperService} from '../../services/helper.service';
import {Paging} from '../../model/paging.class';
import {EventEmitter} from '@angular/core';
import {Sorting} from '../../model/sorting.class';
import {TableColumn} from '../../model/table-column.class';
import {SortOrder} from '../../model/sort-order.enum';
import {Filter} from '../../model/filter.class';
import {KeyValuePair} from '../../model/key-value-pair.class';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {IconTypeEnum} from '../../model/icon-type.enum';
import {CheckboxStateEnum} from '../../model/checkbox-state.enum';
import {Subscription} from 'rxjs';
import {SelectionItemComponent} from '../shared-selection-item/shared-selection-item.component';
import {DynamicComponent} from '../../model/dynamic-component.class';
import {SharedTextClickComponent} from '../shared-text-click/shared-text-click.component';

describe('Shared: Table Component', () => {
  let component: SharedTableComponent;

  beforeAll(() => {
    component = new SharedTableComponent(
      new ObjectService(),
      new HelperService()
    );
  });

  describe('when looking at the initialized variables', () => {
    it('should have a columns of an empty array', () => {
      expect(component.columns).toEqual([]);
    });

    it('should have a data of undefined', () => {
      expect(component.data).toEqual(undefined);
    });

    it('should have a sorting of undefined', () => {
      expect(component.sorting).toEqual(undefined);
    });

    it('should have a paging of new Paging', () => {
      expect(component.paging).toEqual(new Paging());
    });

    it('should have a showPageBrowser of true', () => {
      expect(component.showPageBrowser).toEqual(true);
    });

    it('should have a rowComponent of undefined', () => {
      expect(component.rowComponent).toEqual(undefined);
    });

    it('should have a showColumnsForSelection of false', () => {
      expect(component.showColumnsForSelection).toEqual(true);
    });

    it('should have a rowsSelectable of false', () => {
      expect(component.rowsSelectable).toEqual(false);
    });

    it('should have a rowsSelectedByFieldName of undefined', () => {
      expect(component.rowsSelectedByFieldName).toEqual('ROW_IS_SELECTED');
    });

    it('should have a emptyCellContent of a space character', () => {
      expect(component.emptyCellContent).toEqual(' ');
    });

    it('should have a enableRowComponentDropDown of true', () => {
      expect(component.enableRowComponentDropDown).toEqual(true);
    });

    it('should have a showRowComponentMarkerName of SHOWROWCOMPONENT', () => {
      expect(component.showRowComponentMarkerName).toEqual('SHOWROWCOMPONENT');
    });

    it('should have a noDataText of Keine Einträge vorhanden', () => {
      expect(component.noDataText).toEqual('Keine Einträge vorhanden');
    });

    it('should have a noColumnsText of Keine Spalten definiert', () => {
      expect(component.noColumnsText).toEqual('Keine Spalten definiert');
    });

    it('should have a sortingChanged of new EventEmitter', () => {
      expect(component.sortingChanged).toEqual(new EventEmitter<Sorting>());
    });

    it('should have a pagingChanged of new EventEmitter()', () => {
      expect(component.pagingChanged).toEqual(new EventEmitter<Paging>());
    });

    it('should have a selectedRowsChanged of new EventEmitter()', () => {
      expect(component.selectedRowsChanged).toEqual(new EventEmitter<any[]>());
    });

    it('should have a filterChanged of new EventEmitter()', () => {
      expect(component.filterChanged).toEqual(new EventEmitter<TableColumn>());
    });

    it('should have a selectedRows of []', () => {
      expect(component.selectedRows).toEqual([]);
    });

    it('should have a windowWidth of 0', () => {
      expect(component.windowWidth).toEqual(0);
    });

    it('should have a hiddenColumnsByWindowWidth of []', () => {
      expect(component.hiddenColumnsByWindowWidth).toEqual([]);
    });

    it('should have a hasRowComponentToggleButton of false', () => {
      expect(component.hasRowComponentToggleButton).toEqual(false);
    });

    it('should have a resizing of false', () => {
      expect(component.resizing).toEqual(false);
    });

    it('should have a resizeStartXOffset of undefined', () => {
      expect(component.resizeStartXOffset).toEqual(undefined);
    });

    it('should have a mouseDown of false', () => {
      expect(component.mouseDown).toEqual(false);
    });

    it('should have a selectedRowsByDrag of false', () => {
      expect(component.isFirstSelectionRowSelected).toEqual(false);
    });
  });

  describe('when testing ngOnInit', () => {
    // todo: Test if the table state is correct when fed with data

    beforeAll(() => {
      spyOn(component, 'generateAvailableColumnsDropDownData');
      spyOn(component, 'initAvailableColumnsChangeEmitter');
      spyOn(component, 'initWindowWidth');
      spyOn(component, 'preCalculateHiddenColumns');
      spyOn(component, 'setHasRowComponentToggleButton');
      spyOn(component, 'initSorting');

      component.ngOnInit();
    });

    it('should have called the function generateAvailableColumnsDropDownData', () => {
      expect(component.generateAvailableColumnsDropDownData).toHaveBeenCalled();
    });

    it('should have called the function initAvailableColumnsIfNotPresent', () => {
      expect(component.initAvailableColumnsChangeEmitter).toHaveBeenCalled();
    });

    it('should have called the function initWindowWidth', () => {
      expect(component.initWindowWidth).toHaveBeenCalled();
    });

    it('should have called the function preCalculateHiddenColumns', () => {
      expect(component.preCalculateHiddenColumns).toHaveBeenCalled();
    });

    it('should have called the function setHasRowComponentToggleButton', () => {
      expect(component.setHasRowComponentToggleButton).toHaveBeenCalled();
    });

    it('should have called the function initSorting', () => {
      expect(component.initSorting).toHaveBeenCalled();
    });
  });

  describe('when testing ngOnDestroy', () => {
    describe('when availableColumnsChangeEmitterSubscription is set', () => {
      beforeAll(() => {
        component.availableColumnsChangeEmitterSubscription = new Subscription();
        spyOn(component.availableColumnsChangeEmitterSubscription, 'unsubscribe');
        component.ngOnDestroy();
      });

      it('should have called the function unsubscribe', () => {
        expect(component.availableColumnsChangeEmitterSubscription.unsubscribe).toHaveBeenCalled();
      });
    });

    describe('when availableColumnsChangeEmitterSubscription is not set', () => {
      beforeAll(() => {
        component.availableColumnsChangeEmitterSubscription = new Subscription();
        component.ngOnDestroy();
      });

      it('should have no subscription to unsubscribe from', () => {
        expect(component.availableColumnsChangeEmitterSubscription).toBeFalsy();
      });
    });
  });

  describe('when testing onWindowResize', () => {
    beforeAll(() => {
      component.columns = [
        new TableColumn(
          {
            title: '1',
            nameInData: '1',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 200,
          }
        ),
        new TableColumn(
          {
            title: '2',
            nameInData: '2',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 400,
          }
        ),
        new TableColumn(
          {
            title: '3',
            nameInData: '3',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 600,
          }
        ),
        new TableColumn(
          {
            title: '4',
            nameInData: '4',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
          }
        ),
      ];

      component.hiddenColumnsByWindowWidth = [
        new TableColumn(
          {
            title: '3',
            nameInData: '3',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 600,
          }
        ),
        new TableColumn(
          {
            title: '4',
            nameInData: '4',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
          }
        ),
      ];

      component.enableRowComponentDropDown = true;

      component.onWindowResize(
        {
          target: {
            innerWidth: 400
          }
        }
      );
    });

    it('should have set the windowWidth to 400', () => {
      expect(component.windowWidth).toBe(400);
    });

    it('should have set the hasRowComponentToggleButton', () => {
      expect(component.hasRowComponentToggleButton).toBe(true);
    });
  });

  describe('when testing initSorting', () => {
    describe('when sorting is set', () => {
      beforeAll(() => {
        component.columns = [
          new TableColumn(
            {
              title: '1',
              nameInData: '1',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 200,
            }
          ),
          new TableColumn(
            {
              title: '2',
              nameInData: '2',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 400,
            }
          ),
          new TableColumn(
            {
              title: '3',
              nameInData: '3',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 600,
            }
          ),
          new TableColumn(
            {
              title: '4',
              nameInData: '4',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
            }
          ),
        ];

        component.sorting = new Sorting(
          new HelperService()
        );

        component.sorting.order = SortOrder.DESC;
        component.sorting.nameInData = '2';
        component.sorting.title = '2';

        component.initSorting();
      });

      it('should have told column 2 that its sorted after', () => {
        expect(component.columns[1].sortOrder).toBe(SortOrder.DESC);
      });
    });

    describe('when sorting is not set', () => {
      beforeAll(() => {
        component.columns = [
          new TableColumn(
            {
              title: '1',
              nameInData: '1',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 200,
            }
          ),
          new TableColumn(
            {
              title: '2',
              nameInData: '2',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 400,
            }
          ),
          new TableColumn(
            {
              title: '3',
              nameInData: '3',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 600,
            }
          ),
          new TableColumn(
            {
              title: '4',
              nameInData: '4',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
            }
          ),
        ];

        component.sorting = undefined;

        component.initSorting();
      });

      it('should have told column 2 that its sorted after', () => {
        expect(component.columns[1].sortOrder).toBe(SortOrder.NONE);
      });
    });
  });

  describe('when testing preCalculateHiddenColumns', () => {
    beforeAll(() => {
      component.windowWidth = 600;

      component.columns = [
        new TableColumn(
          {
            title: '1',
            nameInData: '1',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 200,
          }
        ),
        new TableColumn(
          {
            title: '2',
            nameInData: '2',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 400,
          }
        ),
        new TableColumn(
          {
            title: '3',
            nameInData: '3',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 600,
          }
        ),
        new TableColumn(
          {
            title: '4',
            nameInData: '4',
            hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
          }
        ),
      ];

      component.hiddenColumnsByWindowWidth = [];

      component.preCalculateHiddenColumns();
    });

    it('should have set the hiddenColumnsByWindowWidth correctly', () => {
      expect(component.hiddenColumnsByWindowWidth).toEqual(
        [
          new TableColumn(
            {
              title: '3',
              nameInData: '3',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 600,
            }
          ),
          new TableColumn(
            {
              title: '4',
              nameInData: '4',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
            }
          ),
        ]
      );
    });
  });

  describe('when testing setHasRowComponentToggleButton', () => {
    describe('when a row component is present', () => {
      beforeAll(() => {
        component.rowComponent = new DynamicComponent();
        component.enableRowComponentDropDown = true;

        component.setHasRowComponentToggleButton();
      });

      it('should have set the hasRowComponentToggleButton to true', () => {
        expect(component.hasRowComponentToggleButton).toBe(true);
      });
    });

    describe('when a row component is absent', () => {
      beforeAll(() => {
        component.hiddenColumnsByWindowWidth = [];
        component.rowComponent = undefined;
        component.enableRowComponentDropDown = true;

        component.setHasRowComponentToggleButton();
      });

      it('should have set the hasRowComponentToggleButton to true', () => {
        expect(component.hasRowComponentToggleButton).toBe(false);
      });
    });
  });

  describe('when testing initWindowWidth', () => {
    beforeAll(() => {
      component.initWindowWidth();
    });

    it('should have set the windowWitdth', () => {
      expect(component.windowWidth).toBeTruthy();
    });
  });

  describe('when testing generateAvailableColumnsDropDownData', () => {
    beforeAll(() => {
      component.columns = [
        new TableColumn(
          {
            title: 'Column_1',
            hidden: false,
          }
        ),
        new TableColumn(
          {
            title: 'Column_2',
            hidden: false,
          }
        ),
        new TableColumn(
          {
            title: 'Column_3',
            hidden: false,
          }
        ),
      ];
      component.generateAvailableColumnsDropDownData();
    });

    it('should have set the availableColumnsDropDown', () => {
      expect(component.availableColumnsDropDown.length).toEqual(3);
    });
  });

  describe('when testing initAvailableColumnsChangeEmitter', () => {
    beforeAll(() => {
      component.availableColumnsChangeEmitter = new EventEmitter<KeyValuePair>();
      component.availableColumnsChangeEmitterSubscription = new Subscription();
      component.initAvailableColumnsChangeEmitter();
    });

    it('should have subscribe to the change emitter', () => {
      expect(component.availableColumnsChangeEmitterSubscription).toEqual(jasmine.any(Subscription));
    });

    describe('when testing change event set column to checked', () => {
      beforeAll(() => {
        let column1 = new TableColumn({
          title: 'Column_1',
          nameInData: 'Column_1',
          hidden: true,
        });
        let changedColumnVisibilityState = {
          key: 'checked',
          value: column1
        };

        spyOn(component, 'setColumnCheckedInAvailableColumnsDropDown');
        component.availableColumnsChangeEmitter.emit(changedColumnVisibilityState);
      });

      it('should have called setColumnCheckedInAvailableColumnsDropDown', () => {
        expect(component.setColumnCheckedInAvailableColumnsDropDown).toHaveBeenCalledWith(
          new TableColumn({
            title: 'Column_1',
            nameInData: 'Column_1',
            hidden: false,
          }),
          true
        );
      });
    });

    describe('when testing change event set column to unchecked', () => {
      beforeAll(() => {
        let column1 = new TableColumn({
          title: 'Column_1',
          nameInData: 'Column_1',
          hidden: false,
        });
        let changedColumnVisibilityState = {
          key: 'unchecked',
          value: column1
        };

        spyOn(component, 'setColumnCheckedInAvailableColumnsDropDown');
        component.availableColumnsChangeEmitter.emit(changedColumnVisibilityState);
      });

      it('should have called setColumnCheckedInAvailableColumnsDropDown', () => {
        expect(component.setColumnCheckedInAvailableColumnsDropDown).toHaveBeenCalledWith(
          new TableColumn({
            title: 'Column_1',
            nameInData: 'Column_1',
            hidden: true,
          }),
          false
        );
      });
    });
  });

  describe('when testing setColumnCheckedInAvailableColumnsDropDown', () => {
    beforeAll(() => {
      let column1 = new TableColumn({
          title: 'Column_1',
          nameInData: 'Column_1'
        }),
        column2 = new TableColumn({
          title: 'Column_2',
          nameInData: 'Column_2'
        });

      component.availableColumnsDropDown = [
        new DynamicComponent(
          {
            componentType: SelectionItemComponent,
            inputs: {
              text: column1.title,
              checked: false,
              emitValue: column1
            }
          }
        ),
        new DynamicComponent(
          {
            componentType: SelectionItemComponent,
            inputs: {
              text: column2.title,
              checked: false,
              emitValue: column2
            }
          }
        )
      ];

      component.setColumnCheckedInAvailableColumnsDropDown(column2, true);
    });

    it('should have set the second column as checked', () => {
      expect(component.availableColumnsDropDown[1].inputs.checked).toEqual(true);
    });

    it('should have left the first columns\' checked value unchanged', () => {
      expect(component.availableColumnsDropDown[0].inputs.checked).toEqual(false);
    });
  });

  describe('when testing getAttributeFromObject', () => {
    describe('when getting all elements back', () => {
      let data: any,
        column: TableColumn;

      beforeAll(() => {
        data = {
          text: 'text',
          otherText: 'otherText',
        };

        column = new TableColumn();
      });

      describe('when asking fo a specific value', () => {
        it('should return the specific value', () => {
          expect(component.getAttributeFromObject(data, 'text', null, column)).toEqual('text');
        });
      });

      describe('when asking for all values', () => {
        it('should return the specific value', () => {
          expect(component.getAttributeFromObject(data, '*', null, column)).toEqual(data);
        });
      });

      describe('when asking for all values and the column information', () => {
        it('should return the specific value', () => {
          expect(component.getAttributeFromObject(data, '**', null, column)).toEqual(
            {
              visibleColumn: column,
              data: data
            }
          );
        });
      });
    });
  });

  describe('when testing getDynamicComponent', () => {
    describe('when a dynamicComponentRowInputValues is set', () => {
      let column: TableColumn = new TableColumn(),
        returnObject: DynamicComponent<any>,
        row;

      beforeAll(() => {
        column.dynamicComponent = new DynamicComponent(
          {
            componentType: SharedTextClickComponent,
            inputs: {
              emitValue: 'text'
            },
            outputs: {
              clickedText: new EventEmitter<string>()
            }
          }
        );

        column.dynamicComponentRowInputValues = [
          new KeyValuePair('text', 'text')
        ];

        row = {
          text: 'text',
        };

        returnObject = component.getDynamicComponent(column, row);
      });

      it('should have set text on the returnObject', () => {
        expect(returnObject.inputs.text).toEqual('text');
      });

      it('should have set emitValue on the returnObject', () => {
        expect(returnObject.inputs.emitValue).toEqual('text');
      });

      it('should have set a clickedText on the returnedObject', () => {
        expect(returnObject.outputs?.clickedText).toBeTruthy();
      });
    });

    describe('when no dynamicComponentRowInputValues is set', () => {
      let column: TableColumn = new TableColumn(),
        returnObject: DynamicComponent<any>,
        row;

      beforeAll(() => {
        column.dynamicComponent = new DynamicComponent(
          {
            componentType: SharedTextClickComponent,
            inputs: {
              text: 'text',
              emitValue: 'text'
            },
            outputs: {
              clickedText: new EventEmitter<string>()
            }
          }
        );

        row = {
          text: 'text',
        };

        returnObject = component.getDynamicComponent(column, row);
      });

      it('should have set text on the returnObject', () => {
        expect(returnObject.inputs.text).toEqual('text');
      });

      it('should have set emitValue on the returnObject', () => {
        expect(returnObject.inputs.emitValue).toEqual('text');
      });

      it('should have set a clickedText on the returnedObject', () => {
        expect(returnObject.outputs?.clickedText).toBeTruthy();
      });
    });
  });

  describe('when testing getHeaderStyle', () => {
    describe('when the width is set', () => {
      let tableColumn: TableColumn;

      beforeEach(() => {
        tableColumn = new TableColumn();
        tableColumn.width = 80;
      });

      it('should return the correct style', () => {
        expect(component.getHeaderStyle(tableColumn)).toEqual({
          width: '80px'
        });
      });
    });

    describe('when the width is not set', () => {
      let tableColumn: TableColumn;

      beforeEach(() => {
        tableColumn = new TableColumn();
        tableColumn.width = undefined;
      });

      it('should return the correct style', () => {
        expect(component.getHeaderStyle(tableColumn)).toEqual({});
      });
    });
  });

  describe('when testing showRowComponentSection', () => {
    describe('when testing on a not expanded row', () => {
      let data;

      beforeAll(() => {
        data = {
          text: 'text',
        };

        component.columns = [
          new TableColumn(
            {
              title: '1',
              nameInData: '1',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 200,
            }
          ),
          new TableColumn(
            {
              title: '2',
              nameInData: '2',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 400,
            }
          ),
          new TableColumn(
            {
              title: '4',
              nameInData: '4',
              hideColumnWhenWindowNarrowerThanNrOfPixels: 800,
            }
          ),
        ];

        component.windowWidth = 400;

        component.preCalculateHiddenColumns();
      });

      it('should return false', () => {
        expect(component.showRowComponentSection(data)).toEqual(false);
      });
    });

    describe('when testing on a not expanded row', () => {
      let data;

      beforeAll(() => {
        data = {
          text: 'text',
          SHOWROWCOMPONENT: true,
        };
      });

      it('should return false', () => {
        expect(component.showRowComponentSection(data)).toEqual(true);
      });
    });
  });

  describe('when testing showRowComponentToggleButton', () => {
    describe('when enableRowComponentDropDown is set to false', () => {
      beforeAll(() => {
        component.hiddenColumnsByWindowWidth = undefined;
        component.rowComponent = undefined;
        component.enableRowComponentDropDown = false;
      });

      it('should return false', () => {
        expect(component.showRowComponentToggleButton()).toBe(false);
      });
    });

    describe('when enableRowComponentDropDown is set to true', () => {
      describe('when no rowComponent is set and it has no hidden columns', () => {
        beforeAll(() => {
          component.hiddenColumnsByWindowWidth = undefined;
          component.rowComponent = undefined;
          component.enableRowComponentDropDown = true;
        });

        it('should return false', () => {
          expect(component.showRowComponentToggleButton()).toBe(false);
        });
      });

      describe('when a rowComponent is present', () => {
        beforeAll(() => {
          component.hiddenColumnsByWindowWidth = undefined;
          component.rowComponent = new DynamicComponent();
          component.enableRowComponentDropDown = true;
        });

        it('should return false', () => {
          expect(component.showRowComponentToggleButton()).toBe(true);
        });
      });

      describe('when hidden columns are present', () => {
        beforeAll(() => {
          component.hiddenColumnsByWindowWidth = [
            new TableColumn()
          ];
          component.rowComponent = undefined;
          component.enableRowComponentDropDown = true;
        });

        it('should return false', () => {
          expect(component.showRowComponentToggleButton()).toBe(true);
        });
      });
    });
  });

  describe('when testing toggleRowComponent', () => {
    let row = {
      text: 'text'
    };

    describe('when showRowComponentMarkerName is undefined', () => {
      beforeAll(() => {
        component.toggleRowComponent(row);
      });

      it('should set showRowComponentMarkerName to true', () => {
        expect(row[component.showRowComponentMarkerName]).toEqual(true);
      });
    });

    describe('when showRowComponentMarkerName is defined as true', () => {
      beforeAll(() => {
        row[component.showRowComponentMarkerName] = true;
        component.toggleRowComponent(row);
      });

      it('should set showRowComponentMarkerName to false', () => {
        expect(row[component.showRowComponentMarkerName]).toEqual(false);
      });
    });
  });

  describe('when testing isRowComponentVisible', () => {
    let row;

    describe('when row component is not visible', () => {
      beforeAll(() => {
        row = {
          text: 'text'
        };
      });

      it('should return a caret down icon', () => {
        expect(component.isRowComponentVisible(row)).toEqual(false);
      });
    });

    describe('when row component is visible', () => {
      beforeAll(() => {
        row = {
          text: 'text'
        };

        row[component.showRowComponentMarkerName] = true;
      });

      it('should return a caret down icon', () => {
        expect(component.isRowComponentVisible(row)).toEqual(true);
      });
    });
  });

  describe('when testing getToggleRowComponentIcon', () => {
    let row;

    describe('when row component is not visible', () => {
      beforeAll(() => {
        row = {
          text: 'text'
        };
      });

      it('should return a caret down icon', () => {
        expect(component.getToggleRowComponentIcon(row)).toEqual(SolidIcons.faAngleDown);
      });
    });

    describe('when row component is visible', () => {
      beforeAll(() => {
        row = {
          text: 'text'
        };

        row[component.showRowComponentMarkerName] = true;
      });

      it('should return a caret down icon', () => {
        expect(component.getToggleRowComponentIcon(row)).toEqual(SolidIcons.faAngleUp);
      });
    });
  });

  describe('when testing showColumn', () => {
    let column: TableColumn;

    describe('when column is hidden', () => {
      beforeAll(() => {
        column = new TableColumn();
        column.hidden = true;
      });

      it('should return false', () => {
        expect(component.showColumn(column)).toEqual(false);
      });
    });

    describe('when number of pixels for hiding columns is not defined', () => {
      beforeAll(() => {
        column = new TableColumn();
        column.hideColumnWhenWindowNarrowerThanNrOfPixels = null;

        component.hiddenColumnsByWindowWidth = [];
      });

      it('should return true', () => {
        expect(component.showColumn(column)).toEqual(true);
      });

      describe('and column is in hiddenColumnsByWindowWidth', () => {
        beforeAll(() => {
          component.hiddenColumnsByWindowWidth = [column];
          component.showColumn(column);
        });

        it('should remove the column from hiddenColumnsByWindowWidth', () => {
          expect(component.hiddenColumnsByWindowWidth).not.toContain(column);
        });
      });
    });

    describe('when window width is bigger than the number of pixels for hiding columns', () => {
      beforeAll(() => {
        column = new TableColumn();
        column.hideColumnWhenWindowNarrowerThanNrOfPixels = 1000;

        component.windowWidth = 1600;
      });

      it('should return true', () => {
        expect(component.showColumn(column)).toEqual(true);
      });
    });

    describe('when window width is smaller than the number of pixels for hiding columns', () => {
      beforeAll(() => {
        column = new TableColumn();
        column.hideColumnWhenWindowNarrowerThanNrOfPixels = 1600;

        component.windowWidth = 1000;
        component.hiddenColumnsByWindowWidth = [];
      });

      it('should return false', () => {
        expect(component.showColumn(column)).toEqual(false);
      });

      describe('and column is not in hiddenColumnsByWindowWidth', () => {
        beforeAll(() => {
          component.showColumn(column);
        });

        it('should add it to hiddenColumnsByWindowWidth', () => {
          expect(component.hiddenColumnsByWindowWidth).toContain(column);
        });
      });
    });
  });

  describe('when testing hasHiddenColumnsByWindowWidth', () => {
    describe('when columns are hidden', () => {
      beforeAll(() => {
        component.hiddenColumnsByWindowWidth = [new TableColumn()];
      });

      it('should return true', () => {
        expect(component.hasHiddenColumnsByWindowWidth()).toEqual(true);
      });
    });

    describe('when columns are not hidden', () => {
      beforeAll(() => {
        component.hiddenColumnsByWindowWidth = [];
      });

      it('should return false', () => {
        expect(component.hasHiddenColumnsByWindowWidth()).toEqual(false);
      });
    });
  });

  describe('when testing calculateColSpanForRowComponent', () => {
    describe('when no columns are defined and rows are not selectable', () => {
      beforeAll(() => {
        component.rowsSelectable = false;
        component.columns = null;
      });

      it('should set colspanForSelectorCheckbox to 1', () => {
        expect(component.calculateColSpanForRowComponent()).toBe(1);
      });
    });

    describe('when no columns are defined and rows are selectable', () => {
      beforeAll(() => {
        component.rowsSelectable = true;
        component.columns = null;
      });

      it('should set colspanForSelectorCheckbox to 2', () => {
        expect(component.calculateColSpanForRowComponent()).toBe(2);
      });
    });

    describe('when columns are defined and none are hidden and rows are selectable', () => {
      beforeAll(() => {
        component.rowsSelectable = true;
        component.columns = [new TableColumn()];
        component.hiddenColumnsByWindowWidth = [];
      });

      it('should set colspanForSelectorCheckbox to 3', () => {
        expect(component.calculateColSpanForRowComponent()).toBe(3);
      });
    });

    describe('when columns are defined and hidden and rows are selectable', () => {
      let column: TableColumn;

      beforeAll(() => {
        component.rowsSelectable = true;
        column = new TableColumn();
        component.columns = [column];
        component.hiddenColumnsByWindowWidth = [column];
      });

      it('should set colspanForSelectorCheckbox to 2', () => {
        expect(component.calculateColSpanForRowComponent()).toBe(2);
      });
    });
  });

  describe('when testing hasPageBrowser', () => {
    describe('when has no pageBrowser and its turned off', () => {
      beforeAll(() => {
        component.showPageBrowser = false;
        component.paging = undefined;
      });

      it('should return false', () => {
        expect(component.hasPageBrowser()).toBe(false);
      });
    });

    describe('when has no pageBrowser and its turned on', () => {
      beforeAll(() => {
        component.showPageBrowser = true;
        component.paging = undefined;
      });

      it('should return false', () => {
        expect(component.hasPageBrowser()).toBe(false);
      });
    });

    describe('when has a pageBrowser with 0 values and its turned on', () => {
      beforeAll(() => {
        component.showPageBrowser = true;
        component.paging = new Paging();
      });

      it('should return false', () => {
        expect(component.hasPageBrowser()).toBe(false);
      });
    });

    describe('when has a pageBrowser and its turned on', () => {
      beforeAll(() => {
        component.showPageBrowser = true;
        component.paging = new Paging();
        component.paging.total = 20;
        component.paging.take = 10;
      });

      it('should return false', () => {
        expect(component.hasPageBrowser()).toBe(true);
      });
    });
  });

  describe('when testing columnAllowsFiltering', () => {
    describe('when allows filtering', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.allowFiltering = true;
      });

      it('should return true', () => {
        expect(component.columnAllowsFiltering(column)).toBe(true);
      });
    });

    describe('when dow not allow filtering', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.allowFiltering = false;
      });

      it('should return true', () => {
        expect(component.columnAllowsFiltering(column)).toBe(false);
      });
    });
  });

  describe('when testing columnAllowsSorting', () => {
    describe('when allows sorting', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.allowSorting = true;
      });

      it('should return true', () => {
        expect(component.columnAllowsSorting(column)).toBe(true);
      });
    });

    describe('when does not allow sorting', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.allowSorting = false;
      });

      it('should return true', () => {
        expect(component.columnAllowsSorting(column)).toBe(false);
      });
    });
  });

  describe('when testing hasNoSortOrder', () => {
    describe('when has descending sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.DESC;
      });

      it('should return true', () => {
        expect(component.hasNoSortOrder(column)).toBe(false);
      });
    });

    describe('when has ascending sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.ASC;
      });

      it('should return true', () => {
        expect(component.hasNoSortOrder(column)).toBe(false);
      });
    });

    describe('when has no sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.NONE;
      });

      it('should return true', () => {
        expect(component.hasNoSortOrder(column)).toBe(true);
      });
    });
  });

  describe('when testing hasAscendingSortOrder', () => {
    describe('when has descending sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.DESC;
      });

      it('should return true', () => {
        expect(component.hasAscendingSortOrder(column)).toBe(false);
      });
    });

    describe('when has ascending sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.ASC;
      });

      it('should return true', () => {
        expect(component.hasAscendingSortOrder(column)).toBe(true);
      });
    });
  });

  describe('when testing hasDescendingSortOrder', () => {
    describe('when has descending sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.DESC;
      });

      it('should return true', () => {
        expect(component.hasDescendingSortOrder(column)).toBe(true);
      });
    });

    describe('when has ascending sort order', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.sortOrder = SortOrder.ASC;
      });

      it('should return true', () => {
        expect(component.hasDescendingSortOrder(column)).toBe(false);
      });
    });
  });

  describe('when testing getFilterIcon', () => {
    it('should return a SolidIcons.faFilter', () => {
      expect(component.getFilterIcon()).toEqual(SolidIcons.faFilter);
    });
  });

  describe('when testing getNoSortOrderIcon', () => {
    it('should return a SolidIcons.faSort', () => {
      expect(component.getNoSortOrderIcon()).toEqual(SolidIcons.faSort);
    });
  });

  describe('when testing getAscendingSortOrderIcon', () => {
    it('should return a SolidIcons.faSortAlphaUp', () => {
      expect(component.getAscendingSortOrderIcon()).toEqual(SolidIcons.faSortAlphaUp);
    });
  });

  describe('when testing getDescendingSortOrderIcon', () => {
    it('should return a SolidIcons.faSortAlphaDown', () => {
      expect(component.getDescendingSortOrderIcon()).toEqual(SolidIcons.faSortAlphaDown);
    });
  });

  describe('when testing getIconType', () => {
    it('should return a IconTypeEnum.FONT_AWESOME', () => {
      expect(component.getIconType()).toEqual(IconTypeEnum.FONT_AWESOME);
    });
  });

  describe('when testing changeColumnSortOrder', () => {
    let column = new TableColumn(),
      previousSortOrder;

    beforeAll(() => {
      column.sortOrder = SortOrder.ASC;
      previousSortOrder = column.sortOrder;
    });

    describe('when columnAllowsSorting is false', () => {
      beforeAll(() => {
        column.allowSorting = false;
        component.changeColumnSortOrder(column);
      });

      it('should have not change the sort order', () => {
        expect(column.sortOrder).toEqual(previousSortOrder);
      });
    });

    describe('when columnAllowsSorting is true', () => {
      beforeAll(() => {
        column.allowSorting = true;
        component.changeColumnSortOrder(column);
      });

      it('should have changed the sort order', () => {
        expect(column.sortOrder).not.toEqual(previousSortOrder);
      });
    });
  });

  describe('when testing resetAllColumnSortOrders', () => {
    let isNotReset = false;

    beforeAll(() => {
      let visibleColumnAsc = new TableColumn(),
        visibleColumnDesc = new TableColumn(),
        visibleColumnNone = new TableColumn();

      visibleColumnAsc.sortOrder = SortOrder.ASC;
      visibleColumnDesc.sortOrder = SortOrder.DESC;
      visibleColumnNone.sortOrder = SortOrder.NONE;

      component.columns = [
        visibleColumnAsc,
        visibleColumnDesc,
        visibleColumnNone
      ];

      component.resetAllColumnSortOrders();

      for (let visibleColumn of component.columns) {
        if (visibleColumn.sortOrder !== SortOrder.NONE) {
          isNotReset = true;
        }
      }
    });

    it('should have the sort order of all visible columns set to SortOrder.NONE', () => {
      expect(isNotReset).toEqual(false);
    });
  });

  describe('when testing setSortOrderByReferenceSortOrder', () => {
    let column = new TableColumn();

    describe('when sort order is not set', () => {
      beforeAll(() => {
        component.setSortOrderByReferenceSortOrder(column, undefined);
      });

      it('should have the sort order of the column set to SortOrder.NONE', () => {
        expect(column.sortOrder).toEqual(SortOrder.ASC);
      });
    });

    describe('when sort order is SortOrder.NONE', () => {
      beforeAll(() => {
        component.setSortOrderByReferenceSortOrder(column, SortOrder.NONE);
      });

      it('should have the sort order of the column set to SortOrder.NONE', () => {
        expect(column.sortOrder).toEqual(SortOrder.ASC);
      });
    });

    describe('when sort order is SortOrder.ASC', () => {
      beforeAll(() => {
        component.setSortOrderByReferenceSortOrder(column, SortOrder.ASC);
      });

      it('should have the sort order of the column set to SortOrder.DESC', () => {
        expect(column.sortOrder).toEqual(SortOrder.DESC);
      });
    });

    describe('when sort order is SortOrder.DESC', () => {
      beforeAll(() => {
        component.setSortOrderByReferenceSortOrder(column, SortOrder.DESC);
      });

      it('should have the sort order of the column set to SortOrder.ASC', () => {
        expect(column.sortOrder).toEqual(SortOrder.ASC);
      });
    });

    describe('when sort order is a random number', () => {
      let previousSortOrder;

      beforeAll(() => {
        column.sortOrder = SortOrder.ASC;
        previousSortOrder = column.sortOrder;

        component.setSortOrderByReferenceSortOrder(column, 99);
      });

      it('should have the sort order of the column not changed', () => {
        expect(column.sortOrder).toEqual(previousSortOrder);
      });
    });
  });

  describe('when testing emitSortData', () => {
    let column = new TableColumn(),
      sorting;

    column.title = 'Test column title';
    column.nameInData = 'Test nameInData';
    column.sortOrder = SortOrder.ASC;

    describe('when event emitter is defined', () => {
      let sortingChanged: boolean,
        subscription;

      beforeAll(() => {
        component.sortingChanged = new EventEmitter<Sorting>();
        sortingChanged = false;

        subscription = component.sortingChanged.subscribe(
          () => {
            sortingChanged = true;
          });

        sorting = new Sorting(component.helperService);
        sorting.title = 'Test column title';
        sorting.nameInData = 'Test nameInData';
        sorting.order = SortOrder.ASC;

        component.emitSortData(column);
      });

      it('should have changed the sorting', () => {
        expect(sortingChanged).toEqual(true);
      });

      it('should have set the title', () => {
        expect(component.sorting.title).toEqual(sorting.title);
      });

      it('should have set the nameInData', () => {
        expect(component.sorting.nameInData).toEqual(sorting.nameInData);
      });

      it('should have set the order', () => {
        expect(component.sorting.order).toEqual(sorting.order);
      });

      describe('and when sorting is not defined', () => {
        beforeAll(() => {
          component.sorting = undefined;
          component.emitSortData(column);
        });

        it('should have initialized sorting', () => {
          expect(component.sorting).toEqual(jasmine.any(Sorting));
        });
      });

      afterAll(() => {
        subscription.unsubscribe();
      });
    });

    describe('when event emitter is not defined', () => {
      beforeAll(() => {
        component.sortingChanged = null;
        component.emitSortData(column);
      });

      it('should have no event emitter to emit from', () => {
        expect(component.sortingChanged).toBeFalsy();
      });
    });
  });

  describe('when testing emitPagingData', () => {
    describe('when event emitter is defined', () => {
      let paging = new Paging(),
        pagingChanged: boolean,
        subscription;

      beforeAll(() => {
        subscription = component.pagingChanged.subscribe(
          () => {
            pagingChanged = true;
          });

        component.emitPagingData(paging);
      });

      it('should have called the function emit', () => {
        expect(pagingChanged).toBe(true);
      });

      afterAll(() => {
        subscription.unsubscribe();
      });
    });

    describe('when event emitter is not defined', () => {
      let paging = new Paging();

      beforeAll(() => {
        component.pagingChanged = undefined;
        component.emitPagingData(paging);
      });

      it('should have no event emitter to emit from', () => {
        expect(component.pagingChanged).toBeUndefined();
      });
    });
  });

  describe('when testing rowsSelectableChange', () => {
    let row,
      event: CheckboxStateEnum;

    beforeAll(() => {
      row = {
        text: 'text'
      };
    });

    describe('when row is not selected', () => {
      beforeAll(() => {
        spyOn(component, 'pushPopSelectedRows');

        event = 1;
        component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
        component.rowsSelectableChange(event, row);
      });

      it('should have changed to selected', () => {
        /* tslint:disable:no-string-literal */
        expect(row['ROW_IS_SELECTED']).toBe(true);
      });

      it('should have called the function pushPopSelectedRows', () => {
        expect(component.pushPopSelectedRows).toHaveBeenCalledWith(row);
      });
    });

    describe('when row is selected', () => {
      beforeAll(() => {
        spyOn(component, 'pushPopSelectedRows');

        event = 0;
        component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
        component.rowsSelectableChange(event, row);
      });

      it('should have changed to unselected', () => {
        /* tslint:disable:no-string-literal */
        expect(row['ROW_IS_SELECTED']).toBe(false);
      });

      it('should have called the function pushPopSelectedRows', () => {
        expect(component.pushPopSelectedRows).toHaveBeenCalledWith(row);
      });
    });

    describe('when row is not selectable by field name', () => {
      beforeAll(() => {
        row = {
          text: 'text'
        };

        event = 0;
        component.rowsSelectedByFieldName = null;
        component.rowsSelectableChange(event, row);
      });

      it('should not have a property ROW_IS_SELECTED', () => {
        expect(row['ROW_IS_SELECTED']).toBeUndefined();
      });
    });
  });

  describe('when testing pushPopSelectedRows', () => {
    let row1,
      row2,
      row3;

    beforeAll(() => {
      row1 = {
        id: 1,
        text: 'text',
        ROW_IS_SELECTED: true
      };
      row2 = {
        id: 2,
        text: 'text',
        ROW_IS_SELECTED: false
      };
      row3 = {
        id: 3,
        text: 'text',
        ROW_IS_SELECTED: true
      };
      component.data = [
        row1,
        row2,
        row3,
      ];
    });

    describe('when selected row is "*"', () => {
      describe('when returnContentOfThisFieldWhenSelected is not set', () => {
        beforeAll(() => {
          component.selectedRows = ['*'];
          component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
          component.pushPopSelectedRows(row1);
        });

        it('should have all with the property ROW_IS_SELECTED true', () => {
          expect(component.selectedRows.length).toEqual(2);
        });
      });

      describe('when returnContentOfThisFieldWhenSelected is set', () => {
        beforeAll(() => {
          component.returnContentOfThisFieldWhenSelected = 'id';
          component.selectedRows = ['*'];
          component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
          component.pushPopSelectedRows(row1);
        });

        it('should have all with the property ROW_IS_SELECTED true', () => {
          expect(component.selectedRows.length).toEqual(2);
        });

        it('should have as first element the value of the field of the first selected row', () => {
          expect(component.selectedRows[0]).toEqual(1);
        });
      });
    });

    describe('when selected row is not "*" and returnContentOfThisFieldWhenSelected is set', () => {
      describe('when given row is not in the selected rows', () => {
        describe('when selected row has the required field', () => {
          beforeAll(() => {
            component.returnContentOfThisFieldWhenSelected = 'id';
            component.selectedRows = [];
            component.pushPopSelectedRows(row1);
          });

          it('should have as first element the value of the field of the first selected row', () => {
            expect(component.selectedRows[0]).toEqual(1);
          });
        });

        describe('when selected row does not have the required field', () => {
          beforeAll(() => {
            component.returnContentOfThisFieldWhenSelected = 'name';
            component.selectedRows = [];
            component.pushPopSelectedRows(row1);
          });

          it('should have as first element the selected row', () => {
            expect(component.selectedRows[0]).toEqual(row1);
          });
        });
      });

      describe('when given row is in the selected rows', () => {
        beforeAll(() => {
          component.returnContentOfThisFieldWhenSelected = 'id';
          component.selectedRows = [1];
          component.pushPopSelectedRows(row1);
        });

        it('should have eliminated the row from the selected rows', () => {
          expect(component.selectedRows.length).toEqual(0);
        });
      });
    });

    describe('when selected row is not "*" and returnContentOfThisFieldWhenSelected is not set', () => {
      describe('when given row is not in the selected rows', () => {
        beforeAll(() => {
          component.returnContentOfThisFieldWhenSelected = null;
          component.selectedRows = [];
          component.pushPopSelectedRows(row1);
        });

        it('should have as first element the selected row', () => {
          expect(component.selectedRows[0]).toEqual(row1);
        });
      });

      describe('when given row is in the selected rows', () => {
        beforeAll(() => {
          component.returnContentOfThisFieldWhenSelected = null;
          component.selectedRows = [row1];
          component.pushPopSelectedRows(row1);
        });

        it('should have eliminated the row from the selected rows', () => {
          expect(component.selectedRows.length).toEqual(0);
        });
      });
    });

    describe('when selected rows has changed', () => {
      beforeAll(() => {
        component.selectedRows = [];
        component.selectedRowsChanged = new EventEmitter<any[]>();
        spyOn(component.selectedRowsChanged, 'emit');
        component.pushPopSelectedRows(row1);
      });

      it('should have called emit', () => {
        expect(component.selectedRowsChanged.emit).toHaveBeenCalledWith(component.selectedRows);
      });
    });

    describe('when selected rows has not changed', () => {
      beforeAll(() => {
        component.selectedRowsChanged = null;
        component.pushPopSelectedRows(row1);
      });

      it('should have no event emitter to emit from', () => {
        expect(component.selectedRowsChanged).toBeFalsy();
      });
    });
  });

  describe('when testing selectDeselectAll', () => {
    let event,
      row1,
      row2,
      row3;

    beforeAll(() => {
      row1 = {
        id: 1,
        text: 'text',
        ROW_IS_SELECTED: true
      };
      row2 = {
        id: 2,
        text: 'text',
        ROW_IS_SELECTED: false
      };
      row3 = {
        id: 3,
        text: 'text',
        ROW_IS_SELECTED: true
      };
      component.data = [
        row1,
        row2,
        row3,
      ];
    });

    describe('when all have been checked', () => {
      beforeAll(() => {
        event = CheckboxStateEnum.ALL_CHECKED;
        component.selectedRows = [];
        component.selectedRowsChanged = new EventEmitter<any[]>();
        spyOn(component.selectedRowsChanged, 'emit');
        component.selectDeselectAll(event);
      });

      it('should have all rows selected', () => {
        expect(component.allRowsAreSelected).toEqual(true);
      });

      it('should have set selectedRows to ["*"]', () => {
        expect(component.selectedRows).toEqual(['*']);
      });

      describe('when selected rows has changed', () => {
        it('should have called emit', () => {
          expect(component.selectedRowsChanged.emit).toHaveBeenCalledWith(component.selectedRows);
        });
      });

      describe('when selected rows has not changed', () => {
        beforeAll(() => {
          component.selectedRowsChanged = null;
          component.selectDeselectAll(event);
        });

        it('should have no event emitter to emit from', () => {
          expect(component.selectedRowsChanged).toBeFalsy();
        });
      });
    });

    describe('when some have been checked', () => {
      beforeAll(() => {
        event = CheckboxStateEnum.CHECKED;
      });

      describe('when there are rows selected by fieldname', () => {
        beforeAll(() => {
          component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
          component.selectDeselectAll(event);
        });

        it('should set the data on the current page as selected', () => {
          expect(component.selectedRows.length).toEqual(component.data.length);
        });
      });

      describe('when there are rows selected by fieldname and selected rows contain all the columns', () => {
        beforeAll(() => {
          component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
          component.returnContentOfThisFieldWhenSelected = null;
          component.selectDeselectAll(event);
        });

        it('should set the data on the current page as selected', () => {
          expect(component.selectedRows[0]).toEqual(component.data[0]);
        });
      });

      describe('when there are rows selected by fieldname and returnContentOfThisFieldWhenSelected is set', () => {
        beforeAll(() => {
          component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
          component.returnContentOfThisFieldWhenSelected = 'Nachname';
          component.selectDeselectAll(event);
        });

        it('should set in the selectedRows only the data from the set column', () => {
          expect(component.selectedRows[0]).toEqual(component.data[0]['Nachname']);
        });
      });

      describe('when rows are not selected by fieldname', () => {
        beforeAll(() => {
          component.rowsSelectedByFieldName = null;
          component.selectDeselectAll(event);
        });

        it('should set the data on the current page as selected', () => {
          expect(component.selectedRows.length).toEqual(component.data.length);
        });
      });

    });

    describe('when none have been checked', () => {
      beforeAll(() => {
        event = CheckboxStateEnum.NONE;
        component.selectDeselectAll(event);
      });

      it('should have the field "ROW_IS_SELECTED" of the first row set to false', () => {
        expect(component.data[0][component.rowsSelectedByFieldName]).toBe(false);
      });

      it('should have no selected rows', () => {
        expect(component.selectedRows.length).toEqual(0);
      });
    });

    describe('when selected rows have changed', () => {
      beforeAll(() => {
        event = CheckboxStateEnum.CHECKED;
        component.selectedRowsChanged = new EventEmitter<any[]>();
        spyOn(component.selectedRowsChanged, 'emit');
        component.selectedRows = [];
        component.selectDeselectAll(event);
      });

      it('should have called emit', () => {
        expect(component.selectedRowsChanged.emit).toHaveBeenCalledWith(component.selectedRows);
      });
    });

    describe('when selected rows have not been changed', () => {
      beforeAll(() => {
        event = CheckboxStateEnum.CHECKED;
        component.selectedRowsChanged = null;
        component.selectDeselectAll(event);
      });

      it('should have no event emitter to emit from', () => {
        expect(component.selectedRowsChanged).toBeFalsy();
      });
    });
  });

  describe('when testing isCheckboxChecked', () => {
    let row = {
      text: 'text'
    };

    describe('when selected row is "*"', () => {
      beforeAll(() => {
        component.selectedRows = ['*'];
      });

      it('should return CheckboxStateEnum.CHECKED', () => {
        expect(component.isCheckboxChecked(row)).toEqual(CheckboxStateEnum.CHECKED);
      });
    });

    describe('when row can be selected by field name', () => {
      beforeAll(() => {
        component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
        component.selectedRows = null;
      });

      describe('and is selected', () => {
        beforeAll(() => {
          row[component.rowsSelectedByFieldName] = true;
        });

        it('should return CheckboxStateEnum.CHECKED', () => {
          expect(component.isCheckboxChecked(row)).toEqual(CheckboxStateEnum.CHECKED);
        });
      });

      describe('but is not selected', () => {
        beforeAll(() => {
          row[component.rowsSelectedByFieldName] = false;
        });

        it('should return CheckboxStateEnum.NONE', () => {
          expect(component.isCheckboxChecked(row)).toEqual(CheckboxStateEnum.NONE);
        });
      });
    });

    describe('when row cannot be selected by field name', () => {
      beforeAll(() => {
        component.rowsSelectedByFieldName = null;
        component.selectedRows = null;
      });

      describe('and row is selected', () => {
        beforeAll(() => {
          component.selectedRows = [row];
        });

        it('should return CheckboxStateEnum.CHECKED', () => {
          expect(component.isCheckboxChecked(row)).toEqual(CheckboxStateEnum.CHECKED);
        });
      });

      describe('and is not selected', () => {
        beforeAll(() => {
          component.selectedRows = [];
        });

        it('should return CheckboxStateEnum.NONE', () => {
          expect(component.isCheckboxChecked(row)).toEqual(CheckboxStateEnum.NONE);
        });
      });
    });
  });

  describe('when testing areAllEntriesSelected', () => {
    describe('when all rows are selected', () => {
      beforeAll(() => {
        component.allRowsAreSelected = true;
      });

      it('should return CheckboxStateEnum.ALL_CHECKED', () => {
        expect(component.areAllEntriesSelected()).toEqual(CheckboxStateEnum.ALL_CHECKED);
      });
    });

    describe('when data exists, but has no items', () => {
      beforeAll(() => {
        component.allRowsAreSelected = false;
        component.data = [];
      });

      it('should return CheckboxStateEnum.NONE', () => {
        expect(component.areAllEntriesSelected()).toEqual(CheckboxStateEnum.NONE);
      });
    });

    describe('when data exists and has items', () => {
      let row = {
        test: 'test'
      };

      describe('when rows can be selected by field name', () => {
        beforeAll(() => {
          component.allRowsAreSelected = false;
          component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
        });

        describe('and not all rows are selected', () => {
          beforeAll(() => {
            row[component.rowsSelectedByFieldName] = false;
            component.data = [
              row,
              row,
              row,
            ];
          });

          it('should return CheckboxStateEnum.NONE', () => {
            expect(component.areAllEntriesSelected()).toEqual(CheckboxStateEnum.NONE);
          });
        });

        describe('and not all rows are selected', () => {
          beforeAll(() => {
            row[component.rowsSelectedByFieldName] = true;
            component.data = [
              row,
              row,
              row,
            ];
          });

          it('should return CheckboxStateEnum.CHECKED', () => {
            expect(component.areAllEntriesSelected()).toEqual(CheckboxStateEnum.CHECKED);
          });
        });
      });

      describe('when rows cannot be selected by field name', () => {
        beforeAll(() => {
          component.allRowsAreSelected = false;
          component.rowsSelectedByFieldName = null;
        });

        describe('and no rows are selected', () => {
          beforeAll(() => {
            row[component.rowsSelectedByFieldName] = false;
            component.data = [row];
            component.selectedRows = [];
          });

          it('should return CheckboxStateEnum.NONE', () => {
            expect(component.areAllEntriesSelected()).toEqual(CheckboxStateEnum.NONE);
          });
        });

        describe('and a row is selected', () => {
          beforeAll(() => {
            row[component.rowsSelectedByFieldName] = true;
            component.data = [row];
            component.selectedRows = [row];
          });

          it('should return CheckboxStateEnum.CHECKED ', () => {
            expect(component.areAllEntriesSelected()).toEqual(CheckboxStateEnum.CHECKED);
          });
        });
      });
    });
  });

  describe('when testing allDataIsPresent', () => {
    describe('when data is not defined', () => {
      beforeAll(() => {
        component.data = null;
      });

      it('should return false', () => {
        expect(component.allDataIsPresent()).toEqual(false);
      });
    });

    describe('when table paging is not defined', () => {
      beforeAll(() => {
        component.data = {
          test: 'test'
        };
      });

      it('should return false', () => {
        expect(component.allDataIsPresent()).toEqual(false);
      });
    });

    describe('when total is bigger than displayed data', () => {
      beforeAll(() => {
        component.data = [
          {
            test: 'test'
          }
        ];
        component.paging = new Paging();
        component.paging.setTotal(2);
      });

      it('should return false', () => {
        expect(component.allDataIsPresent()).toEqual(false);
      });
    });

    describe('when all data is displayed', () => {
      beforeAll(() => {
        component.data = [
          {
            test: 'test'
          }
        ];
        component.paging = new Paging();
        component.paging.setTotal(1);
      });

      it('should return true', () => {
        expect(component.allDataIsPresent()).toEqual(true);
      });
    });
  });

  describe('when testing hasNoData', () => {
    describe('when there is no data', () => {
      beforeAll(() => {
        component.data = [];
      });

      it('should return true', () => {
        expect(component.hasNoData()).toEqual(true);
      });
    });

    describe('when there is data', () => {
      beforeAll(() => {
        component.data = [
          {
            test: 'test',
          }
        ];
      });

      it('should return false', () => {
        expect(component.hasNoData()).toEqual(false);
      });
    });
  });

  describe('when testing hasNoVisibleColumns', () => {
    describe('when there are no visible rows', () => {
      beforeAll(() => {
        component.columns = [];
      });

      it('should return true', () => {
        expect(component.hasNoVisibleColumns()).toEqual(true);
      });
    });

    describe('when there are visible rows', () => {
      beforeAll(() => {
        component.columns = [
          new TableColumn(),
        ];
      });

      it('should return false', () => {
        expect(component.hasNoVisibleColumns()).toEqual(false);
      });
    });
  });

  describe('when testing showFilterSelector', () => {
    let column: TableColumn = new TableColumn();

    beforeAll(() => {
      column.showFilterSelector = true;
    });

    it('should return true', () => {
      expect(component.showFilterSelector(column)).toEqual(true);
    });
  });

  describe('when testing toggleShowFilterSelector', () => {
    describe('without a filter', () => {
      let column: TableColumn = new TableColumn();

      beforeAll(() => {
        column.showFilterSelector = true;

        component.toggleShowFilterSelector(column);
      });

      it('should return false', () => {
        expect(column.showFilterSelector).toEqual(false);
      });
    });

    describe('with a filter', () => {
      let column: TableColumn = new TableColumn();

      beforeAll(() => {
        column.showFilterSelector = true;

        component.initFilterForColumn(column);
        component.toggleShowFilterSelector(column);
      });

      it('should return false', () => {
        expect(column.showFilterSelector).toEqual(false);
      });
    });
  });

  describe('when testing initFilterForColumn', () => {
    let column: TableColumn = new TableColumn();

    beforeAll(() => {
      column.title = 'row1';
      column.nameInData = 'row1';

      component.initFilterForColumn(column);
    });

    it('should have created a filter', () => {
      expect(column.filter).toBeTruthy();
    });

    it('should have set the filter idIndata correctly', () => {
      expect(column.nameInData).toEqual(column.filter.idInData);
    });
  });

  describe('when testing setFilter', () => {
    describe('when filterChanged Emitter is present', () => {
      let column: TableColumn,
        filterChanged: boolean,
        subscription;

      beforeAll(() => {
        column = new TableColumn();
        column.filter = new Filter();
        column.showFilterSelector = true;

        subscription = component.filterChanged.subscribe(
          () => {
            filterChanged = true;
          }
        );

        component.setFilter(column);
      });

      it('should have set the showFilterSelector to false', () => {
        expect(column.showFilterSelector).toBe(false);
      });

      it('should have triggered a filterChangedEvent', () => {
        expect(filterChanged).toBe(true);
      });

      afterAll(() => {
        subscription.unsubscribe();
      });
    });

    describe('when filterChanged Emitter is not present', () => {
      let column: TableColumn,
        filterChanged: boolean = false;

      beforeAll(() => {
        column = new TableColumn();
        column.filter = new Filter();
        column.showFilterSelector = true;

        component.filterChanged = undefined;

        component.setFilter(column);
      });

      it('should have triggered a filterChangedEvent', () => {
        expect(filterChanged).toBe(false);
      });
    });
  });

  describe('when testing deleteFilter', () => {
    describe('when filterChanged Emitter is present', () => {
      let column: TableColumn,
        filterChanged: boolean,
        subscription;

      beforeAll(() => {
        column = new TableColumn();
        column.filter = new Filter();
        column.showFilterSelector = true;
        component.filterChanged = new EventEmitter<TableColumn>();

        subscription = component.filterChanged.subscribe(
          () => {
            filterChanged = true;
          }
        );

        component.deleteFilter(column);
      });

      it('should have deleted the filter', () => {
        expect(column.filter).toBe(undefined);
      });

      it('should have set the showFilterSelector to false', () => {
        expect(column.showFilterSelector).toBe(false);
      });

      it('should have triggered a filterChangedEvent', () => {
        expect(filterChanged).toBe(true);
      });

      afterAll(() => {
        subscription.unsubscribe();
      });
    });

    describe('when filterChanged Emitter is not present', () => {
      let column: TableColumn,
        filterChanged: boolean = false;

      beforeAll(() => {
        column = new TableColumn();
        column.filter = new Filter();
        column.showFilterSelector = true;

        component.filterChanged = undefined;

        component.deleteFilter(column);
      });

      it('should have triggered a filterChangedEvent', () => {
        expect(filterChanged).toBe(false);
      });
    });
  });

  describe('when testing cancelFilter', () => {
    describe('when resizing is allowed', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.showFilterSelector = true;
        component.cancelFilter(column);
      });

      it('should return true', () => {
        expect(column.showFilterSelector).toBe(false);
      });
    });
  });

  describe('when testing isResizingAllowed', () => {
    describe('when resizing is allowed', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.allowResizing = true;
      });

      it('should return true', () => {
        expect(component.isResizingAllowed(column)).toBe(true);
      });
    });

    describe('when resizing is forbidden', () => {
      let column: TableColumn;

      beforeAll(() => {
        column = new TableColumn();
        column.allowResizing = false;
      });

      it('should return true', () => {
        expect(component.isResizingAllowed(column)).toBe(false);
      });
    });
  });

  describe('when testing resizeStart', () => {
    let column = new TableColumn(),
      mouseEvent;

    beforeAll(() => {
      mouseEvent = {
        clientX: 100,
        target: {
          parentElement: {
            offsetWidth: 200
          }
        }
      } as unknown as MouseEvent;

      component.resizeStart(mouseEvent, column);
    });

    it('should have activated resizing', () => {
      expect(component.resizing).toEqual(true);
    });

    it('should have resizeStartXOffset set', () => {
      expect(component.resizeStartXOffset).toEqual(mouseEvent.clientX);
    });

    it('should have originalWidth set', () => {
      expect(column.originalWidth).toEqual(mouseEvent.target.parentElement.offsetWidth);
    });
  });

  describe('when testing resizeDrag', () => {
    let column = new TableColumn(),
      previousColumnWidth = null,
      mouseEvent = new MouseEvent('drag');

    describe('and when component resizing is activated', () => {
      beforeAll(() => {
        component.resizing = true;
        previousColumnWidth = column.width;
        component.resizingColumn = column;
        component.resizeDrag(mouseEvent);
      });

      it('should have width recalculated', () => {
        expect(column.width).not.toEqual(previousColumnWidth);
      });
    });

    describe('and when component resizing is inactive', () => {
      beforeAll(() => {
        component.resizing = false;
        previousColumnWidth = column.width;
        component.resizingColumn = column;
        component.resizeDrag(mouseEvent);
      });

      it('should have the width unchanged', () => {
        expect(column.width).toEqual(previousColumnWidth);
      });
    });
  });

  describe('when testing resizeEnd', () => {
    describe('and when component resizing is activated', () => {
      beforeAll(() => {
        component.resizing = true;
        component.resizeEnd();
      });

      it('should have turned off resizing', () => {
        expect(component.resizing).toBe(false);
      });

      it('should have reset resizingColumn', () => {
        expect(component.resizingColumn).toBeUndefined();
      });
    });

    describe('and when component resizing is deactivated', () => {
      beforeAll(() => {
        component.resizing = false;
        component.resizingColumn = undefined;
        component.resizeEnd();
      });

      it('should have not changed resizing value', () => {
        expect(component.resizing).toBe(false);
      });

      it('should have reset resizingColumn', () => {
        expect(component.resizingColumn).toBeUndefined();
      });
    });
  });

  describe('when testing getResizeIcon', () => {
    it('should return a SolidIcons.faArrowsAltH', () => {
      expect(component.getResizeIcon()).toEqual(SolidIcons.faArrowsAltH);
    });
  });

  describe('when testing onRowClicked', () => {
    let row = {
      text: 'text'
    };

    describe('when selectRowsWhenClicked is true', () => {
      beforeAll(() => {
        component.selectRowsWhenClicked = true;

        row[component.rowsSelectedByFieldName] = false;

        component.onRowClicked(row);
      });

      it('should set row as selected', () => {
        expect(row[component.rowsSelectedByFieldName]).toEqual(true);
      });
    });

    describe('when selectRowsWhenClicked is false', () => {
      beforeAll(() => {
        component.selectRowsWhenClicked = false;

        row[component.rowsSelectedByFieldName] = false;

        component.onRowClicked(row);
      });

      it('should leave row as unselected', () => {
        expect(row[component.rowsSelectedByFieldName]).toEqual(false);
      });
    });
  });

  describe('when testing getTableHeaderRowClass', () => {
    beforeAll(() => {
      component.allRowsAreSelected = true;
    });

    it('should leave row as unselected', () => {
      expect(component.getTableHeaderRowClass()).toEqual(
        {
          'shared-table__selected-header-row': CheckboxStateEnum.ALL_CHECKED
        }
      );
    });
  });

  describe('when testing getTableDataRowClass', () => {
    let row = {
      text: 'text'
    };

    beforeAll(() => {
      component.selectedRows = ['*'];
    });

    it('should leave row as unselected', () => {
      expect(component.getTableDataRowClass(row)).toEqual(
        {
          'shared-table__selected-row': CheckboxStateEnum.CHECKED
        }
      );
    });
  });

  describe('when testing getShowAvailableColumnsForSelectionIcon', () => {
    it('should return SolidIcons.faList', () => {
      expect(component.getShowAvailableColumnsForSelectionIcon()).toEqual(SolidIcons.faList);
    });
  });

  describe('when testing showStaticInvisibleColumn', () => {
    let column: TableColumn = new TableColumn();

    describe('when column is hidden', () => {
      beforeEach(() => {
        column.hidden = true;
      });

      it('should return false', () => {
        expect(component.showStaticInvisibleColumn(column)).toEqual(false);
      });
    });

    describe('when column is not hidden and it is not a dynamic component', () => {
      beforeEach(() => {
        column.hidden = false;
        column.hideColumnWhenWindowNarrowerThanNrOfPixels = 1600;
        component.windowWidth = 1000;
      });

      it('should return true', () => {
        expect(component.showStaticInvisibleColumn(column)).toEqual(true);
      });
    });
  });

  describe('when testing showDynamicInvisibleColumn', () => {
    let column: TableColumn = new TableColumn();

    describe('when column is hidden', () => {
      beforeEach(() => {
        column.hidden = true;
      });

      it('should return false', () => {
        expect(component.showDynamicInvisibleColumn(column)).toEqual(false);
      });
    });

    describe('when column is not hidden and it is a dynamic component', () => {
      beforeEach(() => {
        column.hidden = false;
        column.hideColumnWhenWindowNarrowerThanNrOfPixels = 1600;
        component.windowWidth = 1000;
        column.dynamicComponent = new DynamicComponent();
      });

      it('should return true', () => {
        expect(component.showDynamicInvisibleColumn(column)).toEqual(true);
      });
    });
  });

  describe('when testing onSelectionStart', () => {
    let index = 0,
      rowIsSelected,
      event;

    beforeAll(() => {
      let row1 = {
        id: 1,
        text: 'text',
        ROW_IS_SELECTED: false
      };
      let row2 = {
        id: 2,
        text: 'text',
        ROW_IS_SELECTED: true
      };

      component.data = [
        row1,
        row2,
      ];
      component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
      event = new Event('mousedown');
    });

    describe('when selectRowsWhenDrag is true', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = true;
        component.isFirstSelectionRowSelected = false;
        component.selectionStartRowIndex = -1;
        rowIsSelected = component.data[index][component.rowsSelectedByFieldName];
        component.onSelectionStart(event, index);
      });

      it('should set isFirstSelectionRowSelected variable', () => {
        expect(component.isFirstSelectionRowSelected).toEqual(rowIsSelected);
      });

      xit('should set selectionStartRowIndex variable', () => {
        expect(component.selectionStartRowIndex).toEqual(index);
      });
    });

    describe('when selectRowsWhenDrag is false', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = false;
        component.isFirstSelectionRowSelected = false;
        component.selectionStartRowIndex = -1;
        component.onSelectionStart(event, index);
      });

      it('should not change the value of isFirstSelectionRowSelected variable', () => {
        expect(component.isFirstSelectionRowSelected).toEqual(false);
      });

      it('should not change the value of selectionStartRowIndex variable', () => {
        expect(component.selectionStartRowIndex).toEqual(-1);
      });
    });
  });

  describe('when testing onSelection', () => {
    let index = 0,
      selectedRows,
      isRowSelected;

    describe('when selectRowsWhenDrag is true', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = true;
      });

      describe('when mouse down is true', () => {
        beforeAll(() => {
          component.mouseDown = true;
        });

        describe('when isFirstSelectionRowSelected is undefined', () => {
          beforeAll(() => {
            component.isFirstSelectionRowSelected = undefined;
            component.rowsSelectedByFieldName = 'ROW_IS_SELECTED';
            isRowSelected = component.data[index][component.rowsSelectedByFieldName];
            component.onSelection(index);
          });

          it('should set the isFirstSelectionRowSelected variable', () => {
            expect(component.isFirstSelectionRowSelected).toEqual(isRowSelected);
          });
        });

        describe('when isFirstSelectionRowSelected is defined', () => {
          beforeAll(() => {
            component.isFirstSelectionRowSelected = true;
            isRowSelected = false;
            component.onSelection(index);
          });

          it('should not change the value of isFirstSelectionRowSelected variable', () => {
            expect(component.isFirstSelectionRowSelected).not.toEqual(isRowSelected);
          });
        });

        describe('when looking at current selection index', () => {
          beforeAll(() => {
            component.selectionCurrentRowIndex = -1;
            component.onSelection(index);
          });

          it('should set current row index', () => {
            expect(component.selectionCurrentRowIndex).toEqual(index);
          });
        });

      });

      describe('when mouse down is false', () => {
        beforeAll(() => {
          component.mouseDown = false;
          component.selectionCurrentRowIndex = -1;
          component.onSelection(index);
        });

        it('should not set current row index', () => {
          expect(component.selectionCurrentRowIndex).toEqual(-1);
        });
      });
    });

    describe('when selectRowsWhenDrag is false', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = false;
        selectedRows = component.selectedRows.length;
        component.onSelection(index);
      });

      it('should not add any additional row to the selected rows', () => {
        expect(component.selectedRows.length).toEqual(selectedRows);
      });
    });
  });

  describe('when testing onSelectionEnd', () => {
    let row1,
      row2,
      row3;

    beforeAll(() => {
      row1 = {
        id: 1,
        text: 'text',
        ROW_IS_SELECTED: true
      };
      row2 = {
        id: 2,
        text: 'text',
        ROW_IS_SELECTED: false
      };
      row3 = {
        id: 3,
        text: 'text',
        ROW_IS_SELECTED: true
      };
      component.data = [
        row1,
        row2,
        row3,
      ];
    });

    describe('when selectRowsWhenDrag is true', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = true;
        component.mouseDown = true;
        component.isFirstSelectionRowSelected = true;
        component.selectionStartRowIndex = 0;
        component.selectionEndRowIndex = -1;
        component.selectionCurrentRowIndex = 2;
        component.onSelectionEnd();
      });

      it('should set mouse down as false', () => {
        expect(component.mouseDown).toEqual(false);
      });

      it('should have reset isFirstSelectionRowSelected', () => {
        expect(component.isFirstSelectionRowSelected).toBeUndefined();
      });

      it('should have reset selectionCurrentRowIndex', () => {
        expect(component.selectionCurrentRowIndex).toEqual(-1);
      });
    });

    describe('when selectRowsWhenDrag is true and selectionStartRowIndex is not -1', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = true;
        component.mouseDown = true;
        component.isFirstSelectionRowSelected = true;
        component.selectionStartRowIndex = 0;
        component.selectionEndRowIndex = -1;
        component.selectionCurrentRowIndex = 2;
        component.selectedRows = [];
        component.onSelectionEnd();
      });

      it('should have selected the rows', () => {
        expect(component.selectedRows).toEqual(component.data);
      });
    });


    describe('when selectRowsWhenDrag is true and selectionStartRowIndex is not -1', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = true;
        component.mouseDown = true;
        component.isFirstSelectionRowSelected = true;
        component.selectionStartRowIndex = component.selectionEndRowIndex = component.selectionCurrentRowIndex = -1;
        component.selectedRows = [];
        component.onSelectionEnd();
      });

      it('should have not selected the rows', () => {
        expect(component.selectedRows).toEqual([]);
      });
    });

    describe('when selectRowsWhenDrag is false', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = false;
        component.mouseDown = true;
        component.onSelectionEnd();
      });

      it('should not change value of mouse down', () => {
        expect(component.mouseDown).toEqual(true);
      });
    });
  });

  describe('when testing repositionSelectionRectangular', () => {
    let mouseEvent = {
      clientX: 100,
      clientY: 200
    } as unknown as MouseEvent;

    beforeAll(() => {
      component.selectionBoxLeftStart = 0;
      component.selectionBoxTopStart = 0;
      component.repositionSelectionRectangular(mouseEvent);
    });

    it('should set selectionBoxLeftStart', () => {
      expect(component.selectionBoxLeftStart).toEqual(mouseEvent.clientX);
    });

    it('should set selectionBoxTopStart', () => {
      expect(component.selectionBoxTopStart).toEqual(mouseEvent.clientY);
    });
  });

  describe('when testing getSelectionAreaStyle', () => {
    beforeAll(() => {
      component.selectionBoxTop = 50;
      component.selectionBoxLeft = 60;
      component.selectionBoxWidth = 70;
      component.selectionBoxHeight = 80;
    });

    it('should set selectionBoxLeftStart', () => {
      expect(component.getSelectionAreaStyle()).toEqual(
        {
          top: '50px',
          left: '60px',
          width: '70px',
          height: '80px'
        }
      );
    });
  });

  describe('when testing onDrawSelectionAreaStart', () => {
    let mouseEvent = {
      clientX: 100,
      clientY: 200
    } as unknown as MouseEvent;

    describe('when selectRowsWhenDrag is true', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = true;
        component.selectionBoxLeftStart = 0;
        component.selectionBoxTopStart = 0;
        component.mouseDown = false;
        component.onDrawSelectionAreaStart(mouseEvent);
      });

      it('should set mouse down as true', () => {
        expect(component.mouseDown).toEqual(true);
      });

      it('should set selectionBoxLeftStart', () => {
        expect(component.selectionBoxLeftStart).toEqual(mouseEvent.clientX);
      });

      it('should set selectionBoxTopStart', () => {
        expect(component.selectionBoxTopStart).toEqual(mouseEvent.clientY);
      });
    });

    describe('when selectRowsWhenDrag is false', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = false;
        component.selectionBoxLeftStart = 0;
        component.selectionBoxTopStart = 0;
        component.mouseDown = false;
        component.onDrawSelectionAreaStart(mouseEvent);
      });

      it('should not change mouse down variable', () => {
        expect(component.mouseDown).toEqual(false);
      });

      it('should not set selectionBoxLeftStart', () => {
        expect(component.selectionBoxLeftStart).toEqual(0);
      });

      it('should set selectionBoxTopStart', () => {
        expect(component.selectionBoxTopStart).toEqual(0);
      });
    });
  });

  describe('when testing drawSelectionArea', () => {
    let mouseEvent = {
      clientX: 100,
      clientY: 200
    } as unknown as MouseEvent;

    describe('when selectRowsWhenDrag and mouseDown are true', () => {
      describe('when mouse x coordinate is smaller than the initial start x point', () => {
        beforeAll(() => {
          component.selectRowsWhenDrag = component.mouseDown = true;
          component.selectionBoxLeftStart = 200;
          component.selectionBoxLeft = 0;
          component.selectionBoxWidth = 0;
          component.drawSelectionArea(mouseEvent);

        });

        it('should set selectionBoxLeft to the mouse x coordinate', () => {
          expect(component.selectionBoxLeft).toEqual(mouseEvent.clientX);
        });

        it('should set a width selectionBoxWidth', () => {
          expect(component.selectionBoxWidth).toBeGreaterThan(0);
        });
      });

      describe('when mouse x coordinate is bigger than the initial start x point', () => {
        beforeAll(() => {
          component.selectRowsWhenDrag = component.mouseDown = true;
          component.selectionBoxLeftStart = 50;
          component.selectionBoxLeft = 0;
          component.selectionBoxWidth = 0;
          component.drawSelectionArea(mouseEvent);

        });

        it('should set selectionBoxLeft to selectionBoxLeftStart', () => {
          expect(component.selectionBoxLeft).toEqual(component.selectionBoxLeftStart);
        });

        it('should set a width selectionBoxWidth', () => {
          expect(component.selectionBoxWidth).toBeGreaterThan(0);
        });
      });

      describe('when mouse y coordinate is smaller than the initial start y point', () => {
        beforeAll(() => {
          component.selectRowsWhenDrag = component.mouseDown = true;
          component.selectionBoxTopStart = 400;
          component.selectionBoxTop = 0;
          component.selectionBoxHeight = 0;
          component.drawSelectionArea(mouseEvent);

        });

        it('should set selectionBoxTop to the mouse x coordinate', () => {
          expect(component.selectionBoxTop).toEqual(mouseEvent.clientY);
        });

        it('should set a width selectionBoxHeight', () => {
          expect(component.selectionBoxHeight).toBeGreaterThan(0);
        });
      });

      describe('when mouse y coordinate is bigger than the initial start y point', () => {
        beforeAll(() => {
          component.selectRowsWhenDrag = component.mouseDown = true;
          component.selectionBoxTopStart = 100;
          component.selectionBoxTop = 0;
          component.selectionBoxHeight = 0;
          component.drawSelectionArea(mouseEvent);

        });

        it('should set selectionBoxTop to selectionBoxTopStart', () => {
          expect(component.selectionBoxTop).toEqual(component.selectionBoxTopStart);
        });

        it('should set a width selectionBoxHeight', () => {
          expect(component.selectionBoxHeight).toBeGreaterThan(0);
        });
      });
    });

    describe('when selectRowsWhenDrag is false', () => {
      beforeAll(() => {
        component.selectRowsWhenDrag = component.mouseDown = false;
        component.selectionBoxLeft = component.selectionBoxWidth = component.selectionBoxTop = component.selectionBoxHeight = 0;
        component.drawSelectionArea(mouseEvent);
      });

      it('should not change the value of selectionBoxLeft', () => {
        expect(component.selectionBoxLeft).toEqual(0);
      });

      it('should not change the value of selectionBoxWidth', () => {
        expect(component.selectionBoxWidth).toEqual(0);
      });

      it('should not change the value of selectionBoxTop', () => {
        expect(component.selectionBoxTop).toEqual(0);
      });

      it('should not change the value of selectionBoxHeight', () => {
        expect(component.selectionBoxHeight).toEqual(0);
      });
    });
  });

  describe('when testing resetSelectionAreaValues', () => {
    beforeAll(() => {
      component.selectionBoxTopStart = 100;
      component.selectionBoxLeftStart = 200;
      component.selectionBoxLeft = 300;
      component.selectionBoxTop = 400;
      component.selectionBoxWidth = 500;
      component.selectionBoxHeight = 600;

      component.selectionStartRowIndex = 1;
      component.selectionCurrentRowIndex = 2;
      component.selectionEndRowIndex = 3;

      component.resetSelectionAreaValues();
    });

    it('should set selectionBoxTopStart to 0', () => {
      expect(component.selectionBoxTopStart).toEqual(0);
    });

    it('should set selectionBoxLeftStart to 0', () => {
      expect(component.selectionBoxLeftStart).toEqual(0);
    });

    it('should set selectionBoxLeft to 0', () => {
      expect(component.selectionBoxLeft).toEqual(0);
    });

    it('should set selectionBoxTop to 0', () => {
      expect(component.selectionBoxTop).toEqual(0);
    });

    it('should set selectionBoxWidth to 0', () => {
      expect(component.selectionBoxWidth).toEqual(0);
    });

    it('should set selectionBoxHeight to 0', () => {
      expect(component.selectionBoxHeight).toEqual(0);
    });

    it('should set selectionStartRowIndex to -1', () => {
      expect(component.selectionStartRowIndex).toEqual(-1);
    });

    it('should set selectionCurrentRowIndex to -1', () => {
      expect(component.selectionCurrentRowIndex).toEqual(-1);
    });

    it('should set selectionEndRowIndex to -1', () => {
      expect(component.selectionEndRowIndex).toEqual(-1);
    });
  });

  describe('when testing setSelectionStartAndEndRowIndex', () => {
    describe('when selectionStartRowIndex and selectionCurrentRowIndex have initial value -1 and selectionEndRowIndex is not -1', () => {
      beforeAll(() => {
        component.selectionStartRowIndex = -1;
        component.selectionEndRowIndex = 2;
        component.selectionCurrentRowIndex = -1;
        component.setSelectionStartAndEndRowIndex();
      });

      it('should set selectionStartRowIndex to value of selectionEndRowIndex', () => {
        expect(component.selectionStartRowIndex).toEqual(component.selectionEndRowIndex);
      });
    });

    describe('when selectionEndRowIndex and selectionCurrentRowIndex have initial value -1 and selectionStartRowIndex is not -1', () => {
      beforeAll(() => {
        component.selectionStartRowIndex = 2;
        component.selectionEndRowIndex = -1;
        component.selectionCurrentRowIndex = -1;
        component.setSelectionStartAndEndRowIndex();
      });

      it('should set selectionEndRowIndex to value of selectionStartRowIndex', () => {
        expect(component.selectionEndRowIndex).toEqual(component.selectionStartRowIndex);
      });
    });

    describe('when selectionStartRowIndex is smaller than selectionCurrentRowIndex', () => {
      beforeAll(() => {
        component.selectionStartRowIndex = 1;
        component.selectionEndRowIndex = -1;
        component.selectionCurrentRowIndex = 3;
        component.setSelectionStartAndEndRowIndex();
      });

      it('should set selectionEndRowIndex to value of selectionStartRowIndex', () => {
        expect(component.selectionEndRowIndex).toEqual(component.selectionCurrentRowIndex);
      });
    });

    describe('when selectionStartRowIndex is bigger than selectionCurrentRowIndex', () => {
      beforeAll(() => {
        component.selectionStartRowIndex = 3;
        component.selectionEndRowIndex = -1;
        component.selectionCurrentRowIndex = 1;
        component.setSelectionStartAndEndRowIndex();
      });

      it('should set selectionEndRowIndex to 3', () => {
        expect(component.selectionEndRowIndex).toEqual(3);
      });

      it('should set selectionStartRowIndex to 1', () => {
        expect(component.selectionStartRowIndex).toEqual(1);
      });
    });
  });

  describe('when testing setCurrentRowIndex', () => {
    let index = 1;

    describe('when selectionStartRowIndex is -1', () => {
      beforeAll(() => {
        component.selectionStartRowIndex = -1;
        component.setCurrentRowIndex(index);
      });

      it('should set selectionStartRowIndex to current index', () => {
        expect(component.selectionStartRowIndex).toEqual(index);
      });
    });

    describe('when selectionStartRowIndex is not -1', () => {
      beforeAll(() => {
        component.selectionStartRowIndex = 2;
        component.setCurrentRowIndex(index);
      });

      it('should not change selectionStartRowIndex value', () => {
        expect(component.selectionStartRowIndex).toEqual(2);
      });
    });

    describe('when looking at selectionCurrentRowIndex', () => {
      it('should set selectionCurrentRowIndex to current index', () => {
        expect(component.selectionCurrentRowIndex).toEqual(index);
      });
    });
  });
});
