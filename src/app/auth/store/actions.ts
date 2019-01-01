import { Action } from '@ngrx/store';
import { LoginModel } from '../models/login.model';
import { AuthUserModel } from '../models/auth-user.model';
import { RegisterModel } from '../models/register.model';

export enum ActionTypes {
  Login = '[Login] Login',
  LoginSuccess = '[Login] LoginSuccess',
  LoginFailed = '[Login] LoginFailed',
  Register = '[Register] Register',
  RegisterSuccess = '[Register] RegisterSuccess',
  RegisterFailed = '[Register] RegisterFailed'
}

export class Login implements Action {
  readonly type = ActionTypes.Login;
  constructor(public payload: LoginModel) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;
  constructor(public payload: AuthUserModel) {}
}

export class LoginFailed implements Action {
  readonly type = ActionTypes.LoginFailed;
}

export class Register implements Action {
  readonly type = ActionTypes.Register;
  constructor(public payload: RegisterModel) {}
}

export class RegisterSuccess implements Action {
  readonly type = ActionTypes.RegisterSuccess;
}

export class RegisterFailed implements Action {
  readonly type = ActionTypes.RegisterFailed;
}

export type ActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailed
  | Register
  | RegisterSuccess
  | RegisterFailed;
