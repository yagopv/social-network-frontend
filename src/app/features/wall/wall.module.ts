import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostComponent } from './components/post/post.component';
import { WallComponent } from './containers/wall/wall.component';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './store/post.state';
import { SharedModule } from '../../shared/shared.module';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostCommentCounterComponent } from './components/post-comment-counter/post-comment-counter.component';
import { AuthModule } from '../auth/auth.module';
import { FriendsState } from '../friends/store/friend.state';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { LikeComponent } from './components/like/like.component';
import { PrivateWallComponent } from './components/private-wall/private-wall.component';
import { PostHeadComponent } from './components/post-head/post-head.component';
import { PostBodyComponent } from './components/post-body/post-body-component';
import { LayoutModule } from '../../layout/layout.module';

const routes: Routes = [
  { path: 'wall', component: WallComponent },
  { path: 'user/:userId/wall', component: WallComponent },
  { path: 'user/:userId/private/wall', component: PrivateWallComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FontAwesomeModule,
    AuthModule,
    LayoutModule,
    NgxsModule.forFeature([PostState, FriendsState])
  ],
  declarations: [
    WallComponent,
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostBodyComponent,
    ProfileInfoComponent,
    LikeComponent,
    PrivateWallComponent,
    PostHeadComponent
  ]
})
export class WallModule {}
