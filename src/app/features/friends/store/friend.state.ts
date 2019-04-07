import {
  State,
  Action,
  StateContext,
  Selector,
  Store,
  createSelector
} from '@ngxs/store';
import { tap, catchError, map } from 'rxjs/operators';

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
  GetFriendsFailed,
  AddFriend,
  AddFriendSuccess
} from './friend.actions';
import { AuthService } from '../../../core/http/auth.service';
import { FriendService } from '../services/friends.service';
import { Navigate } from '@ngxs/router-plugin';
import { Logout } from '../../auth/store/auth.actions';
import { FriendRequestsService } from '../../friend-requests/services/friend-requests.service';

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
    private store: Store,
    private authService: AuthService,
    private friendService: FriendService,
    private friendRequestsService: FriendRequestsService
  ) {}

  @Selector()
  static getSearchFriends({ friends, userSearch }: Friends) {
    return [...userSearch, ...friends];
  }

  @Selector()
  static getFriendRequests({ requests }: Friends) {
    return requests;
  }

  static getFriend(uuid: string) {
    return createSelector(
      [FriendsState],
      (state: Friends) => {
        return state.friends.find(friend => friend.uuid === uuid);
      }
    );
  }

  @Action(SearchUsers)
  searchUsers(
    { dispatch, getState }: StateContext<Friends>,
    { searchTerm }: SearchUsers
  ) {
    const currentUserId = this.store.snapshot().auth.uuid;
    const friends = getState().friends;

    // Filter out myself and already friends
    return this.authService.search(searchTerm).pipe(
      map(users =>
        users.filter(
          user =>
            user.uuid !== currentUserId &&
            !friends.find(friend => friend.uuid === user.uuid)
        )
      ),
      tap(users => dispatch(new SearchUsersSuccess(users))),
      catchError(error => dispatch(new SearchUsersFailed(error.error)))
    );
  }

  @Action(SearchUsersSuccess)
  searchUsersSuccess(
    { patchState }: StateContext<Friends>,
    { users }: SearchUsersSuccess
  ) {
    patchState({
      userSearch: users
    });
  }

  @Action(GetFriends)
  getFriends({ dispatch, patchState }: StateContext<Friends>) {
    patchState({
      friends: []
    });
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
    patchState({
      friends
    });
  }

  @Action(GetFriendRequests)
  getFriendRequests({ dispatch }: StateContext<Friends>) {
    return this.friendRequestsService.getFriendRequests().pipe(
      tap(requests => dispatch(new GetFriendRequestsSuccess(requests))),
      catchError(error => dispatch(new GetFriendRequestFailed(error.error)))
    );
  }

  @Action(GetFriendRequestsSuccess)
  getFriendRequestsSuccess(
    { patchState }: StateContext<Friends>,
    { requests }: GetFriendRequestsSuccess
  ) {
    patchState({
      requests: requests.filter(request => !request.request.confirmed)
    });
  }

  @Action(AcceptFriendRequests)
  acceptFriendRequest(
    { dispatch }: StateContext<Friends>,
    { uuid }: AcceptFriendRequests
  ) {
    return this.friendRequestsService.acceptFriendRequest(uuid).pipe(
      tap(() => dispatch(new AcceptFriendRequestsSuccess(uuid))),
      catchError(error => dispatch(new AcceptFriendRequestFailed(error.error)))
    );
  }

  @Action(AcceptFriendRequestsSuccess)
  acceptFriendRequestSuccess(
    { patchState, getState }: StateContext<Friends>,
    { uuid }: AcceptFriendRequestsSuccess
  ) {
    patchState({
      friends: getState().friends.map(friend => {
        if (friend.uuid === uuid) {
          return {
            ...friend,
            request: {
              ...friend.request,
              confirmedAt: new Date().getTime()
            }
          };
        }
        return friend;
      }),
      requests: getState().requests.filter(request => request.uuid !== uuid)
    });
  }

  @Action(AddFriend)
  addFriend({ dispatch }: StateContext<Friends>, { friend }: AddFriend) {
    return this.friendRequestsService.addFriend(friend).pipe(
      tap(() => dispatch(new AddFriendSuccess())),
      catchError(error => dispatch(new AddFriendFailed(error.error)))
    );
  }

  @Action(AddFriendSuccess)
  addFriendSuccess({ dispatch }: StateContext<Friends>) {
    dispatch(
      new Navigate([
        '',
        { outlets: { popup: ['notification', 'request-new-friend'] } }
      ])
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<Friends>) {
    setState({
      friends: [],
      userSearch: [],
      requests: []
    });
  }
}
