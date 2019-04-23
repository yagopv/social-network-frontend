import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { AuthTokens } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends Store<AuthTokens> {
  constructor(private authService: AuthService) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }: { email: string; password: string }) {
    return this.authService.login({ email, password }).pipe(
      tap(authTokens => {
        this.setState(authTokens);
        localStorage.setItem('auth', JSON.stringify(authTokens));
      })
    );
  }

  register(registerData: {
    fullName: string;
    email: string;
    password: string;
  }) {
    return this.authService.register(registerData);
  }

  logout() {
    localStorage.removeItem('auth');
    this.setState(null);
  }

  isAuthenticated() {
    return this.state && !!this.state.accessToken;
  }
}
