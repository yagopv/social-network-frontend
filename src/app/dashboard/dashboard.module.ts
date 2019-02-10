import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendComponent } from './components/friend/friend.component';
import { FriendRequestsComponent } from './containers/friend-request/friend-requests.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardAsideComponent } from './components/dashboard-aside/dashboard-aside.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
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
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { AuthModule } from '../auth/auth.module';
import { SearchUserComponent } from './containers/search-user/search-user.component';
import { FriendsState } from './store/friend.state';
import { ErrorModule } from '../error/error.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ErrorModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    AuthModule,
    NgxsModule.forFeature([PostState, FriendsState])
  ],
  declarations: [
    DashboardAsideComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    DashboardComponent,
    DashboardNavComponent,
    HomeComponent,
    FriendComponent,
    FriendsComponent,
    FriendRequestsComponent,
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostContentComponent,
    MyAccountComponent,
    SearchUserComponent
  ]
})
export class DashboardModule {}
