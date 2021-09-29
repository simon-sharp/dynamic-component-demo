import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Paging} from '../../model/paging.class';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shared-page-browser',
  templateUrl: './shared-page-browser.component.html',
  styleUrls: ['./shared-page-browser.component.scss']
})
export class SharedPageBrowserComponent implements OnInit {
  @Input()
  public paging: Paging = new Paging();

  @Output()
  public pagingChange: EventEmitter<Paging> = new EventEmitter<Paging>();

  public numberOfPages?: number;
  public currentPage?: number;

  public ngOnInit(): void {
    this.initPagingObject();
    this.calculateNumberOfPages();
    this.calculateCurrentPage();
  }

  public initPagingObject(): void {
    if (!this.paging) {
      this.paging = new Paging(0, 10, 0);
    }
  }

  public calculateNumberOfPages(): void {
    if (this.paging) {
      this.numberOfPages = Math.ceil(this.paging.total / this.paging.take);
    } else {
      this.numberOfPages = 0;
    }
  }

  public getEndOfDisplayRange(): number {
    if (this.paging.getSkip() + this.paging.getTake() > this.paging.getTotal()) {
      return this.paging.getTotal();
    }

    return this.paging.getSkip() + this.paging.getTake();
  }

  public calculateCurrentPage(): void {
    this.currentPage = Math.floor(this.paging.skip / this.paging.take) + 1;
  }

  public jumpToFirstPage(): void {
    this.paging.setSkip(0);
    this.pagingChange.emit(this.paging);
  }

  public jumpToLastPage(): void {
    this.paging.setSkip(this.paging.getTake() * Math.floor(this.paging.getTotal() / this.paging.getTake()));
    this.pagingChange.emit(this.paging);
  }

  public goNPagesForward(pages: number): void {
    let newVal = this.paging.getSkip() + (this.paging.getTake() * pages);

    if (newVal <= this.paging.getTotal()) {
      this.paging.setSkip(newVal);
      this.pagingChange.emit(this.paging);
    }
  }

  public goNPagesBackwards(pages: number): void {
    let newVal = this.paging.getSkip() - (this.paging.getTake() * pages);

    if (newVal >= 0) {
      this.paging.setSkip(newVal);
      this.pagingChange.emit(this.paging);
    }
  }

  public showMinusNPagesButton(minusPages: number): boolean {
    if (minusPages === 0 || this.paging.getSkip() === 0) {
      return false;
    }

    return this.paging.getSkip() >= minusPages * this.paging.getTake();
  }

  public showPlusNPagesButton(plusPages: number): boolean {
    if (plusPages === 0) {
      return false;
    }

    return this.paging.getTotal() >= (plusPages * this.paging.getTake()) + this.paging.getSkip();
  }

  public getGoToStartIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faAngleDoubleLeft;
  }

  public getPreviousIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faAngleLeft;
  }

  public getNextIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faAngleRight;
  }

  public getGoToEndIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faAngleDoubleRight;
  }
}
