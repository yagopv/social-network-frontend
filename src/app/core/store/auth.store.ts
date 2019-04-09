import { Store } from '../../shared/store/store';
import { Auth } from '../../features/auth/models/auth.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthStore extends Store<Auth> {
  constructor(private userService: AuthService) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }) {
    return this.userService.login({ email, password }).pipe(
      tap(user => {
        this.setState({ ...this.state, ...user });
        this.getProfile();
      })
    );
  }

  register(registerData) {
    this.userService
      .register(registerData)
      .subscribe(() => console.log('SHOW POPUP'));
  }

  getProfile() {
    return this.userService
      .getUserProfile()
      .pipe(tap(user => this.setState({ ...this.state, ...user })));
  }
}
