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
  AddCommentFailed,
  DeletePostFailed,
  DeletePost,
  DeletePostSuccess,
  Like,
  LikeSuccess,
  LikeFailed
} from './post.actions';
import { PostService } from '../services/post.service';
import { PostCollection } from '../models/post-collection.model';
import { Logout } from '../../auth/store/auth.actions';
import { Post } from '../models/post.model';
import { SetErrors } from '../../error/store/error.actions';

@State<PostCollection>({
  name: 'posts',
  defaults: {}
})
export class PostState {
  constructor(private store: Store, private postService: PostService) {}

  @Selector()
  static getPosts(state: PostCollection): Post[] {
    return Object.values(state);
  }

  @Action(GetPosts)
  getPosts({ dispatch }: StateContext<PostCollection>, { userId }: GetPosts) {
    return this.postService.getWall(userId).pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error.error)))
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
    const currentState = this.store.selectSnapshot(state => state);
    const currentUser = currentState.auth;
    const friends = currentState.friends.friends;
    return this.postService.addPost(publish.content, publish.uuid).pipe(
      tap(post => {
        dispatch(
          new AddPostSuccess({
            ...post,
            author: currentUser,
            owner: publish.uuid ? friends[publish.uuid] : currentUser
          })
        );
      }),
      catchError(error => dispatch(new AddPostFailed(error.error)))
    );
  }

  @Action(AddPostSuccess, { cancelUncompleted: true })
  addPostSuccess(
    { setState, getState }: StateContext<PostCollection>,
    { post }: AddPostSuccess
  ) {
    setState({
      [post.id]: post,
      ...getState()
    });
  }

  @Action(DeletePost, { cancelUncompleted: true })
  deletePost({ dispatch }: StateContext<PostCollection>, { uuid }: DeletePost) {
    return this.postService.deletePost(uuid).pipe(
      tap(() => dispatch(new DeletePostSuccess(uuid))),
      catchError(error => dispatch(new DeletePostFailed(error.error)))
    );
  }

  @Action(DeletePostSuccess)
  deletePostSuccess(
    { setState, getState }: StateContext<PostCollection>,
    { uuid }: DeletePostSuccess
  ) {
    const posts = getState();
    setState(
      Object.keys(posts).reduce((draft, postId) => {
        if (postId !== uuid) {
          draft[postId] = posts[postId];
        }
        return draft;
      }, {})
    );
  }

  @Action(AddComment, { cancelUncompleted: true })
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
      catchError(error => dispatch(new AddCommentFailed(error.error)))
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

  @Action(Like)
  like(
    { dispatch, getState }: StateContext<PostCollection>,
    { postUuid }: Like
  ) {
    const post = getState()[postUuid];
    const currentState = this.store.selectSnapshot(state => state);
    const currentUser = currentState.auth;

    if (post) {
      if (post.likes.indexOf(currentUser.uuid) === -1) {
        return this.postService.like(postUuid).pipe(
          tap(() =>
            dispatch(new LikeSuccess(postUuid, true, currentUser.uuid))
          ),
          catchError(error => dispatch(new LikeFailed(error.error)))
        );
      } else {
        return this.postService.dislike(postUuid).pipe(
          tap(() =>
            dispatch(new LikeSuccess(postUuid, false, currentUser.uuid))
          ),
          catchError(error => dispatch(new LikeFailed(error.error)))
        );
      }
    }
  }

  @Action(LikeSuccess)
  likeSuccess(
    { getState, setState }: StateContext<PostCollection>,
    { postUuid, isLike, userUuid }: LikeSuccess
  ) {
    const posts = getState();
    setState({
      ...posts,
      [postUuid]: {
        ...posts[postUuid],
        likes: isLike
          ? [...posts[postUuid].likes, userUuid]
          : posts[postUuid].likes.filter(uuid => uuid !== userUuid)
      }
    });
  }

  @Action(Logout)
  logout({ setState }: StateContext<PostCollection>) {
    setState({});
  }

  @Action([
    AddPostFailed,
    GetPostsFailed,
    AddCommentFailed,
    DeletePostFailed,
    LikeFailed
  ])
  error({ dispatch }: StateContext<PostCollection>, { errors }: any) {
    dispatch(new SetErrors(errors));
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
