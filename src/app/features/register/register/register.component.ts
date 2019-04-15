import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MailValidator } from '../../../shared/validators/mail.validator';
import { MatchPasswordValidator } from '../../../shared/validators/match-password.validator';
import { EmailExistValidator } from '../../../shared/validators/email-exist.validator';
import { AuthStore } from '../../../core/store/auth.store';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'sn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
  ) {
    // Sample observable showing values
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const { fullName, email, password } = this.registerForm.value;

    this.authStore
      .register({
        fullName,
        email,
        password
      })
      .subscribe(() => {
        this.registerForm.reset();
        this.modalService.open(
          'Registration finished',
          'Now, go to your email app and click on the provided link for activate your account',
          {
            variant: 'primary',
            label: 'Ok',
            action: () => this.modalService.close()
          }
        );
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
