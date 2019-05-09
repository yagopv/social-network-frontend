import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MailValidator } from '../../validators/mail.validator';
import { MatchPasswordValidator } from '../../validators/match-password.validator';
import { EmailExistValidator } from '../../validators/email-exist.validator';
import { ModalService } from '../../../core/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

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
    private emailValidator: EmailExistValidator,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    const { fullName, email, password } = this.registerForm.value;

    this.authService
      .register({
        fullName,
        email,
        password
      })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.registerForm.reset();
        this.modalService.open(
          'Registration finished',
          'Now, go to your email app and click on the provided link for activate your account'
        );
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
