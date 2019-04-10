import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendRequestsStore } from '../../../friend-requests/services/friend-requests.store';

@Component({
  selector: 'sn-private-wall',
  templateUrl: './private-wall.component.html',
  styleUrls: ['./private-wall.component.scss']
})
export class PrivateWallComponent {
  constructor(
    private friendRequestStore: FriendRequestsStore,
    private route: ActivatedRoute
  ) {}

  friendRequest() {
    const routeSnapshot = this.route.snapshot;

    this.friendRequestStore.addFriend(routeSnapshot.params.userId);
  }
}
