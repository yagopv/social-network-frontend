import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { MainLayoutComponent } from './components/main-layout.component/main-layout.component';
import { FriendRequestsModule } from '../features/friend-requests/friend-requests.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule, FriendRequestsModule],
  exports: [HeaderComponent, FooterComponent, MainLayoutComponent]
})
export class LayoutModule {}
