import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[snNullDefault], textarea[snNullDefault]'
})
export class NullDefaultDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('change', ['$event.target'])
  onInput(target: HTMLInputElement) {
    if (target.value === '') {
      this.ngControl.control.setValue(null);
    }
  }
}
