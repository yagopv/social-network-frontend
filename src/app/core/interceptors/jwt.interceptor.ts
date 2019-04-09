import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../http/auth.service';
import { Store } from '@ngxs/store';
import { UserStore } from '../store/user.store';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authStore && this.authStore.state;

    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
