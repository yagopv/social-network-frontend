import { Friend } from '../../core/models/user.models';

export interface Post {
  likes: any[];
  author: Author;
  owner: Author | Friend;
  content: string;
  comments: Comment[];
  createdAt: number;
  id: string;
}

export interface PostRequest {
  content: string;
  uuid?: string;
}

export interface Author {
  avatarUrl: string;
  fullName: string;
  uuid: string;
}

export interface Comment {
  author: Author;
  message: string;
  createdAt: number;
  id: string;
}

export interface CommentRequest {
  message: string;
}
