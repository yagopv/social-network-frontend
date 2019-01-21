import { State, StateContext, Action } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import {
  GetPosts,
  GetPostsFailed,
  GetPostsSuccess,
  Publish
} from './post.actions';
import { PostService } from '../services/post.service';
import { PostStateModel } from '../models/post-state.model';
import { SetComments } from './comment.actions';

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    byId: {},
    allIds: []
  }
})
export class PostState {
  constructor(private postService: PostService) {}

  @Action(GetPosts)
  posts({ dispatch }: StateContext<PostStateModel>) {
    return this.postService.getFeed().pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error)))
    );
  }

  @Action(GetPostsSuccess)
  postsSuccess(
    { setState, dispatch }: StateContext<PostStateModel>,
    { posts }: GetPostsSuccess
  ) {
    const comments = [];

    setState(
      posts.reduce(
        (draft, post) => {
          draft.byId[post.id] = post;
          draft.allIds.push(post.id);
          comments.push(post.comments);
          return draft;
        },
        {
          byId: {},
          allIds: []
        }
      )
    );

    dispatch(new SetComments(comments));
  }

  @Action(GetPostsFailed)
  postsError(ctx: StateContext<PostStateModel>, action: GetPostsFailed) {
    console.log('GetPostsFailed', action);
  }

  @Action(Publish)
  publish(ctx: StateContext<PostStateModel>, { publish }: Publish) {}
}
