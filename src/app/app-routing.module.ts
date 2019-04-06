import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { NotificationComponent } from './shared/components/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  },
  {
    path: '',
    loadChildren: './modules/about/about.module#AboutModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
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
