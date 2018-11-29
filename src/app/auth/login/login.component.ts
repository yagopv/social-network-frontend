import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MailValidator } from 'app/shared/validators/mail.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'hab-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, MailValidator]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm.valueChanges.subscribe(value => console.log(value));
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // TODO: Login user
      console.log('login() - ', formData);
      this.router.navigate(['/dashboard']);
    }
  }
}
