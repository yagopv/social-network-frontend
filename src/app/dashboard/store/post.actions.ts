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

export class AddPost {
  static readonly type = '[Posts] AddPost';
  constructor(public postRequest: PostRequest) {}
}

export class AddPostSuccess {
  static readonly type = '[Posts] AddPostSuccess';
  constructor(public post: Post) {}
}

export class AddPostFailed {
  static readonly type = '[Posts] AddPostFailed';
  constructor(public error: Error[]) {}
}

export class DeletePost {
  static readonly type = '[Posts] DeletePost';
  constructor(public uuid: string) {}
}

export class DeletePostSuccess {
  static readonly type = '[Posts] DeletePostSuccess';
  constructor(public uuid: string) {}
}

export class DeletePostFailed {
  static readonly type = '[Posts] DeletePostFailed';
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
