import {Component, Input} from '@angular/core';
import {IconTypeEnum} from '../../model/icon-type.enum';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {IconBootstrapTypeEnum} from '../../model/icon-bootstrap-type.enum';

@Component({
  selector: 'app-shared-icon',
  templateUrl: './shared-icon.component.html',
  styleUrls: [
    './shared-icon.component.scss'
  ]
})
export class SharedIconComponent {
  @Input()
  public icon: any = SolidIcons.faHome;

  @Input()
  public iconType: IconTypeEnum = IconTypeEnum.FONT_AWESOME;

  @Input()
  public description: string = '';

  public getFontAwesomeIcon(): IconProp {
    return this.icon;
  }

  public getBootstrapIcon(): { [key: string]: boolean } {
    let returnValue: { [key: string]: boolean } = {};

    returnValue['glyphicon-' + this.getBootstrapIconName()] = true;

    return returnValue;
  }

  public getBootstrapIconName(): string {
    switch (this.icon) {
      case IconBootstrapTypeEnum.HOME:
        return 'home';
      case IconBootstrapTypeEnum.CONFIG:
        return 'wrench';
      case IconBootstrapTypeEnum.JOBS:
        return 'briefcase';
      case IconBootstrapTypeEnum.LOG:
        return 'check';
      case IconBootstrapTypeEnum.SEARCH:
        return 'search';
      case IconBootstrapTypeEnum.UPLOAD:
        return 'upload';
      default:
        return 'home';
    }
  }

  public isFontAwesomeIcon(): boolean {
    return this.iconType === IconTypeEnum.FONT_AWESOME;
  }

  public isBootstrapIcon(): boolean {
    return this.iconType === IconTypeEnum.BOOTSTRAP;
  }
}
