import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LIST_ITEMS_ANIMATION } from '../../../shared/animations/list.animation';
import { Router } from '@angular/router';
import { Friend } from '../../../core/core.models';
import { ModalService } from '../../../core/services/modal.service';
import { FriendRequestsService } from '../../../core/services/friend-requests.service';
import { FriendService } from '../../../core/services/friends.service';

@Component({
  selector: 'sn-friends',
  templateUrl: './friends.component.html',
  animations: [LIST_ITEMS_ANIMATION]
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Friend[]>;

  constructor(
    private friendRequestService: FriendRequestsService,
    public friendService: FriendService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    if (!this.friendService.friends || !this.friendService.friends.length) {
      this.friendService.getFriends().subscribe();
    }
  }

  searchUsers(searchTerm: string) {
    this.friendService.search(searchTerm).subscribe();
  }

  acceptFriendRequest(uuid: string, friend: Friend) {
    this.friendRequestService
      .acceptFriendRequest(uuid)
      .subscribe(() =>
        this.modalService.open(
          'You have a new friend !!',
          `You and ${friend.fullName} are now friends`
        )
      );
  }
  addFriend(uuid: string, friend: Friend) {
    this.friendRequestService.addFriend(uuid).subscribe(() => {
      this.modalService.open(
        'You request has been sent',
        `When ${
          friend.fullName
        } accepts your request then you are going to see him in this list`
      );
    });
  }

  removeFriend(uuid: string) {
    console.log('Not implemented in backend!!');
  }

  navigateToWall(uuid: string) {
    this.router.navigate(['/wall', uuid]);
  }
}
