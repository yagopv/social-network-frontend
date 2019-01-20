import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../../auth/store/auth.actions';

@Component({
  selector: 'hab-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
