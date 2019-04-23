import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';

import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { debounceTime, take, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailExistValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    return this.authService.emailExist(control.value).pipe(
      debounceTime(500),
      map(response => {
        return response.status === 200 ? { emailExists: true } : null;
      }),
      catchError(() => of(null))
    );
  }
}
