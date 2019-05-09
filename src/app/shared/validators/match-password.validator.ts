import { FormControl, FormGroup } from '@angular/forms';

export function MatchPasswordValidator(
  group: FormGroup
): { [key: string]: boolean } {
  {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
