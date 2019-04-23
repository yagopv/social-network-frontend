import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FriendsState } from '../../store/friend.state';
import { Friends } from '../../models/friends.model';
import { Observable } from 'rxjs';
import {
  GetFriends,
  AddFriend,
  AcceptFriendRequests
} from '../../store/friend.actions';
import { LIST_ITEMS_ANIMATION } from '../../../shared/animations/list.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  animations: [LIST_ITEMS_ANIMATION]
})
export class FriendsComponent implements OnInit {
  @Select(FriendsState.getSearchFriends) friends$: Observable<Friends>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {}

  acceptFriendRequest(uuid: string) {
    this.store.dispatch(new AcceptFriendRequests(uuid));
  }

  addFriend(uuid: string) {
    this.store.dispatch(new AddFriend(uuid));
  }

  removeFriend(uuid: string) {
    console.log(uuid);
  }

  navigateToWall(uuid: string) {
    this.router.navigate(['/user', uuid, 'wall']);
  }
}
