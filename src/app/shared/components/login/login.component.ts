import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, takeUntil } from 'rxjs/operators';

import { MailValidator } from '../../validators/mail.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

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
    private authService: AuthService,
    private userStore: UserService
  ) {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
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
        this.userStore.getUserProfile().subscribe();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}