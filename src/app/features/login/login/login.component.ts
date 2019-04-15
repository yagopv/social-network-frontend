import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl
} from '@angular/forms';

import { MailValidator } from '../../../shared/validators/mail.validator';
import { AuthStore } from '../../../core/store/auth.store';
import { UserStore } from '../../../core/store/user.store';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );
  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private userStore: UserStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login() {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.authStore
      .login(this.loginForm.value)
      .pipe(
        catchError(error => {
          this.loginForm.get('password').setValue('');
          return error;
        })
      )
      .subscribe(() => {
        const returnUrl = this.route.queryParams['return-url'];
        this.router.navigate([returnUrl || '/wall']);
        this.userStore.getProfile().subscribe();
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
