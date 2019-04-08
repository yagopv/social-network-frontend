import { Store } from '../../shared/store/store';
import { Auth } from '../../features/auth/models/auth.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<Auth> {
  constructor(private authService: AuthService) {
    super({ ...JSON.parse(localStorage.getItem('auth')) });
    this.authService.getUserProfile();
  }
}
