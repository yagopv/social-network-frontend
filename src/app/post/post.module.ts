import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { PostComponent } from './components/post/post.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostCommentCounterComponent } from './components/post-comment-counter/post-comment-counter.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { SharedModule } from '../shared/shared.module';
import { PostState } from './post.state';

@NgModule({
  imports: [CommonModule, SharedModule, NgxsModule.forFeature([PostState])],
  declarations: [
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostContentComponent
  ],
  exports: [PostComponent]
})
export class PostModule {}
