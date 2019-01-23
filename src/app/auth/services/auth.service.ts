import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginResponse, UserProfileResponse } from '../models/auth-user.model';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../containers/login/login.model';
import { RegisterModel } from '../models/register.model';
import { ProfileModel } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginModel) {
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

  register(register: RegisterModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}/account`, register);
  }

  getUserProfile() {
    return this.http.get<UserProfileResponse>(`${environment.apiBaseUrl}/user`);
  }

  updateUserProfile(profile: ProfileModel) {
    return this.http.put<ProfileModel>(
      `${environment.apiBaseUrl}/account`,
      profile
    );
  }

  logout() {
    localStorage.removeItem('auth');
  }
}
