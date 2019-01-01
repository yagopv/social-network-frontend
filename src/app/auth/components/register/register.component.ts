import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MailValidator } from 'app/shared/validators/mail.validator';
import { Router } from '@angular/router';
import { MatchPasswordValidator } from '../../../shared/validators/match-password.validator';
import * as fromAuth from '../../store/reducer';
import { Store } from '@ngrx/store';
import { Register } from 'app/auth/store/actions';
import { RegisterModel } from '../../models/register.model';

@Component({
  selector: 'hab-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    { validator: MatchPasswordValidator }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<fromAuth.AuthState>
  ) {
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const { email, password } = this.registerForm.value;

    console.log('register() - ', this.registerForm.value);
    this.store.dispatch(new Register({ email, password }));
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
