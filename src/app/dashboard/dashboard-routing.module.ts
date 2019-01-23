import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './containers/home/home.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'friends', component: FriendsComponent },
      { path: 'my-account', component: MyAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
