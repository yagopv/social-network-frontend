import {
  State,
  Action,
  StateContext,
  Selector,
  Store,
  createSelector
} from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';

import { Friends } from '../models/friends.model';
import {
  AddFriendFailed,
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
      })
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
