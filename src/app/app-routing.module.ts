import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { SiteLayoutComponent } from './layout/components/site-layout/site-layout.component';
import { WelcomeComponent } from 'app/welcome/components/welcome/welcome.component';
import { AppLayoutComponent } from './layout/components/app-layout/app-layout.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { FriendsGridComponent } from './friends/containers/friends-grid/friends-grid.component';
import { AboutComponent } from './about/components/about/about.component';
import { HelpComponent } from './help/components/help/help.component';
import { CenteredLayoutComponent } from './layout/components/centered-layout/centered-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'help', component: HelpComponent },
      { path: 'about', component: AboutComponent }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'friends', component: FriendsGridComponent }
    ]
  },
  {
    path: '',
    component: CenteredLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'popup-route',
    component: HelpComponent,
    outlet: 'popup'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
