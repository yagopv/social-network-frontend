import { Store } from '../../shared/store/store';
import { Auth } from '../../features/auth/models/auth.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserStore extends Store<Auth> {
  constructor(private userService: AuthService) {
    super(null);
  }

  getProfile() {
    return this.userService
      .getUserProfile()
      .pipe(tap(user => this.setState({ ...this.state, ...user })));
  }

  updateProfile(profile) {
    return this.userService.updateUserProfile(profile).pipe(
      tap(() =>
        this.setState({
          ...this.state,
          ...profile
        })
      )
    );
  }
}
