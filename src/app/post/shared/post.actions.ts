import { Action } from '@ngrx/store';
import { PostViewModel } from 'app/post/shared/post.model';

export enum ActionTypes {
  GetPosts = '[Post] GetPosts',
  GetPostsSuccess = '[Post] GetPostsSuccess',
  GetPostsFailed = '[Post] GetPostsFailed'
}

export class GetPosts implements Action {
  readonly type = ActionTypes.GetPosts;
}

export class GetPostsSuccess implements Action {
  readonly type = ActionTypes.GetPostsSuccess;

  constructor(public posts: PostViewModel[]) {}
}

export class GetPostsFailed implements Action {
  readonly type = ActionTypes.GetPostsFailed;
}

export type ActionsUnion = GetPosts | GetPostsSuccess | GetPostsFailed;
