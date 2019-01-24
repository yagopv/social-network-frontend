import { Post } from './post.model';

export interface PostCollection {
  [key: string]: Post;
}
