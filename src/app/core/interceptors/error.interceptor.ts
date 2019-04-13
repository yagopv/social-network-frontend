import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { ToastService } from '../services/toast.service';

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
        if (error.status === 401) {
          this.authStore.logout();
          this.router.navigate(['/login']);
        } else {
          this.toastService.addErrorToast(error.error[0], 5000);
        }

        return throwError(error);
      })
    );
  }
}
