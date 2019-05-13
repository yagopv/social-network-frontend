import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequest } from '../../../core/core.models';
import { ModalService } from '../../../core/services/modal.service';
import { FriendRequestsService } from '../../../core/services/friend-requests.service';
import { FriendService } from '../../../core/services/friends.service';

@Component({
  selector: 'sn-friend-requests',
  templateUrl: './friend-requests.component.html'
})
export class FriendRequestsComponent {
  constructor(
    public friendRequestsService: FriendRequestsService,
    private friendService: FriendService,
    private modalService: ModalService
  ) {}

  acceptRequest({ uuid, fullName }: FriendRequest) {
    this.friendRequestsService.acceptFriendRequest(uuid).subscribe(() => {
      this.modalService.open(
        'You have a new friend !!',
        `You and ${fullName} are now friends`
      );
      this.friendService.friends = this.friendService.friends.map(friend => {
        if (friend.uuid === uuid) {
          friend.request.confirmed = true;
          friend.request.confirmedAt = new Date().getTime();
        }
        return friend;
      });
    });
  }
}
