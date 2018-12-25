import * as fromPosts from './post/store/reducer';
import * as fromAuth from './auth/store/reducer';

export interface AppState {
  posts: fromPosts.PostsState;
  auth: fromAuth.AuthState;
}
