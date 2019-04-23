import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
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

  @Input() snIf: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.snIf.currentValue) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
