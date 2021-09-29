import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CheckboxStateEnum} from '../../model/checkbox-state.enum';
import {IconTypeEnum} from '../../model/icon-type.enum';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shared-checkbox',
  templateUrl: './shared-checkbox.component.html'
})
export class SharedCheckboxComponent {
  @Input()
  public checked: CheckboxStateEnum = CheckboxStateEnum.NONE;

  @Input()
  public hasThreeStates: boolean = false;

  @Output()
  public valueChanged: EventEmitter<CheckboxStateEnum> = new EventEmitter<CheckboxStateEnum>();

  public getIcon(): RegularIcons.IconDefinition | SolidIcons.IconDefinition {
    switch (this.checked) {
      case CheckboxStateEnum.NONE:
        return this.getUncheckedIcon();
      case CheckboxStateEnum.CHECKED:
        return this.getCheckedIcon();
      case CheckboxStateEnum.ALL_CHECKED:
        return this.getAllCheckedIcon();
      default:
        return this.getUncheckedIcon();
    }
  }

  public getCheckedIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faCheckSquare;
  }

  public getUncheckedIcon(): RegularIcons.IconDefinition {
    return RegularIcons.faSquare;
  }

  public getAllCheckedIcon(): RegularIcons.IconDefinition {
    return RegularIcons.faMinusSquare;
  }

  public onCheckboxClick(): void {
    switch (this.checked) {
      case CheckboxStateEnum.NONE:
        this.checked = CheckboxStateEnum.CHECKED;

        break;
      case CheckboxStateEnum.CHECKED:
        if (this.hasThreeStates) {
          this.checked = CheckboxStateEnum.ALL_CHECKED;
        } else {
          this.checked = CheckboxStateEnum.NONE;
        }

        break;
      case CheckboxStateEnum.ALL_CHECKED:
        this.checked = CheckboxStateEnum.NONE;

        break;
      default:
        this.checked = CheckboxStateEnum.NONE;
    }

    if (this.valueChanged) {
      this.valueChanged.emit(this.checked);
    }
  }

  public getIconType(): IconTypeEnum {
    return IconTypeEnum.FONT_AWESOME;
  }
}
