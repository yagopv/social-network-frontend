import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendComponent } from './components/friend/friend.component';
import { FriendsRequestComponent } from './containers/friend-request/friends-request.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardAsideComponent } from './components/dashboard-aside/dashboard-aside.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { FriendsComponent } from './containers/friends/friends.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './containers/home/home.component';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './store/post.state';
import { SharedModule } from '../shared/shared.module';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostCommentCounterComponent } from './components/post-comment-counter/post-comment-counter.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { PostCommentBoxComponent } from './components/post-comment-box/post-comment-box.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    NgxsModule.forFeature([PostState])
  ],
  declarations: [
    DashboardAsideComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    DashboardLayoutComponent,
    DashboardNavComponent,
    HomeComponent,
    FriendComponent,
    FriendsComponent,
    FriendsRequestComponent,
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostContentComponent,
    PostCommentBoxComponent
  ]
})
export class DashboardModule {}
