import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LIST_ITEMS_ANIMATION } from '../../../shared/animations/list.animation';
import { Router } from '@angular/router';
import { FriendStore } from '../../../core/store/friend.store';
import { FriendRequestsStore } from '../../../core/store/friend-requests.store';
import { Friend } from '../../../core/core.models';
import { ModalService } from '../../../core/services/modal.service';

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
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.friends$ = this.friendStore.state$;
  }

  searchUsers(searchTerm: string) {
    this.friends$ = this.friendStore.getSearchUsers(searchTerm);
  }

  acceptFriendRequest(uuid: string) {
    this.friendRequestStore
      .acceptFriendRequest(uuid)
      .subscribe(() =>
        this.modalService.open(
          'Your request has been emitted',
          'Now you have to wait until the request will be accepted'
        )
      );
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
