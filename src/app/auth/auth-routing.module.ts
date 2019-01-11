import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CenteredLayoutComponent } from '../shared/components/centered-layout/centered-layout.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';

const routes: Routes = [
  {
    path: 'auth',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
