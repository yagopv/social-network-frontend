import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { PostComponent } from './components/post/post.component';
import { WallComponent } from './containers/wall/wall.component';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './store/post.state';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { MyAccountComponent } from './containers/my-account/my-account.component';
import { SearchUserComponent } from './containers/search-user/search-user.component';
import { FriendsState } from './store/friend.state';
import { PostHeadComponent } from './components/post-head/post-head.component';
import { PostBodyComponent } from './components/post-body/post-body-component';
import { SharedModule } from '../shared/shared.module';
import { ErrorModule } from '../modules/error/error.module';
import { DashboardRoutingModule } from '../modules/dashboard/dashboard-routing.module';
import { AuthModule } from '../modules/auth/auth.module';
import { DashboardAsideComponent } from '../modules/dashboard/components/dashboard-aside/dashboard-aside.component';
import { DashboardNavComponent } from '../modules/dashboard/components/dashboard-nav/dashboard-nav.component';
import { FriendComponent } from '../modules/dashboard/components/friend/friend.component';
import { FriendsComponent } from '../modules/dashboard/containers/friends/friends.component';
import { FriendRequestsComponent } from '../modules/dashboard/containers/friend-request/friend-requests.component';
import { PostCommentCounterComponent } from '../modules/dashboard/components/post-comment-counter/post-comment-counter.component';
import { ProfileInfoComponent } from '../modules/dashboard/components/profile-info/profile-info.component';
import { LikeComponent } from '../modules/dashboard/components/like/like.component';
import { PrivateWallComponent } from '../modules/dashboard/components/private-wall/private-wall.component';

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
    DashboardComponent,
    DashboardNavComponent,
    WallComponent,
    FriendComponent,
    FriendsComponent,
    FriendRequestsComponent,
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostBodyComponent,
    MyAccountComponent,
    SearchUserComponent,
    ProfileInfoComponent,
    LikeComponent,
    PrivateWallComponent,
    PostHeadComponent
  ]
})
export class DashboardModule {}
