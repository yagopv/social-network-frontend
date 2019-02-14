import { Component, OnInit } from '@angular/core';
import { NgForm, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, Select, Actions, ofAction } from '@ngxs/store';

import { LoginModel } from './login.model';
import { ErrorState } from '../../../error/store/error.state';
import { Login, LoginFailed } from '../../store/auth.actions';
import { withLatestFrom } from 'rxjs/operators';
import { Error } from '../../../error/models/error.model';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(ErrorState) errors$: Observable<Error>;
  loginModel: LoginModel = new LoginModel();

  constructor(private actions$: Actions, private store: Store) {}

  ngOnInit() {
    this.actions$.pipe(ofAction(LoginFailed)).subscribe(() => {
      this.loginModel.password = '';
    });
  }

  login(form: NgForm) {
    if (!form.valid) {
      this.markControlsAsTouched(form.controls);
      return;
    }

    this.store.dispatch(new Login(form.value));
  }

  private markControlsAsTouched(controls: { [key: string]: AbstractControl }) {
    Object.values(controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
