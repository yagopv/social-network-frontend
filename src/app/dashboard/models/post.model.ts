export interface AuthorModel {
  avatarUrl: string;
  fullName: string;
  uuid: string;
}

export interface PostModel {
  likes: any[];
  author: AuthorModel;
  content: string;
  comments: CommentModel[];
  createdAt: number;
  id: string;
}

export interface CommentModel {
  author: AuthorModel;
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
