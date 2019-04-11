import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { RegisterRequest } from '../../features/auth/models/register-request.model';
import { Profile } from '../../features/auth/models/profile.model';
import { UserProfileResponse } from '../../features/auth/models/user-profile-response.model';
import { LoginResponse } from '../../features/auth/models/login-response.model';
import { LoginRequest } from '../../features/auth/models/login-request.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${environment.apiBaseUrl}/account/login`,
      {
        email,
        password
      }
    );
  }

  register(register: RegisterRequest) {
    return this.http.post(`${environment.apiBaseUrl}/account`, register);
  }

  getUserProfile() {
    return this.http.get<UserProfileResponse>(`${environment.apiBaseUrl}/user`);
  }

  updateUserProfile(profile: Profile) {
    return this.http.put<Profile>(`${environment.apiBaseUrl}/user`, profile);
  }

  emailExist(email: string) {
    return this.http.post<{ email: string }>(
      `${environment.apiBaseUrl}/account/check`,
      {
        email
      },
      { observe: 'response' }
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
