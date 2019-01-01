import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from '../store/actions';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.Login),
    switchMap((action: AuthActions.Login) =>
      this.authService
        .login({
          email: action.payload.email,
          password: action.payload.password
        })
        .pipe(
          // If successful, dispatch success action with result
          map(data => new AuthActions.LoginSuccess(data)),
          // If request fails, dispatch failed action
          catchError(() => of(new AuthActions.LoginFailed()))
        )
    )
  );

  loginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/dashboard']))
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}
}
