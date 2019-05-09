import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthTokens } from '../core.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokens: AuthTokens;

  constructor(private http: HttpClient) {
    this.tokens = { ...JSON.parse(localStorage.getItem('auth')) };
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthTokens>(`${environment.apiBaseUrl}/account/login`, {
        email,
        password
      })
      .pipe(
        tap(authTokens => {
          this.tokens = authTokens;
          localStorage.setItem('auth', JSON.stringify(authTokens));
        })
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

  logout() {
    localStorage.removeItem('auth');
    this.tokens = null;
  }

  isAuthenticated() {
    return this.tokens && !!this.tokens.accessToken;
  }
}
