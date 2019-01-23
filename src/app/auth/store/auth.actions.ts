import { LoginModel } from '../models/login.model';
import { LoginResponse, UserProfileResponse } from '../models/auth-user.model';
import { RegisterModel } from '../models/register.model';
import { ErrorModel } from '../../error/error.model';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public login: LoginModel) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public loginResponse: LoginResponse) {}
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
  constructor(public errors: ErrorModel[]) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class GetUserProfile {
  static readonly type = '[Auth] GetUserProfile';
}

export class GetUserProfileSuccess {
  static readonly type = '[Auth] GetUserProfileSuccess';
  constructor(public userProfile: UserProfileResponse) {}
}

export class GetUserProfileFailed {
  static type = '[Auth] GetUserProfileFailed';
  constructor(public errors: ErrorModel[]) {}
}
