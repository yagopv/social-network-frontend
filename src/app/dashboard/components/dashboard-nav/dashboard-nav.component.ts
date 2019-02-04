import { Component, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sn-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent {
  @Output() logout = new EventEmitter();
  logoutIcon: IconProp = faSignOutAlt;

  logoutUser() {
    this.logout.emit();
  }
}
