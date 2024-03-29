import { FormControl } from '@angular/forms';

export function MailValidator(
  control: FormControl
): { [key: string]: boolean } {
  const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  if (
    control.value &&
    (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))
  ) {
    return { malformedMail: true };
  }

  return null;
}
