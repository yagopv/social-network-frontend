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
  selector: 'sn-friends-request',
  templateUrl: './friends-request.component.html',
  styleUrls: ['./friends-request.component.scss']
})
export class FriendsRequestComponent implements OnInit {
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
