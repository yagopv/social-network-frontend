import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardFriendsComponent } from './dashboard-friends/dashboard-friends.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardMessagesComponent } from './dashboard-messages/dashboard-messages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardContentComponent },
      { path: 'friends', component: DashboardFriendsComponent },
      { path: 'messages', component: DashboardMessagesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
