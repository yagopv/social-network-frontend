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
import { AuthService } from '../../auth/services/auth.service';

@State<PostStateModel>({
  name: 'posts',
  defaults: {}
})
export class PostState {
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  @Selector()
  static getPosts(state: PostStateModel) {
    return Object.values(state);
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
    const orderedPosts = posts.sort((p1, p2) => {
      return p2.createdAt - p1.createdAt;
    });

    setState(
      orderedPosts.reduce((draft, post) => {
        draft[post.id] = post;
        return draft;
      }, {})
    );
  }

  @Action(Publish)
  publish({ dispatch }: StateContext<PostStateModel>, { publish }: Publish) {
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
      [post.id]: post,
      ...getState()
    });
  }

  @Action(AddComment)
  addComment(
    { dispatch }: StateContext<PostStateModel>,
    { postId, message }: AddComment
  ) {
    return this.postService.publishComment(postId, message).pipe(
      tap(() => {
        dispatch(
          new AddCommentSuccess(
            {
              id: this.uuidv4(),
              message,
              createdAt: new Date().getTime(),
              author: this.authService.currentUserSnapshot.uuid
            },
            postId
          )
        );
      }),
      catchError(error => dispatch(new AddCommentFailed(error)))
    );
  }

  @Action(AddCommentSuccess)
  addCommentSuccess(
    { setState, getState }: StateContext<PostStateModel>,
    { comment, postId }: AddCommentSuccess
  ) {
    const state = getState();

    setState({
      ...state,
      [postId]: {
        ...state[postId],
        comments: [comment, ...state[postId].comments]
      }
    });
  }

  @Action([PublishFailed, GetPostsFailed, AddCommentFailed])
  error(ctx: StateContext<PostStateModel>, action: any) {
    console.log(action);
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line
      let r = (Math.random() * 16) | 0, // tslint:disable-line
        v = c == 'x' ? r : (r & 0x3) | 0x8; // tslint:disable-line
      return v.toString(16);
    });
  }
}
