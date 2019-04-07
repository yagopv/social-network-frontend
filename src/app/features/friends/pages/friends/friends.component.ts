import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FriendsState } from '../../store/friend.state';
import { Observable } from 'rxjs';
import { AddFriend, AcceptFriendRequests } from '../../store/friend.actions';
import { LIST_ITEMS_ANIMATION } from '../../../../shared/animations/list.animation';
import { Router } from '@angular/router';
import { Friends } from '../../models/friends.model';

@Component({
  selector: 'sn-friends',
  templateUrl: './friends.component.html',
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
