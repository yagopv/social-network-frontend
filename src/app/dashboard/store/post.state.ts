import { State, StateContext, Action, Selector } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import {
  GetPosts,
  GetPostsFailed,
  GetPostsSuccess,
  Publish,
  PublishSuccess,
  PublishFailed,
  AddComment,
  AddCommentSuccess,
  AddCommentFailed
} from './post.actions';
import { PostService } from '../services/post.service';
import { PostStateModel } from '../models/post-state.model';

@State<PostStateModel>({
  name: 'posts',
  defaults: {}
})
export class PostState {
  constructor(private postService: PostService) {}

  @Selector()
  static getPostsByDate(state: PostStateModel) {
    return Object.values(state).sort((p1, p2) => {
      return p2.createdAt - p1.createdAt;
    });
  }

  @Action(GetPosts)
  getPosts({ dispatch }: StateContext<PostStateModel>) {
    return this.postService.getFeed().pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error)))
    );
  }

  @Action(GetPostsSuccess)
  getPostsSuccess(
    { setState }: StateContext<PostStateModel>,
    { posts }: GetPostsSuccess
  ) {
    setState(
      posts.reduce((draft, post) => {
        draft[post.id] = post;
        return draft;
      }, {})
    );
  }

  @Action(Publish)
  publish(
    { dispatch, setState }: StateContext<PostStateModel>,
    { publish }: Publish
  ) {
    return this.postService.publish(publish.content).pipe(
      tap(post => {
        dispatch(new PublishSuccess(post));
      }),
      catchError(error => dispatch(new PublishFailed(error)))
    );
  }

  @Action(PublishSuccess)
  publishSuccess(
    { setState, getState }: StateContext<PostStateModel>,
    { post }: PublishSuccess
  ) {
    setState({
      ...getState(),
      [post.id]: post
    });
  }

  @Action(AddComment)
  addComment(
    { dispatch }: StateContext<PostStateModel>,
    { postId, message }: AddComment
  ) {
    return this.postService.publishComment(postId, message).pipe(
      tap(comment => {
        dispatch(new AddCommentSuccess(comment));
      }),
      catchError(error => dispatch(new AddCommentFailed(error)))
    );
  }

  @Action(AddCommentSuccess)
  addCommentSuccess(
    { setState, getState }: StateContext<PostStateModel>,
    { comment }: AddCommentSuccess
  ) {}

  @Action([PublishFailed, GetPostsFailed, AddCommentFailed])
  error(ctx: StateContext<PostStateModel>, action: any) {
    console.log(action);
  }
}
