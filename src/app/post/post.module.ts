import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { PostCommentCounterComponent } from './components/post-comment-counter/post-comment-counter.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './store/effects';

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
