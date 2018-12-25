import * as AuthActions from './actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  loading: boolean;
}

const initialState: AuthState = {
  loading: false
};

export function reducer(
  state = initialState,
  action: AuthActions.ActionsUnion
): AuthState {
  switch (action.type) {
    case AuthActions.ActionTypes.LoginSuccess: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
