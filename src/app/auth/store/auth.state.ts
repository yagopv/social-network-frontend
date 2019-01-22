import { catchError, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { State, Action, StateContext, Store } from '@ngxs/store';

import { AuthUserModel } from '../models/auth-user.model';
import { AuthService } from '../services/auth.service';
import {
  Login,
  LoginSuccess,
  Register,
  RegisterSuccess,
  RegisterFailed,
  LoginFailed,
  Logout
} from './auth.actions';
import { SetErrors } from '../../error/store/error.actions';

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
  constructor(private store: Store, private authService: AuthService) {}

  // ngxs will subscribe to the post observable for you if you return it from the action
  @Action(Login)
  login({ dispatch }: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.login).pipe(
      tap(data => dispatch(new LoginSuccess(data))),
      catchError(error => dispatch(new LoginFailed(error.error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ dispatch }: StateContext<AuthStateModel>) {
    // Use ngxs Action or going to fail because running outside NgZone
    const returnUrl = this.store.selectSnapshot(
      state => state.router.state.root.queryParams['return-url']
    );
    dispatch(new Navigate([returnUrl || '/home']));
  }

  @Action(LoginFailed)
  loginFailed({ dispatch }: StateContext<AuthStateModel>, action: LoginFailed) {
    // Use ngxs Action or this is going to fail because running outside NgZone
    dispatch(new SetErrors(action.errors));
  }

  @Action(Register)
  register({ dispatch }: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.register).pipe(
      tap(() => dispatch(new RegisterSuccess())),
      catchError(error => dispatch(new RegisterFailed(error.error)))
    );
  }

  @Action(RegisterSuccess)
  registerSuccess({ dispatch }: StateContext<AuthStateModel>) {
    dispatch(
      new Navigate([
        '',
        { outlets: { popup: ['notification', 'registration-success'] } }
      ])
    );
  }

  @Action(RegisterFailed)
  registerFailed(
    { dispatch }: StateContext<AuthStateModel>,
    action: RegisterFailed
  ) {
    // Use ngxs Action or this is going to fail because running outside NgZone
    dispatch(new SetErrors(action.errors));
  }

  @Action(Logout)
  logout({ dispatch }: StateContext<AuthState>) {
    this.authService.logout();
    dispatch(new Navigate(['/auth/login']));
  }
}
