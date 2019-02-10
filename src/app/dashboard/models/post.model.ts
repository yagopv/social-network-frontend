import { Author } from './author.model';
import { Comment } from './comment.model';

export interface Post {
  likes: any[];
  author: Author;
  owner: Author;
  content: string;
  comments: Comment[];
  createdAt: number;
  id: string;
}

export interface PostRequest {
  content: string;
}
