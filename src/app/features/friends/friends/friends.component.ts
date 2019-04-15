import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LIST_ITEMS_ANIMATION } from '../../../shared/animations/list.animation';
import { Router } from '@angular/router';
import { FriendStore } from '../friend.store';
import { FriendRequestsStore } from '../../friend-requests/friend-requests.store';
import { Friend } from '../friends.models';

@Component({
  selector: 'sn-friends',
  templateUrl: './friends.component.html',
  animations: [LIST_ITEMS_ANIMATION]
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Friend[]>;

  constructor(
    private friendRequestStore: FriendRequestsStore,
    private friendStore: FriendStore,
    private router: Router
  ) {}

  ngOnInit() {
    this.friends$ = this.friendStore.state$;
  }

  searchUsers(searchTerm: string) {
    this.friends$ = this.friendStore.getSearchUsers(searchTerm);
  }

  acceptFriendRequest(uuid: string) {
    this.friendRequestStore.acceptFriendRequest(uuid);
  }
  addFriend(uuid: string) {
    this.friendRequestStore.addFriend(uuid).subscribe();
  }

  removeFriend(uuid: string) {
    console.log('Not implemented in backend!!');
  }

  navigateToWall(uuid: string) {
    this.router.navigate(['/user', uuid, 'wall']);
  }
}
