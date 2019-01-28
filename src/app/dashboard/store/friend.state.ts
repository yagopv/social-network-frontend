import { State, Action, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';

import { Friends } from '../models/friends.model';
import {
  SearchUsers,
  SearchUsersFailed,
  SearchUsersSuccess
} from './friend.actions';
import { AuthService } from '../../auth/services/auth.service';
import { SetErrors } from '../../error/store/error.actions';

@State<Friends>({
  name: 'friends',
  defaults: {
    friends: [],
    userSearch: []
  }
})
export class FriendsState {
  constructor(private authService: AuthService) {}

  @Action(SearchUsers)
  searchUsers(
    { dispatch }: StateContext<Friends>,
    { searchTerm }: SearchUsers
  ) {
    return this.authService.search(searchTerm).pipe(
      tap(users => dispatch(new SearchUsersSuccess(users))),
      catchError(error => dispatch(new SearchUsersFailed(error.error)))
    );
  }

  @Action(SearchUsersSuccess)
  searchUsersSuccess(
    { patchState }: StateContext<Friends>,
    { users }: SearchUsersSuccess
  ) {
    patchState({ userSearch: [...users] });
  }

  @Action([SearchUsersFailed])
  error({ dispatch }: StateContext<Friends>, { errors }: any) {
    // Use ngxs Action or this is going to fail because running outside NgZone
    dispatch(new SetErrors(errors));
  }
}
