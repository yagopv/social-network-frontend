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
import { Auth } from '../models/auth.model';

@State<Auth>({
  name: 'auth',
  defaults: {
    ...JSON.parse(localStorage.getItem('auth'))
  }
})
export class AuthState {
  constructor(private store: Store, private authService: AuthService) {}

  @Selector()
  static getUser({ uuid, email, avatarUrl, fullName, preferences }: Auth) {
    return {
      uuid,
      email,
      avatarUrl,
      fullName,
      preferences
    };
  }

  // ngxs will subscribe to the post observable for you if you return it from the action
  @Action(Login)
  login({ dispatch }: StateContext<Auth>, action: Login) {
    return this.authService.login(action.login).pipe(
      tap(data => dispatch(new LoginSuccess(data))),
      catchError(error => dispatch(new LoginFailed(error.error)))
    );
  }

  @Action(LoginSuccess)
  loginSuccess(
    { dispatch, patchState }: StateContext<Auth>,
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
  register({ dispatch }: StateContext<Auth>, action: Register) {
    return this.authService.register(action.register).pipe(
      tap(() => dispatch(new RegisterSuccess())),
      catchError(error => dispatch(new RegisterFailed(error.error)))
    );
  }

  @Action(RegisterSuccess)
  registerSuccess({ dispatch }: StateContext<Auth>) {
    dispatch(
      new Navigate([
        '',
        { outlets: { popup: ['notification', 'registration-success'] } }
      ])
    );
  }

  @Action(GetUserProfile)
  getUserProfile({ dispatch }: StateContext<Auth>) {
    return this.authService.getUserProfile().pipe(
      tap(userProfile => dispatch(new GetUserProfileSuccess(userProfile))),
      catchError(error => dispatch(new GetUserProfileFailed(error.error)))
    );
  }

  @Action(GetUserProfileSuccess)
  getUserProfileSuccess(
    { patchState }: StateContext<Auth>,
    { userProfile }: GetUserProfileSuccess
  ) {
    patchState({
      ...userProfile
    });
  }

  @Action([LoginFailed, RegisterFailed, GetUserProfileFailed])
  registerFailed({ dispatch }: StateContext<Auth>, action: RegisterFailed) {
    // Use ngxs Action or this is going to fail because running outside NgZone
    dispatch(new SetErrors(action.errors));
  }

  @Action(Logout)
  logout({ dispatch, setState }: StateContext<Auth>) {
    this.authService.logout();
    setState(null);
    dispatch(new Navigate(['/auth/login']));
  }
}
