import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Logout } from '../../../auth/store/auth.actions';
import { AuthState } from '../../../auth/store/auth.state';
import { Observable } from 'rxjs';
import { Auth } from '../../../auth/models/auth.model';

@Component({
  selector: 'hab-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  @Select(AuthState.getUser) user$: Observable<Auth>;

  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
