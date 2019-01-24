import { Post, PostRequest } from '../models/post.model';
import { Error } from '../../error/models/error.model';
import { Comment } from '../models/comment.model';

export class GetPosts {
  static readonly type = '[Posts] GetPosts';
}

export class GetPostsSuccess {
  static readonly type = '[Posts] GetPostsSuccess';
  constructor(public posts: Post[]) {}
}
export class GetPostsFailed {
  static readonly type = '[Posts] GetPostsFailed';
  constructor(public error: Error[]) {}
}

export class Publish {
  static readonly type = '[Posts] Publish';
  constructor(public publish: PostRequest) {}
}

export class PublishSuccess {
  static readonly type = '[Posts] PublishSuccess';
  constructor(public post: Post) {}
}

export class PublishFailed {
  static readonly type = '[Posts] PublishFailed';
  constructor(public error: Error[]) {}
}

export class AddComment {
  static readonly type = '[Comment] AddComment';
  constructor(public postId: string, public message: string) {}
}

export class AddCommentSuccess {
  static readonly type = '[Comment] AddCommentSuccess';
  constructor(public comment: Comment, public postId: string) {}
}

export class AddCommentFailed {
  static readonly type = '[Comment] AddCommentFailed';
  constructor(public error: Error[]) {}
}
