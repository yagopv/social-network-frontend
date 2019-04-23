import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SocialNetworkUser } from '../../../core/core.models';

@Component({
  selector: 'sn-friend',
  templateUrl: './friend.component.html'
})
export class FriendComponent {
  @Input() friend: SocialNetworkUser;
  @Output() accept = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  acceptRequest($event: MouseEvent) {
    this.accept.emit(this.friend.uuid);
    $event.preventDefault();
    $event.stopPropagation();
  }

  addFriend($event: MouseEvent) {
    this.add.emit(this.friend.uuid);
    $event.preventDefault();
    $event.stopPropagation();
  }
  removeFriend($event: MouseEvent) {
    this.remove.emit(this.friend.uuid);
    $event.preventDefault();
    $event.stopPropagation();
  }

  getSearchStatus(user: SocialNetworkUser) {
    if (user['request']) {
      if (user['request'].confirmedAt === 0) {
        return 'pending bg-light text-dark';
      } else {
        return 'is-friend bg-primary text-light';
      }
    }
    return 'not-friend bg-info text-light';
  }
}
