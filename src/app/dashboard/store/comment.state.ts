import { State, Action, StateContext } from '@ngxs/store';
import { CommentStateModel } from '../models/comment-state.model';
import { SetComments } from './comment.actions';

@State<CommentStateModel>({
  name: 'comments',
  defaults: {
    byId: {},
    allIds: []
  }
})
export class CommentState {
  constructor() {}

  @Action(SetComments)
  setComments(
    { setState }: StateContext<CommentStateModel>,
    { comments }: SetComments
  ) {
    setState(
      comments.reduce(
        (draft, comment) => {
          draft.byId[comment.id] = comment;
          draft.allIds.push(comment.id);
          return draft;
        },
        {
          byId: {},
          allIds: []
        }
      )
    );
  }
}
