import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthUserModel } from '../models/auth-user.model';
import { environment } from '../../../environments/environment';
import { LoginModel } from '../containers/login/login.model';
import { RegisterModel } from '../models/register.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Don't expose Subject. Instead expose a read only Observable
  private currentUserSubject: BehaviorSubject<AuthUserModel>;
  public currentUser: Observable<AuthUserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUserModel>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUserModel {
    return this.currentUserSubject.value;
  }

  login({ email, password }: LoginModel) {
    return this.http
      .post<AuthUserModel>(`${environment.apiBaseUrl}/account/login`, {
        email,
        password
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.accessToken) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  register(register: RegisterModel) {
    return this.http.post<any>(`${environment.apiBaseUrl}/account`, register);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
