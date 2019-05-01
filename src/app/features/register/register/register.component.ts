import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MailValidator } from '../../../shared/validators/mail.validator';
import { MatchPasswordValidator } from '../../../shared/validators/match-password.validator';
import { EmailExistValidator } from '../../../shared/validators/email-exist.validator';
import { AuthStore } from '../../../core/store/auth.store';
import { ModalService } from '../../../core/services/modal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private authStore: AuthStore,
    private modalService: ModalService
  ) {}

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    const { fullName, email, password } = this.registerForm.value;

    this.authStore
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
