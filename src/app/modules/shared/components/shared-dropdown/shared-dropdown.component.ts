import {Component, HostListener, Input, ViewChild} from '@angular/core';
import {IconTypeEnum} from '../../model/icon-type.enum';
import {DynamicComponent} from '../../model/dynamic-component.class';

@Component({
  selector: 'app-shared-dropdown',
  templateUrl: './shared-dropdown.component.html',
  styleUrls: ['./shared-dropdown.component.scss']
})
export class SharedDropdownComponent {
  @Input()
  public title = '';

  @Input()
  public active: boolean = true;

  @Input()
  public iconType: IconTypeEnum = IconTypeEnum.FONT_AWESOME;

  @Input()
  public icon: any;

  @Input()
  public dropdownComponents: DynamicComponent<any>[] = [];

  @Input()
  public showIconLeftOfText: boolean = false;

  @Input()
  public dropdownOpensToTheLeft: boolean = false;

  @Input()
  public dropdownOffset: number = 0;

  public showDropdown: boolean = false;

  @ViewChild('sharedDropdownComponent') sharedDropdownComponent: any;
  @ViewChild('sharedDropdownList') sharedDropdownList: any;

  @HostListener('document:click', ['$event'])
  public hideDropdown(event: any): void {
    if (
      !this.sharedDropdownComponent.nativeElement.contains(event.target)
      || (
        this.sharedDropdownList
        && this.sharedDropdownList.nativeElement.contains(event.target)
      )
    ) {
      this.showDropdown = false;
    }
  }

  public toggleDropdown(): void {
    if (this.active) {
      this.showDropdown = !this.showDropdown;
    } else {
      this.showDropdown = false;
    }
  }

  public getComponentsOffsetStyle(): any {
    let returnValue: any = {};

    if (this.dropdownOpensToTheLeft) {
      returnValue.right = this.dropdownOffset + 'px';
    } else {
      returnValue.left = this.dropdownOffset + 'px';
    }

    return returnValue;
  }

  public getButtonCss(): { [key: string]: boolean } {
    let returnValue: { [key: string]: boolean } = {};

    returnValue['shared-dropdown__toggle-button--is-active'] = this.active;
    returnValue['shared-dropdown__toggle-button--is-inactive'] = !this.active;

    return returnValue;
  }
}
