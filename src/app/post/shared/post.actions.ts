import { Action } from '@ngrx/store';
import { PostViewModel } from 'app/post/shared/post.model';

export enum PostActionTypes {
  GetPosts = '[Post] GetPosts',
  GetPostsSuccess = '[Post] GetPostsSuccess',
  GetPostsFailed = '[Post] GetPostsFailed'
}

export class GetPosts implements Action {
  readonly type = PostActionTypes.GetPosts;
}

export class GetPostsSuccess implements Action {
  readonly type = PostActionTypes.GetPostsSuccess;

  constructor(public posts: PostViewModel[]) {}
}

export class GetPostsFailed implements Action {
  readonly type = PostActionTypes.GetPostsFailed;
}

export type PostActionsUnion = GetPosts | GetPostsSuccess | GetPostsFailed;
