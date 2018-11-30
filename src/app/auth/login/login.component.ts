import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'hab-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginModel = {};

  constructor(private router: Router) {}

  login(form: NgForm) {
    if (form.valid) {
      // TODO: Login user
      console.log('login() - ', form.value);
      this.router.navigate(['/dashboard']);
    }
  }
}
