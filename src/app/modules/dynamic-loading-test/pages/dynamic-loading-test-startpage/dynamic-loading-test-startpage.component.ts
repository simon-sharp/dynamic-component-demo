import {Component, ComponentFactoryResolver, ComponentRef, ViewContainerRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DynamicLoadingTestLoadedComponent} from '../../components/dynamic-loading-test-loaded/dynamic-loading-test-loaded.component';

@Component({
  selector: 'sso-dynamic-loading-test-startpage',
  templateUrl: './dynamic-loading-test-startpage.component.html',
})
export class DynamicLoadingTestStartpageComponent {
  private componentRef: ComponentRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
  }

  public openDialog(): void {
    this.componentRef = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(
        DynamicLoadingTestLoadedComponent
      )
    );

    this.componentRef.instance.text = 'Cowabunga';
  }
}
