import { ErrorModel } from '../../error/error.model';
import { CommentModel } from '../models/post.model';

export class AddComment {
  static readonly type = '[Comment] AddComment';
  constructor(public message: string) {}
}

export class AddCommentSuccess {
  static readonly type = '[Comment] AddCommentSuccess';
}

export class AddCommentFailed {
  static readonly type = '[Comment] AddCommentFailed';
  constructor(public error: ErrorModel[]) {}
}

export class SetComments {
  static readonly type = '[Comment] SetComments';
  constructor(public comments: CommentModel[]) {}
}
