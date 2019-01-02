import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, AbstractControl } from '@angular/forms';

import { LoginModel } from './login.model';
import { Store } from '@ngxs/store';
import { Login } from 'app/auth/auth.state';

@Component({
  selector: 'hab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginModel: LoginModel = new LoginModel();

  constructor(private router: Router, private store: Store) {}

  login(form: NgForm) {
    if (!form.valid) {
      this.markControlsAsTouched(form.controls);
      return;
    }

    console.log('login() - ', form.value);
    this.store.dispatch(new Login(form.value));
  }

  private markControlsAsTouched(controls: { [key: string]: AbstractControl }) {
    Object.values(controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
