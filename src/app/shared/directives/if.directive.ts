import {
  Directive,
  Input,
  ElementRef,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[snIf]'
})
export class IfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set snIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
