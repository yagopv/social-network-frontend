import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthStore } from '../store/auth.store';
import { ToastService } from '../services/toast.service';

const SKIP_URLS = ['/account/check'];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authStore: AuthStore,
    private router: Router,
    private toastService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        console.log('HTTP ERROR: ', error);
        if (
          (error.url.indexOf('/account/login') === -1 &&
            this.router.routerState.snapshot.url !== '/welcome' &&
            error.status === 401) ||
          (error.url.indexOf('/user') !== -1 && error.status === 404)
        ) {
          this.router.navigate(['/login']);
          this.authStore.logout();
        } else if (
          error.status === 403 &&
          error.url.indexOf('/user/wall') !== -1
        ) {
          this.router.navigate([
            '/user',
            error.url.split('/').pop(),
            'private',
            'wall'
          ]);
        } else {
          if (
            error &&
            SKIP_URLS.filter(url => error.url.indexOf(url) !== -1).length === 0
          ) {
            this.toastService.addErrorToast(error.error[0], 5000);
          }
        }

        return throwError(error);
      })
    );
  }
}
