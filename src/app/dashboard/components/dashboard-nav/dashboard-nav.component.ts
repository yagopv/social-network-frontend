import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hab-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent {
  @Output() logout = new EventEmitter();

  logoutUser() {
    this.logout.emit();
  }
}
