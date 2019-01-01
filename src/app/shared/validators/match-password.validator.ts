import { AbstractControl } from '@angular/forms';

export function MatchPasswordValidator(control: AbstractControl) {
  {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
