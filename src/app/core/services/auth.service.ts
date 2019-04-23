import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthTokens } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: { email: string; password: string }) {
    return this.http.post<AuthTokens>(
      `${environment.apiBaseUrl}/account/login`,
      {
        email,
        password
      }
    );
  }

  register(register: { fullName: string; email: string; password: string }) {
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
