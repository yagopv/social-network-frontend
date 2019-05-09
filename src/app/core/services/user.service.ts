import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { SocialNetworkUser, Preferences } from '../core.models';
import { Store } from '../../shared/store/store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends Store<SocialNetworkUser> {
  constructor(private http: HttpClient) {
    super(null);
  }

  getUserProfile() {
    return this.http
      .get<{
        fullName: string;
        avatarUrl: string;
        preferences: Preferences;
      }>(`${environment.apiBaseUrl}/user`)
      .pipe(tap(user => this.setState({ ...this.state, ...user })));
  }

  updateUserProfile(profile: SocialNetworkUser) {
    return this.http
      .put<SocialNetworkUser>(`${environment.apiBaseUrl}/user`, profile)
      .pipe(
        tap(() =>
          this.setState({
            ...this.state,
            ...profile
          })
        )
      );
  }

  uploadAvatar(image: File) {
    const formData = new FormData();

    formData.append('avatar', image);

    return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
      observe: 'response'
    });
  }
}
