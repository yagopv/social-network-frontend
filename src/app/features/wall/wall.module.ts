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
import { PostHeadComponent } from './post-head/post-head.component';
import { PostBodyComponent } from './post-body/post-body-component';

const routes: Routes = [
  { path: '', component: WallComponent },
  { path: ':userId', component: WallComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [
    WallComponent,
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostBodyComponent,
    ProfileInfoComponent,
    LikeComponent,
    PostHeadComponent
  ]
})
export class WallModule {}
