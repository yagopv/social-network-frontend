import {
  Directive,
  Input,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[snIf]'
})
export class IfDirective implements OnChanges {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() snIf;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.snIf.currentValue) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  // @Input()
  // set snIf(condition: boolean) {
  //   if (condition) {
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   } else {
  //     this.viewContainer.clear();
  //   }
  // }
}
