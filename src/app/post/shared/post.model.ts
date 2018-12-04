export class PostContent {
  user: PostUser;
  datetime: number;
  message: string;

  constructor(post: Post) {
    this.user = post.user;
    this.datetime = post.datetime;
    this.message = post.message;
  }
}

export interface PostCommentCounter {
  count: number;
}

export interface PostComment {
  user: PostUser;
  datetime: string;
  comment: string;
}

export interface PostUser {
  id: number;
  name: string;
  avatar: string;
}

export interface Post {
  user: PostUser;
  datetime: number;
  message: string;
  comments: PostComment[];
}
