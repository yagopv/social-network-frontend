import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { AuthTokens } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends Store<AuthTokens> {
  constructor(private authService: AuthService) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }) {
    return this.authService.login({ email, password }).pipe(
      tap(authTokens => {
        this.setState(authTokens);
        localStorage.setItem('auth', JSON.stringify(authTokens));
      })
    );
  }

  register(registerData) {
    this.authService
      .register(registerData)
      .subscribe(() => console.log('SHOW POPUP'));
  }

  logout() {
    localStorage.removeItem('auth');
    this.setState(null);
  }
}
