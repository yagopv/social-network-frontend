import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../../auth/models/profile.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Friend } from '../../models/friend.model';

@Component({
  selector: 'sn-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent {
  @Input() friend: Profile | Friend;
  @Output() accept = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  addIcon: IconProp = faPlus;
  removeIcon: IconProp = faTrashAlt;

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
        return 'pending';
      } else {
        return 'is-friend';
      }
    }
    return 'not-friend';
  }
}
