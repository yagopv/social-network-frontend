import { Component, OnInit } from '@angular/core';
import { Store, Select, ofAction, Actions } from '@ngxs/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { MailValidator } from '../../validators/mail.validator';
import { MatchPasswordValidator } from '../../validators/match-password.validator';
import { EmailExistValidator } from '../../validators/email-exist.validator';
import { ErrorState } from '../../../error/store/error.state';
import { Error } from '../../../error/models/error.model';
import { Register, RegisterSuccess } from '../../store/auth.actions';

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Select(ErrorState) errors$: Observable<Error>;
  registerForm = this.fb.group(
    {
      fullName: ['', [Validators.required]],
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
    private emailValidator: EmailExistValidator
  ) {
    // Sample observable showing values
    // this.registerForm.valueChanges.subscribe(value => console.log(value));
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
    this.store.dispatch(
      new Register({
        fullName,
        email,
        password
      })
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
