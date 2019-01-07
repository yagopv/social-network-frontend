import { LoginModel } from '../models/login.model';
import { AuthUserModel } from '../models/auth-user.model';
import { RegisterModel } from '../models/register.model';

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
  constructor(public payload: any) {}
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
