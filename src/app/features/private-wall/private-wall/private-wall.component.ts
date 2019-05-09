import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';
import { FriendRequestsService } from '../../../core/services/friend-requests.service';

@Component({
  selector: 'sn-private-wall',
  templateUrl: './private-wall.component.html'
})
export class PrivateWallComponent {
  constructor(
    private friendRequestService: FriendRequestsService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  friendRequest($event: MouseEvent) {
    const routeSnapshot = this.route.snapshot;

    this.friendRequestService
      .addFriend(routeSnapshot.params.userId)
      .subscribe(() =>
        this.modalService.open(
          'You request has been sent',
          'You have to wait until the request will be accepted'
        )
      );

    $event.preventDefault();
    $event.stopPropagation();
  }
}
