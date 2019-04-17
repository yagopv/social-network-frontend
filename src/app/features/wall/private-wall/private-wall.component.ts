import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendRequestsStore } from '../../../core/store/friend-requests.store';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'sn-private-wall',
  templateUrl: './private-wall.component.html'
})
export class PrivateWallComponent {
  constructor(
    private friendRequestStore: FriendRequestsStore,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  friendRequest() {
    const routeSnapshot = this.route.snapshot;

    this.friendRequestStore
      .addFriend(routeSnapshot.params.userId)
      .subscribe(() =>
        this.modalService.open(
          'You request has been sent',
          'You have to wait until the request will be accepted'
        )
      );
  }
}
