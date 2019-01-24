import { State, StateContext, Action, Selector, Store } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import {
  GetPosts,
  GetPostsFailed,
  GetPostsSuccess,
  AddPost,
  AddPostSuccess,
  AddPostFailed,
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

  @Action(AddPost)
  addPost(
    { dispatch }: StateContext<PostCollection>,
    { postRequest: publish }: AddPost
  ) {
    const { avatarUrl, fullName, uuid } = this.store.selectSnapshot(
      state => state.auth
    );

    return this.postService.addPost(publish.content).pipe(
      tap(post => {
        dispatch(
          new AddPostSuccess({ ...post, author: { uuid, avatarUrl, fullName } })
        );
      }),
      catchError(error => dispatch(new AddPostFailed(error)))
    );
  }

  @Action(AddPostSuccess)
  addPostSuccess(
    { setState, getState }: StateContext<PostCollection>,
    { post }: AddPostSuccess
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

    return this.postService.addComment(postId, message).pipe(
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

  @Action([AddPostFailed, GetPostsFailed, AddCommentFailed])
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
