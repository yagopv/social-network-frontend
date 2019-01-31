import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Global } from '../models/global.model';
import {
  Login,
  Register,
  LoginSuccess,
  RegisterSuccess,
  LoginFailed,
  RegisterFailed
} from '../../auth/store/auth.actions';
import {
  AddPost,
  AddComment,
  AddPostSuccess,
  AddCommentSuccess,
  AddPostFailed,
  AddCommentFailed
} from '../../dashboard/store/post.actions';

@State<Global>({
  name: 'global',
  defaults: {
    isFetching: false
  }
})
export class GlobalState {
  @Selector()
  static isFetching({ isFetching }: Global) {
    return isFetching;
  }

  @Action([Login, Register, AddPost, AddComment])
  startFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: true });
  }

  @Action([
    LoginSuccess,
    RegisterSuccess,
    AddPostSuccess,
    AddCommentSuccess,
    LoginFailed,
    RegisterFailed,
    AddPostFailed,
    AddCommentFailed
  ])
  endFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: false });
  }
}
