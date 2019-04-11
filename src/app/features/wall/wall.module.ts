import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostComponent } from './post/post.component';
import { WallComponent } from './wall/wall.component';
import { SharedModule } from '../../shared/shared.module';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostCommentCounterComponent } from './post-comment-counter/post-comment-counter.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { LikeComponent } from './like/like.component';
import { PrivateWallComponent } from './private-wall/private-wall.component';
import { PostHeadComponent } from './post-head/post-head.component';
import { PostBodyComponent } from './post-body/post-body-component';
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
    LayoutModule
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
