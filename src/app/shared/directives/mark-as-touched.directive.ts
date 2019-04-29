import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[snMarkAsTouched]'
})
export class MarkAsTouchedDirective {
  @Input() snMarkAsTouched: FormGroup;

  @HostListener('submit', ['$event'])
  onSubmit(event) {
    Object.values(this.snMarkAsTouched.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
