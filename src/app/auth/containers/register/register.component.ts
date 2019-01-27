import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { MailValidator } from '../../../shared/validators/mail.validator';
import { MatchPasswordValidator } from '../../../shared/validators/match-password.validator';
import { ErrorState } from '../../../error/store/error.state';
import { Error } from '../../../error/models/error.model';
import { Register } from '../../store/auth.actions';
import { ResetErrors } from '../../../error/store/error.actions';

@Component({
  selector: 'hab-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Select(ErrorState) errors$: Observable<Error>;
  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    { validator: MatchPasswordValidator, updateOn: 'blur' }
  );

  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const { fullName, email, password } = this.registerForm.value;
    this.store.dispatch(
      new Register({
        fullName,
        email,
        password
      })
    );
  }

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
