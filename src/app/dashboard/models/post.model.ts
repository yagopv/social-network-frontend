export class PostContentViewModel {
  user: PostUserViewModel;
  datetime: number;
  message: string;

  constructor(post: PostViewModel) {
    this.user = post.user;
    this.datetime = post.datetime;
    this.message = post.message;
  }
}

export interface PostCommentViewModel {
  user: PostUserViewModel;
  datetime: number;
  comment: string;
}

export interface PostUserViewModel {
  id: number;
  name: string;
  avatar: string;
}

export interface PostViewModel {
  user: PostUserViewModel;
  datetime: number;
  message: string;
  comments: PostCommentViewModel[];
}
