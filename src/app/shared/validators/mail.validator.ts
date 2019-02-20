import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function MailValidator(
  control: AbstractControl
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

// Another way is to return a validator function. Useful if I need parameters
// And another one is to return a Promise or Observable => For async validation
// ---
// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {'forbiddenName': {value: control.value}} : null;
//   };
// }

@Directive({
  selector: '[snMail]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MailValidatorDirective, multi: true }
  ]
})
export class MailValidatorDirective implements Validator {
  @Input('snMail') mail: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return MailValidator(control);
  }
}
