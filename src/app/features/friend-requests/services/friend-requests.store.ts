import { Store } from '../../../shared/store/store';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequest } from '../models/friend-requests.models';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestsStore extends Store<FriendRequest[]> {
  constructor(private friendRequestsService: FriendRequestsService) {
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
    this.friendRequestsService
      .acceptFriendRequest(uuid)
      .subscribe(() =>
        this.setState(
          this.state.filter(friendRequest => friendRequest.uuid !== uuid)
        )
      );
  }
}
