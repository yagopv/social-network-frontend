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
export class FriendRequestsComponent implements OnInit {
  requests$: Observable<FriendRequest[]>;

  constructor(
    private friendRequestsService: FriendRequestsService,
    private friendService: FriendService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.requests$ = this.friendRequestsService.getPendingRequests();
  }

  acceptRequest({ uuid, fullName }: FriendRequest) {
    this.friendRequestsService.acceptFriendRequest(uuid).subscribe(() => {
      this.modalService.open(
        'You have a new friend !!',
        `You and ${fullName} are now friends`
      );
      this.friendService.setState(
        this.friendService.state.map(friend => {
          if (friend.uuid === uuid) {
            friend.request.confirmed = true;
            friend.request.confirmedAt = new Date().getTime();
          }
          return friend;
        })
      );
    });
  }
}
