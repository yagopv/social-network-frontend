import * as fromPosts from './post/shared/post.reducer';

export interface AppState {
  posts: fromPosts.PostsState;
}
