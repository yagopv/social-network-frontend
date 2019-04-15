import { Component, OnInit } from '@angular/core';
import { FriendRequestsStore } from '../friend-requests.store';
import { Observable } from 'rxjs';
import { FriendRequest } from '../friend-requests.models';

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
