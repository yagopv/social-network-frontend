import { PostModel, PublishModel } from '../models/post.model';
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

export class Publish {
  static readonly type = '[Posts] Publish';
  constructor(public publish: PublishModel) {}
}

export class PublishSuccess {
  static readonly type = '[Posts] PublishSuccess';
  constructor(public post: PostModel) {}
}

export class PublishFailed {
  static readonly type = '[Posts] PublishFailed';
  constructor(public error: ErrorModel[]) {}
}
