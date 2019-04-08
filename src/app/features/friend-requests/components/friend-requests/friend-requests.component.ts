import { Component, OnInit } from '@angular/core';
import { Friend } from '../../../friends/models/friend.model';
import { FriendRequestsStore } from '../../services/friend-requests.store';
import { Observable } from 'rxjs';
import { FriendRequest } from '../../models/friend-requests.models';

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

  acceptRequest({ uuid }: Friend) {
    this.friendRequestsStore.acceptFriendRequest(uuid);
  }
}
