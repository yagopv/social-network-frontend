import { LoginModel } from '../models/login.model';
import { AuthUserModel } from '../models/auth-user.model';
import { RegisterModel } from '../models/register.model';
import { ErrorModel } from 'app/error/error.model';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public login: LoginModel) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public currentUser: AuthUserModel) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public errors: ErrorModel[]) {}
}

export class Register {
  static type = '[Auth] Register';
  constructor(public register: RegisterModel) {}
}

export class RegisterSuccess {
  static type = '[Auth] RegisterSuccess';
}

export class RegisterFailed {
  static type = '[Auth] RegisterFailed';
}
