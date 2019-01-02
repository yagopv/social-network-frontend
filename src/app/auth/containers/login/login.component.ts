import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, AbstractControl } from '@angular/forms';

import { LoginModel } from './login.model';
import { Store, Select } from '@ngxs/store';
import { Login } from 'app/auth/auth.state';
import { Observable } from 'rxjs';
import { ErrorModel } from 'app/error/error.model';
import { ErrorState, ResetErrors } from '../../../error/error.state';

@Component({
  selector: 'hab-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Select(ErrorState) errors$: Observable<ErrorModel>;
  loginModel: LoginModel = new LoginModel();

  constructor(private router: Router, private store: Store) {}

  login(form: NgForm) {
    if (!form.valid) {
      this.markControlsAsTouched(form.controls);
      return;
    }

    this.store.dispatch(new Login(form.value));
  }

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  private markControlsAsTouched(controls: { [key: string]: AbstractControl }) {
    Object.values(controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
