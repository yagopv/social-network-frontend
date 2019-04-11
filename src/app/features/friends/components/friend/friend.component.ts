import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Friend } from '../../models/friend.model';
import { Profile } from '../../../../core/models/user.models';

@Component({
  selector: 'sn-friend',
  templateUrl: './friend.component.html'
})
export class FriendComponent {
  @Input() friend: Profile | Friend;
  @Output() accept = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  acceptRequest() {
    this.accept.emit(this.friend.uuid);
  }

  addFriend() {
    this.add.emit(this.friend.uuid);
  }
  removeFriend() {
    this.remove.emit(this.friend.uuid);
  }

  getSearchStatus(user: Profile | Friend) {
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
