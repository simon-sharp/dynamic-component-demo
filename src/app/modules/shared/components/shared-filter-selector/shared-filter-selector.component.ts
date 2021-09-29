import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Filter} from '../../model/filter.class';

@Component({
  selector: 'app-shared-filter-selector',
  templateUrl: 'shared-filter-selector.component.html',
  styleUrls: ['./shared-filter-selector.component.scss']
})
export class SharedFilterSelectorComponent {
  @Input()
  public filter: Filter = new Filter();

  @Output()
  save: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  delete: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter<any>();

  public setFilter(): void {
    if (this.save) {
      this.save.emit();
    }
  }

  public deleteFilter(): void {
    if (this.delete) {
      this.delete.emit();
    }
  }

  public cancelEdit(): void {
    if (this.cancel) {
      this.cancel.emit();
    }
  }
}
