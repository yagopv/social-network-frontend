import { AbstractControl } from '@angular/forms';

export function MatchPasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } {
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
