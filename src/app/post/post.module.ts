import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { PostCommentCounterComponent } from './post-comment-counter/post-comment-counter.component';
import { PostContentComponent } from './post-content/post-content.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from './shared/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './shared/post.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('posts', fromPosts.reducer),
    EffectsModule.forRoot([PostEffects])
  ],
  declarations: [
    PostComponent,
    PostCommentComponent,
    PostCommentCounterComponent,
    PostContentComponent
  ],
  exports: [PostComponent]
})
export class PostModule {}
