export interface PostModel {
  likes: any[];
  author: string;
  content: string;
  comments: CommentModel[];
  createdAt: number;
  id: string;
}

export interface CommentModel {
  author: string;
  message: string;
  createdAt: number;
  id: string;
}

export interface PublishModel {
  content: string;
}

export interface PostCommentModel {
  message: string;
}
