import { Store } from '../../shared/store/store';
import { AuthTokens } from '../../features/auth/models/auth.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserStore } from './user.store';

@Injectable()
export class AuthStore extends Store<AuthTokens> {
  constructor(
    private userService: AuthService,
    private userStore: UserStore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }) {
    this.userService.login({ email, password }).subscribe(authTokens => {
      this.setState(authTokens);
      const returnUrl = this.route.queryParams['return-url'];
      this.router.navigate([returnUrl || '/wall']);
      this.userStore.getProfile();
    });
  }

  register(registerData) {
    this.userService
      .register(registerData)
      .subscribe(() => console.log('SHOW POPUP'));
  }

  logout() {
    localStorage.removeItem('auth');
    this.setState(null);
    this.router.navigate(['/login']);
  }
}
