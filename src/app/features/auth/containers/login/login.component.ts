import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, Actions, ofAction } from '@ngxs/store';

import { Login, LoginFailed } from '../../store/auth.actions';
import { MailValidator } from '../../../../shared/validators/mail.validator';
import { AuthService } from '../../../../core/http/auth.service';
import { UserStore } from '../../../../core/store/user.store';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthStore } from '../../../../core/store/auth.store';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );
  constructor(
    private fb: FormBuilder,
    private actions$: Actions,
    private authStore: AuthStore
  ) {
    // Sample observable showing values
    this.loginForm.valueChanges.subscribe(value => console.log(value));
  }

  ngOnInit() {
    this.actions$.pipe(ofAction(LoginFailed)).subscribe(() => {
      this.loginForm.get('password').reset();
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.authStore.login(this.loginForm.value);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
