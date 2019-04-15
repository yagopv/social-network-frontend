import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { UserProfileResponse, Profile } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<UserProfileResponse>(`${environment.apiBaseUrl}/user`);
  }

  updateUserProfile(profile: Profile) {
    return this.http.put<Profile>(`${environment.apiBaseUrl}/user`, profile);
  }

  uploadAvatar(image: File) {
    const formData = new FormData();

    formData.append('avatar', image);

    return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
      observe: 'response'
    });
  }
}
