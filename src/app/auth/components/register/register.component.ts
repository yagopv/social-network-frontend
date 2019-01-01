import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MailValidator } from 'app/shared/validators/mail.validator';
import { Router } from '@angular/router';
import { MatchPasswordValidator } from '../../../shared/validators/match-password.validator';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm.valueChanges.subscribe(value => console.log(value));
  }

  register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const formData = this.registerForm.value;

    console.log('register() - ', formData);
    this.router.navigate(['/dashboard']);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
