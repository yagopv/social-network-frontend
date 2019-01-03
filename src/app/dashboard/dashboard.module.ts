import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { PostModule } from 'app/post/post.module';
import { FriendComponent } from './components/friend/friend.component';
import { FriendsRequestComponent } from './containers/friend-request/friends-request.component';
import { FriendsGridComponent } from './containers/friends-grid/friends-grid.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppLayoutAsideComponent } from './components/app-layout-aside/app-layout-aside.component';
import { AppLayoutNavComponent } from './components/app-layout-nav/app-layout-nav.component';

import { AppLayoutFooterComponent } from './components/app-layout-footer/app-layout-footer.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AppLayoutHeaderComponent } from './components/app-layout-header/app-layout-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PostModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ],
  declarations: [
    DashboardComponent,
    FriendsGridComponent,
    FriendComponent,
    FriendsRequestComponent,
    AppLayoutComponent,
    AppLayoutHeaderComponent,
    AppLayoutFooterComponent,
    AppLayoutNavComponent,
    AppLayoutAsideComponent
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
