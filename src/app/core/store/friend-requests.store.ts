import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { FriendRequestsService } from '../services/friend-requests.service';
import { FriendRequest } from '../core.models';
import { FriendStore } from './friend.store';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsStore extends Store<FriendRequest[]> {
  constructor(
    private friendRequestsService: FriendRequestsService,
    private friendStore: FriendStore
  ) {
    super([]);
    this.friendRequestsService
      .getFriendRequests()
      .subscribe(requests => this.setState(requests));
  }

  getPendingRequests() {
    return this.state$.pipe(
      map(friendRequests =>
        friendRequests.filter(friendRequest => !friendRequest.request.confirmed)
      )
    );
  }

  acceptFriendRequest(uuid: string) {
    return this.friendRequestsService
      .acceptFriendRequest(uuid)
      .pipe(
        tap(() =>
          this.setState(
            this.state.filter(friendRequest => friendRequest.uuid !== uuid)
          )
        )
      );
  }

  addFriend(uuid: string) {
    return this.friendRequestsService.addFriend(uuid);
  }
}
