import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Global } from '../../core/models/global.model';
import {
  Login,
  Register,
  LoginSuccess,
  RegisterSuccess,
  LoginFailed,
  RegisterFailed,
  UpdateUserProfile,
  UpdateUserProfileSuccess,
  UpdateUserProfileFailed
} from '../../features/auth/store/auth.actions';
import {
  AddPost,
  AddComment,
  AddPostSuccess,
  AddCommentSuccess,
  AddPostFailed,
  AddCommentFailed
} from '../../features/dashboard/store/post.actions';

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

  @Action([Login, Register, AddPost, AddComment, UpdateUserProfile])
  startFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: true });
  }

  @Action([
    LoginSuccess,
    RegisterSuccess,
    AddPostSuccess,
    AddCommentSuccess,
    UpdateUserProfileSuccess,
    LoginFailed,
    RegisterFailed,
    AddPostFailed,
    AddCommentFailed,
    UpdateUserProfileFailed
  ])
  endFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: false });
  }
}
