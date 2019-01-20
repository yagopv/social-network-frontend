import { State, StateContext, Action } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { PostModel } from '../models/post.model';
import { GetPosts, GetPostsFailed, GetPostsSuccess } from './post.actions';
import { FeedService } from '../services/feed.service';

@State<PostModel[]>({
  name: 'posts',
  defaults: []
})
export class PostState {
  constructor(private feedService: FeedService) {}

  @Action(GetPosts)
  posts({ dispatch }: StateContext<PostModel[]>) {
    return this.feedService.getFeed().pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error)))
    );
  }

  @Action(GetPostsSuccess)
  postsSuccess(ctx: StateContext<PostModel[]>, action: GetPostsSuccess) {
    console.log('ACTION!!!', action);
  }

  @Action(GetPostsFailed)
  postsError(ctx: StateContext<PostModel[]>, action: GetPostsFailed) {
    console.log('GetPostsFailed', action);
  }
}
