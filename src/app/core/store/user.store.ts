import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { SocialNetworkUser } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<SocialNetworkUser> {
  constructor(private userService: UserService) {
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
