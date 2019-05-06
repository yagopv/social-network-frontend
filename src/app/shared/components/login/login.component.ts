import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { catchError, takeUntil } from 'rxjs/operators';

import { MailValidator } from '../../validators/mail.validator';
import { AuthStore } from '../../../core/store/auth.store';
import { UserStore } from '../../../core/store/user.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, MailValidator]],
      password: ['', [Validators.required]]
    },
    { updateOn: 'blur' }
  );
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authStore: AuthStore,
    private userStore: UserStore
  ) {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authStore
      .login(this.loginForm.value)
      .pipe(
        takeUntil(this.unsubscribe$),
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
