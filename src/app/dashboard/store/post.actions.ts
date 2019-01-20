import { PostModel } from '../models/post.model';
import { ErrorModel } from '../../error/error.model';

export class GetPosts {
  static readonly type = '[Posts] GetPosts';
}

export class GetPostsSuccess {
  static readonly type = '[Posts] GetPostsSuccess';
  constructor(public posts: PostModel[]) {}
}

export class GetPostsFailed {
  static readonly type = '[Posts] GetPostsFailed';
  constructor(public error: ErrorModel[]) {}
}
