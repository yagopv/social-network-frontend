import { PostModel } from './post.model';

export interface PostStateModel {
  [key: string]: PostModel;
}
