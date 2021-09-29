import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-shared-text-click',
  templateUrl: './shared-text-click.component.html',
  styleUrls: ['./shared-text-click.component.scss']
})

export class SharedTextClickComponent {
  @Input()
  public text: string = 'standardtext';

  @Input()
  public emitValue: any;

  @Input()
  public emitTextIfValueIsNotPresent: boolean = false;

  @Input()
  public cssClasses: any = {};

  @Output()
  public clickedText: EventEmitter<string> = new EventEmitter<string>();

  public onClick(): void {
    if (this.emitTextIfValueIsNotPresent && !(this.emitValue)) {
      this.clickedText.emit(this.text);
    } else if (!!(this.emitValue)) {
      this.clickedText.emit(this.emitValue);
    } else {
      this.clickedText.emit(undefined);
    }
  }
}
