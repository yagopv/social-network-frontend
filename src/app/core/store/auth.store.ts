import { Store } from '../../shared/store/store';
import { AuthTokens } from '../../features/auth/models/auth.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthStore extends Store<AuthTokens> {
  constructor(private userService: AuthService) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }) {
    return this.userService.login({ email, password }).pipe(
      tap(authTokens => {
        this.setState(authTokens);
        localStorage.setItem('auth', JSON.stringify(authTokens));
      })
    );
  }

  register(registerData) {
    this.userService
      .register(registerData)
      .subscribe(() => console.log('SHOW POPUP'));
  }

  logout() {
    localStorage.removeItem('auth');
    this.setState(null);
  }
}
