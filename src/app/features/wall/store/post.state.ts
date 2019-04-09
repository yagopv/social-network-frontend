import { State, StateContext, Action, Store } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

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
import { Logout } from '../../auth/store/auth.actions';
import { Post } from '../models/post.model';

@State<Post[]>({
  name: 'posts',
  defaults: []
})
export class PostState {
  constructor(private store: Store, private postService: PostService) {}

  @Action(GetPosts)
  getPosts({ dispatch }: StateContext<Post[]>, { userId }: GetPosts) {
    return this.postService.getWall(userId).pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error.error, userId)))
    );
  }

  @Action(GetPostsSuccess)
  getPostsSuccess(
    { setState }: StateContext<Post[]>,
    { posts }: GetPostsSuccess
  ) {
    setState(
      posts.sort((p1, p2) => {
        return p2.createdAt - p1.createdAt;
      })
    );
  }

  @Action([GetPostsFailed])
  getPostsFailed({ dispatch }: StateContext<Post[]>, { errors, uuid }: any) {
    if (errors && errors.filter(error => error.status === 403).length > 0) {
      dispatch(new Navigate(['/user', uuid, 'private', 'wall']));
    }
  }

  @Action(AddPost)
  addPost(
    { dispatch }: StateContext<Post[]>,
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
            owner: publish.uuid
              ? friends.find(friend => friend.uuid === publish.uuid)
              : currentUser
          })
        );
      }),
      catchError(error => dispatch(new AddPostFailed(error.error)))
    );
  }

  @Action(AddPostSuccess, { cancelUncompleted: true })
  addPostSuccess(
    { setState, getState }: StateContext<Post[]>,
    { post }: AddPostSuccess
  ) {
    setState([post, ...getState()]);
  }

  @Action(DeletePost, { cancelUncompleted: true })
  deletePost({ dispatch }: StateContext<Post[]>, { uuid }: DeletePost) {
    return this.postService.deletePost(uuid).pipe(
      tap(() => dispatch(new DeletePostSuccess(uuid))),
      catchError(error => dispatch(new DeletePostFailed(error.error)))
    );
  }

  @Action(DeletePostSuccess)
  deletePostSuccess(
    { setState, getState }: StateContext<Post[]>,
    { uuid }: DeletePostSuccess
  ) {
    setState(getState().filter(post => post.id !== uuid));
  }

  @Action(AddComment, { cancelUncompleted: true })
  addComment(
    { dispatch }: StateContext<Post[]>,
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
    { setState, getState }: StateContext<Post[]>,
    { comment, postId }: AddCommentSuccess
  ) {
    setState(
      getState().map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [comment, ...post.comments]
          };
        }
        return post;
      })
    );
  }

  @Action(Like)
  like({ dispatch, getState }: StateContext<Post[]>, { postId }: Like) {
    const post = getState()[postId];
    const currentState = this.store.selectSnapshot(state => state);
    const currentUser = currentState.auth;

    if (post) {
      if (post.likes.indexOf(currentUser.uuid) === -1) {
        return this.postService.like(postId).pipe(
          tap(() => dispatch(new LikeSuccess(postId, true, currentUser.uuid))),
          catchError(error => dispatch(new LikeFailed(error.error)))
        );
      } else {
        return this.postService.dislike(postId).pipe(
          tap(() => dispatch(new LikeSuccess(postId, false, currentUser.uuid))),
          catchError(error => dispatch(new LikeFailed(error.error)))
        );
      }
    }
  }

  @Action(LikeSuccess)
  likeSuccess(
    { getState, setState }: StateContext<Post[]>,
    { postId, isLike, userUuid }: LikeSuccess
  ) {
    setState(
      getState().map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLike
              ? [...post.likes, userUuid]
              : post.likes.filter(uuid => uuid !== userUuid)
          };
        }
        return post;
      })
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<Post[]>) {
    setState([]);
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
