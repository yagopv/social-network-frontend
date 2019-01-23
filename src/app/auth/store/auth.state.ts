import { catchError, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import {
  State,
  Action,
  StateContext,
  Store,
  NgxsOnInit,
  Selector
} from '@ngxs/store';

import { LoginResponse } from '../models/auth-user.model';
import { AuthService } from '../services/auth.service';
import {
  Login,
  LoginSuccess,
  Register,
  RegisterSuccess,
  RegisterFailed,
  LoginFailed,
  Logout,
  GetUserProfileFailed,
  GetUserProfile,
  GetUserProfileSuccess
} from './auth.actions';
import { SetErrors } from '../../error/store/error.actions';

export interface AuthStateModel {
  uuid: string;
  email: string;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
  fullName: string;
  avatarUrl: string;
  preferences: {
    isPublicProfile: string;
    linkedIn: string;
    twitter: string;
    github: string;
  };
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    ...JSON.parse(localStorage.getItem('auth'))
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
  loginSuccess(
    { dispatch, patchState }: StateContext<AuthStateModel>,
    { loginResponse }: LoginSuccess
  ) {
    // Use ngxs Action or going to fail because running outside NgZone
    patchState({ ...loginResponse });
    const returnUrl = this.store.selectSnapshot(
      state => state.router.state.root.queryParams['return-url']
    );
    dispatch(new Navigate([returnUrl || '/home']));
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

  @Action(GetUserProfile)
  getUserProfile({ dispatch }: StateContext<AuthStateModel>) {
    return this.authService.getUserProfile().pipe(
      tap(userProfile => dispatch(new GetUserProfileSuccess(userProfile))),
      catchError(error => dispatch(new GetUserProfileFailed(error.error)))
    );
  }

  @Action(GetUserProfileSuccess)
  getUserProfileSuccess(
    { patchState }: StateContext<AuthStateModel>,
    { userProfile }: GetUserProfileSuccess
  ) {
    patchState({
      ...userProfile
    });
  }

  @Action([LoginFailed, RegisterFailed, GetUserProfileFailed])
  registerFailed(
    { dispatch }: StateContext<AuthStateModel>,
    action: RegisterFailed
  ) {
    // Use ngxs Action or this is going to fail because running outside NgZone
    dispatch(new SetErrors(action.errors));
  }

  @Action(Logout)
  logout({ dispatch, setState }: StateContext<AuthStateModel>) {
    this.authService.logout();
    setState(null);
    dispatch(new Navigate(['/auth/login']));
  }
}
