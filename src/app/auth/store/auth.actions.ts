import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { Error } from '../../error/models/error.model';
import { LoginResponse } from '../models/login-response.model';
import { UserProfileResponse } from '../models/user-profile-response.model';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public login: LoginRequest) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public loginResponse: LoginResponse) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public errors: Error[]) {}
}

export class Register {
  static type = '[Auth] Register';
  constructor(public register: RegisterRequest) {}
}

export class RegisterSuccess {
  static type = '[Auth] RegisterSuccess';
}

export class RegisterFailed {
  static type = '[Auth] RegisterFailed';
  constructor(public errors: Error[]) {}
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
  constructor(public errors: Error[]) {}
}
