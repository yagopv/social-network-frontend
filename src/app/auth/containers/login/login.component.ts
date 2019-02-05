import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { LoginModel } from './login.model';
import { ErrorState } from '../../../error/store/error.state';
import { Login } from '../../store/auth.actions';
import { withLatestFrom } from 'rxjs/operators';
import { Error } from '../../../error/models/error.model';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Select(ErrorState) errors$: Observable<Error>;
  loginModel: LoginModel = new LoginModel();

  constructor(private route: ActivatedRoute, private store: Store) {}

  login(form: NgForm) {
    if (!form.valid) {
      this.markControlsAsTouched(form.controls);
      return;
    }

    this.store.dispatch(new Login(form.value)).subscribe(state => {
      if (state.errors.length) {
        this.loginModel.password = '';
      }
    });
  }

  private markControlsAsTouched(controls: { [key: string]: AbstractControl }) {
    Object.values(controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
