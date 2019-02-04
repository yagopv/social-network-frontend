import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';

import { Friends } from '../models/friends.model';
import {
  SearchUsers,
  SearchUsersFailed,
  SearchUsersSuccess,
  GetFriendRequestFailed,
  AddFriendFailed,
  AcceptFriendRequestFailed,
  GetFriendRequests,
  GetFriendRequestsSuccess,
  AcceptFriendRequests,
  AcceptFriendRequestsSuccess,
  GetFriends,
  GetFriendsSuccess,
  GetFriendsFailed
} from './friend.actions';
import { AuthService } from '../../auth/services/auth.service';
import { SetErrors } from '../../error/store/error.actions';
import { FriendService } from '../services/friend.service';

@State<Friends>({
  name: 'friends',
  defaults: {
    friends: [],
    userSearch: [],
    requests: []
  }
})
export class FriendsState {
  constructor(
    private authService: AuthService,
    private friendService: FriendService
  ) {}

  @Selector()
  static getSearchFriends({ friends, userSearch }: Friends) {
    return [...userSearch, ...friends];
  }

  @Selector()
  static getFriendRequests({ requests }: Friends) {
    return requests;
  }

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

  @Action(GetFriends)
  getFriends({ dispatch }: StateContext<Friends>) {
    return this.friendService.getFriends().pipe(
      tap(friends => dispatch(new GetFriendsSuccess(friends))),
      catchError(error => dispatch(new GetFriendsFailed(error.error)))
    );
  }

  @Action(GetFriendsSuccess)
  getFriendsSuccess(
    { patchState }: StateContext<Friends>,
    { friends }: GetFriendsSuccess
  ) {
    patchState({ friends: [...friends] });
  }

  @Action(GetFriendRequests)
  getFriendRequests({ dispatch }: StateContext<Friends>) {
    return this.friendService.getFriendRequests().pipe(
      tap(requests => dispatch(new GetFriendRequestsSuccess(requests))),
      catchError(error => dispatch(new GetFriendRequestFailed(error.error)))
    );
  }

  @Action(GetFriendRequestsSuccess)
  getFriendRequestsSuccess(
    { patchState }: StateContext<Friends>,
    { requests }: GetFriendRequestsSuccess
  ) {
    patchState({ requests: [...requests] });
  }

  @Action(AcceptFriendRequests)
  acceptFriendRequest(
    { dispatch }: StateContext<Friends>,
    { uuid }: AcceptFriendRequests
  ) {
    return this.friendService.acceptFriendRequest(uuid).pipe(
      tap(requests => dispatch(new AcceptFriendRequestsSuccess(uuid))),
      catchError(error => dispatch(new AcceptFriendRequestFailed(error.error)))
    );
  }

  @Action(AcceptFriendRequestsSuccess)
  acceptFriendRequestSuccess(
    { patchState, getState }: StateContext<Friends>,
    { uuid }: AcceptFriendRequestsSuccess
  ) {
    patchState({
      requests: getState().requests.filter(request => request.uuid !== uuid)
    });
  }

  @Action([
    SearchUsersFailed,
    GetFriendRequestFailed,
    AddFriendFailed,
    AcceptFriendRequestFailed
  ])
  error({ dispatch }: StateContext<Friends>, { errors }: any) {
    // Use ngxs Action or this is going to fail because running outside NgZone
    dispatch(new SetErrors(errors));
  }
}
