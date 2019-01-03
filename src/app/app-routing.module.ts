import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from 'app/shared/components/not-found/not-found.component';
import { WelcomeComponent } from 'app/welcome/components/welcome/welcome.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { RegisterComponent } from './auth/containers/register/register.component';
import { AboutComponent } from './about/components/about/about.component';
import { HelpComponent } from './help/components/help/help.component';
import { CenteredLayoutComponent } from './shared/components/centered-layout/centered-layout.component';
import { SiteLayoutComponent } from './shared/components/site-layout/site-layout.component';

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
    loadChildren: './dashboard/dashboard.module#DashboardModule'
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
