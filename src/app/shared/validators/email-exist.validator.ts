import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AsyncValidator, ValidationErrors, FormControl } from '@angular/forms';
import { debounceTime, catchError, map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class EmailExistValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(control: FormControl): Observable<ValidationErrors | null> {
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
