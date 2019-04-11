import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { MainLayoutComponent } from './components/main-layout.component/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { FriendRequestsModule } from '../features/friend-requests/friend-requests.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    AuthLayoutComponent
  ],
  imports: [CommonModule, RouterModule, FriendRequestsModule, SharedModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    AuthLayoutComponent
  ]
})
export class LayoutModule {}
