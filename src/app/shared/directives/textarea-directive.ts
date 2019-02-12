import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[snTextArea]'
})
export class TextAreaDirective {
  @HostListener('paste', ['$event'])
  onPaste(event: Event) {
    this.autoExpand(this.el.nativeElement);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    this.autoExpand(this.el.nativeElement);
  }

  @HostListener('keyup', ['$event'])
  onKeyup(event: Event) {
    this.autoExpand(this.el.nativeElement);
  }

  constructor(private el: ElementRef) {}

  autoExpand(nativeElement: any) {
    nativeElement.style.height = 'inherit';
    nativeElement.style.height = nativeElement.scrollHeight + 'px';
  }
}
