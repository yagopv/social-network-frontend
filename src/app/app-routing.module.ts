import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', loadChildren: './features/login/login.module#LoginModule' },
      {
        path: '',
        loadChildren: './features/register/register.module#RegisterModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: './features/welcome/welcome.module#WelcomeModule'
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './features/my-account/my-account.module#MyAccountModule'
      },
      {
        path: '',
        loadChildren: './features/wall/wall.module#WallModule'
      },
      {
        path: '',
        loadChildren: './features/friends/friends.module#FriendsModule'
      }
    ]
  },
  {
    path: '',
    loadChildren: './features/about/about.module#AboutModule'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
