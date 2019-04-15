import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequest } from '../../../core/core.models';
import { FriendRequestsStore } from '../../../core/store/friend-requests.store';

@Component({
  selector: 'sn-friend-requests',
  templateUrl: './friend-requests.component.html'
})
export class FriendRequestsComponent implements OnInit {
  requests$: Observable<FriendRequest[]>;

  constructor(private friendRequestsStore: FriendRequestsStore) {}

  ngOnInit() {
    this.requests$ = this.friendRequestsStore.getPendingRequests();
  }

  acceptRequest({ uuid }: FriendRequest) {
    this.friendRequestsStore.acceptFriendRequest(uuid);
  }
}
