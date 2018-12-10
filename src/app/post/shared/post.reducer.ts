import * as PostActions from './post.actions';
import { PostViewModel } from './post.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface PostsState {
  posts: PostViewModel[];
}

const initialState: PostsState = {
  posts: []
};

export function reducer(
  state = initialState,
  action: PostActions.ActionsUnion
): PostsState {
  switch (action.type) {
    case PostActions.ActionTypes.GetPosts: {
      return {
        posts: []
      };
    }

    case PostActions.ActionTypes.GetPostsSuccess: {
      return {
        ...state,
        posts: action.posts
      };
    }

    default: {
      return state;
    }
  }
}

export const getPostsState = createFeatureSelector<PostsState>('posts');
export const getPosts = createSelector(
  getPostsState,
  state => state.posts
);
