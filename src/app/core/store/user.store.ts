import { Store } from '../../shared/store/store';
import { Auth } from '../../features/auth/models/auth.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<Auth> {
  constructor(
    private userService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
  }

  login({ email, password }) {
    this.userService.login({ email, password }).subscribe(user => {
      this.setState({ ...this.state, ...user });
      const returnUrl = this.route.queryParams['return-url'];
      this.router.navigate([returnUrl || '/wall']);
      this.getProfile();
    });
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
