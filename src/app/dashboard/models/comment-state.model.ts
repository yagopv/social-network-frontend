import { CommentModel } from './post.model';

export interface CommentStateModel {
  byId: { [key: string]: CommentModel };
  allIds: string[];
}
