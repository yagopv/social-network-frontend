import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[snNullDefault], textarea[snNullDefault]'
})
export class NullDefaultDirective {
  // NgControl: A base class that all control FormControl-based directives extend. It binds a FormControl object to a DOM element
  // Cannot use FormControl here because is not injectable
  constructor(private ngControl: NgControl) {}

  @HostListener('change', ['$event.target'])
  onInput(target: HTMLInputElement) {
    if (target.value === '') {
      this.ngControl.control.setValue(null);
    }
  }
}
