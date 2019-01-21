import { PostModel } from './post.model';

export interface PostStateModel {
  byId: { [key: string]: PostModel };
  allIds: string[];
}
