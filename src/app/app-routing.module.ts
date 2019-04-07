import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { DashboardComponent } from './layout/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './features/welcome/welcome.module#WelcomeModule'
  },
  {
    path: '',
    loadChildren: './features/about/about.module#AboutModule'
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: './features/friends/friends.module#FriendsModule'
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: './features/my-account/my-account.module#MyAccountModule'
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: './features/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'notification/:notificationName',
    component: NotificationComponent,
    outlet: 'popup'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
