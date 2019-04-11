import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { RegisterRequest } from '../../features/auth/models/register-request.model';
import { LoginResponse } from '../../features/auth/models/login-response.model';
import { LoginRequest } from '../../features/auth/models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/account/login`,
      {
        email,
        password
      }
    );
  }

  register(register: RegisterRequest) {
    return this.http.post(`${environment.apiBaseUrl}/account`, register);
  }

  emailExist(email: string) {
    return this.http.post<{ email: string }>(
      `${environment.apiBaseUrl}/account/check`,
      {
        email
      },
      { observe: 'response' }
    );
  }
}
