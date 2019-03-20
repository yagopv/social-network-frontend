import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoginModel } from '../containers/login/login.model';
import { RegisterRequest } from '../models/register-request.model';
import { Profile } from '../models/profile.model';
import { UserProfileResponse } from '../models/user-profile-response.model';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/account/login`, {
        email,
        password
      })
      .pipe(
        map(user => {
          if (user && user.accessToken) {
            const { accessToken, refreshToken } = user;
            localStorage.setItem(
              'auth',
              JSON.stringify({ accessToken, refreshToken })
            );
          }

          return user;
        })
      );
  }

  async loginWithPromise({ email, password }: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/account/login`, {
        email,
        password
      })
      .toPromise()
      .then(user => {
        if (user && user.accessToken) {
          const { accessToken, refreshToken } = user;
          localStorage.setItem(
            'auth',
            JSON.stringify({ accessToken, refreshToken })
          );
        }

        return user;
      });
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

  logout() {
    localStorage.removeItem('auth');
  }

  uploadAvatar(image: File) {
    const formData = new FormData();

    formData.append('avatar', image);

    return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
      observe: 'response'
    });
  }

  search(text: string) {
    return this.http.get<Profile[]>(`${environment.apiBaseUrl}/user/search`, {
      params: { q: text }
    });
  }
}
