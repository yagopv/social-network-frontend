import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardFriendsComponent } from './dashboard-friends/dashboard-friends.component';
import { DashboardMessagesComponent } from './dashboard-messages/dashboard-messages.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';

@NgModule({
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent, DashboardHeaderComponent, DashboardFooterComponent, DashboardNavComponent, DashboardContentComponent, DashboardFriendsComponent, DashboardMessagesComponent, DashboardUserComponent]
})
export class DashboardModule {}
