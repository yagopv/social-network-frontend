import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
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
import { PostCollection } from '../models/post-collection.model';

@State<PostCollection>({
  name: 'posts',
  defaults: {}
})
export class PostState {
  constructor(private store: Store, private postService: PostService) {}

  @Selector()
  static getPosts(state: PostCollection) {
    return Object.values(state);
  }

  @Action(GetPosts)
  getPosts({ dispatch }: StateContext<PostCollection>) {
    return this.postService.getFeed().pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error)))
    );
  }

  @Action(GetPostsSuccess)
  getPostsSuccess(
    { setState }: StateContext<PostCollection>,
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
  publish({ dispatch }: StateContext<PostCollection>, { publish }: Publish) {
    const { avatarUrl, fullName, uuid } = this.store.selectSnapshot(
      state => state.auth
    );

    return this.postService.publish(publish.content).pipe(
      tap(post => {
        dispatch(
          new PublishSuccess({ ...post, author: { uuid, avatarUrl, fullName } })
        );
      }),
      catchError(error => dispatch(new PublishFailed(error)))
    );
  }

  @Action(PublishSuccess)
  publishSuccess(
    { setState, getState }: StateContext<PostCollection>,
    { post }: PublishSuccess
  ) {
    setState({
      [post.id]: post,
      ...getState()
    });
  }

  @Action(AddComment)
  addComment(
    { dispatch }: StateContext<PostCollection>,
    { postId, message }: AddComment
  ) {
    const { avatarUrl, fullName } = this.store.selectSnapshot(
      state => state.auth
    );

    return this.postService.publishComment(postId, message).pipe(
      tap(() => {
        dispatch(
          new AddCommentSuccess(
            {
              id: this.uuidv4(),
              message,
              createdAt: new Date().getTime(),
              author: {
                uuid: this.store.selectSnapshot(state => state.auth).uuid,
                avatarUrl,
                fullName
              }
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
    { setState, getState }: StateContext<PostCollection>,
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
  error(ctx: StateContext<PostCollection>, action: any) {
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
