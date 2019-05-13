import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { SocialNetworkUser, Preferences } from '../core.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: SocialNetworkUser = null;

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http
      .get<{
        fullName: string;
        avatarUrl: string;
        preferences: Preferences;
      }>(`${environment.apiBaseUrl}/user`)
      .pipe(
        tap(user => {
          this.currentUser = { ...this.currentUser, ...user };
        })
      );
  }

  updateUserProfile(profile: SocialNetworkUser) {
    return this.http
      .put<SocialNetworkUser>(`${environment.apiBaseUrl}/user`, profile)
      .pipe(
        tap(() => {
          this.currentUser = {
            ...this.currentUser,
            ...profile
          };
        })
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
