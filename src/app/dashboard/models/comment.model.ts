import { Author } from './author.model';

export interface Comment {
  author: Author;
  message: string;
  createdAt: number;
  id: string;
}

export interface CommentRequest {
  message: string;
}
