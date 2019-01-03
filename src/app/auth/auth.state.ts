import { LoginModel } from './containers/login/login.model';
import { AuthUserModel } from './models/auth-user.model';
import { RegisterModel } from './models/register.model';
import { State, Action, StateContext } from '@ngxs/store';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { NgZone } from '@angular/core';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginModel) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public payload: AuthUserModel) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
}

export class Register {
  static type = '[Auth] Register';
  constructor(public payload: RegisterModel) {}
}

export class RegisterSuccess {
  static type = '[Auth] RegisterSuccess';
}

export class RegisterFailed {
  static type = '[Auth] RegisterFailed';
}

export interface AuthStateModel {
  currentUser: AuthUserModel;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    currentUser: null
  }
})
export class AuthState {
  constructor(private authService: AuthService, public ngZone: NgZone) {}

  // ngxs will subscribe to the post observable for you if you return it from the action
  @Action(Login)
  login({ dispatch }: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap(data => dispatch(new LoginSuccess(data))),
      catchError(() => dispatch(new LoginFailed()))
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ dispatch }: StateContext<AuthStateModel>) {
    // Use ngxs Action or going to fail because running outside NgZone
    dispatch(new Navigate(['/dashboard/home']));
  }

  @Action(Register)
  register({ dispatch }: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload).pipe(
      tap(() => dispatch(new RegisterSuccess())),
      catchError(() => dispatch(new RegisterFailed()))
    );
  }
}
