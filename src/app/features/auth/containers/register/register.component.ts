import { Component, OnInit } from '@angular/core';
import { Store, Select, ofAction, Actions } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Error } from '../../../../core/models/error.model';
import { Register, RegisterSuccess } from '../../store/auth.actions';
import { MatchPasswordValidator } from '../../../../shared/validators/match-password.validator';
import { MailValidator } from '../../../../shared/validators/mail.validator';
import { EmailExistValidator } from '../../../../shared/validators/email-exist.validator';
import { AuthStore } from '../../../../core/store/auth.store';

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, MailValidator], [this.emailValidator]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: MatchPasswordValidator, updateOn: 'blur' }
  );

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions,
    private emailValidator: EmailExistValidator,
    private authStore: AuthStore
  ) {
    // Sample observable showing values
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  ngOnInit() {
    this.actions$.pipe(ofAction(RegisterSuccess)).subscribe(() => {
      this.registerForm.reset();
    });
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const { fullName, email, password } = this.registerForm.value;
    this.authStore.register({
      fullName,
      email,
      password
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
