import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthTokens } from '../core.models';
import { Store } from '../../shared/store/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Store<AuthTokens> {
  constructor(private http: HttpClient) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<AuthTokens>(`${environment.apiBaseUrl}/account/login`, {
        email,
        password
      })
      .pipe(
        tap(authTokens => {
          this.setState(authTokens);
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
    this.setState(null);
  }

  isAuthenticated() {
    return this.state && !!this.state.accessToken;
  }
}
