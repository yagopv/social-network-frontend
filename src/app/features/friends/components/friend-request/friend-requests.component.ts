import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FriendsState } from '../../store/friend.state';
import { Observable } from 'rxjs';
import {
  GetFriendRequests,
  AcceptFriendRequests
} from '../../store/friend.actions';
import { Friend } from '../../models/friend.model';

@Component({
  selector: 'sn-friend-requests',
  templateUrl: './friend-requests.component.html'
})
export class FriendRequestsComponent implements OnInit {
  @Select(FriendsState.getFriendRequests) requests$: Observable<Friend[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFriendRequests());
  }

  acceptRequest({ uuid }: Friend) {
    this.store.dispatch(new AcceptFriendRequests(uuid));
  }
}
