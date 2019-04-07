import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FriendsModule } from '../features/friends/friends.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { DashboardAsideComponent } from './components/dashboard-aside/dashboard-aside.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAsideComponent,
    DashboardNavComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule, FriendsModule],
  exports: [DashboardComponent]
})
export class LayoutModule {}
