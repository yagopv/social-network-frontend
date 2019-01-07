import { PostViewModel } from '../models/post.model';

export class GetPosts {
  static readonly type = '[Posts] GetPosts';
}

export class GetPostsSuccess {
  static readonly type = '[Posts] GetPosts';
  constructor(public posts: PostViewModel[]) {}
}

export class GetPostsFailed {
  static readonly type = '[Posts] GetPosts';
}
