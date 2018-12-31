import { Component } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store/reducer';
import { Login } from 'app/auth/store/actions';

@Component({
  selector: 'hab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginModel: LoginModel = new LoginModel();

  constructor(
    private router: Router,
    private store: Store<fromAuth.AuthState>
  ) {}

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
