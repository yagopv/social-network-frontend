import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostCommentCounterComponent } from './post-comment-counter/post-comment-counter.component';
import { PostContentComponent } from './post-content/post-content.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostContentComponent
  ],
  exports: [PostComponent]
})
export class PostModule {}
