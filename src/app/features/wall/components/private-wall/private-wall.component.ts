import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { AddFriend } from '../../../friends/store/friend.actions';

@Component({
  selector: 'sn-private-wall',
  templateUrl: './private-wall.component.html',
  styleUrls: ['./private-wall.component.scss']
})
export class PrivateWallComponent {
  constructor(private store: Store, private route: ActivatedRoute) {}

  friendRequest() {
    const routeSnapshot = this.route.snapshot;
    this.store.dispatch(new AddFriend(routeSnapshot.params.userId));
  }
}
