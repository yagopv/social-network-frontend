import * as fromPosts from './post/store/reducer';

export interface AppState {
  posts: fromPosts.PostsState;
}
