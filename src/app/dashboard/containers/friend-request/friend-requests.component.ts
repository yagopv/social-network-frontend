import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FriendsState } from '../../store/friend.state';
import { FriendRequest } from '../../models/friend-request.model';
import { Observable } from 'rxjs';
import {
  GetFriendRequests,
  AcceptFriendRequests
} from '../../store/friend.actions';

@Component({
  selector: 'sn-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss']
})
export class FriendRequestsComponent implements OnInit {
  @Select(FriendsState.getFriendRequests) requests$: Observable<
    FriendRequest[]
  >;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFriendRequests());
  }

  acceptRequest({ uuid }: FriendRequest) {
    this.store.dispatch(new AcceptFriendRequests(uuid));
  }
}
