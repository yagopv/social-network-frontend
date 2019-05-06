import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: './features/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'about',
    loadChildren: './features/about/about.module#AboutModule'
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-account',
        loadChildren: './features/my-account/my-account.module#MyAccountModule'
      },
      {
        path: 'friends',
        loadChildren: './features/friends/friends.module#FriendsModule'
      },
      {
        path: 'wall',
        loadChildren: './features/wall/wall.module#WallModule'
      },
      {
        path: 'private-wall',
        loadChildren:
          './features/private-wall/private-wall.module#PrivateWallModule'
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
