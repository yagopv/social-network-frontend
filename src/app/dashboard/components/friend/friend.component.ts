import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Profile } from '../../../auth/models/profile.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sn-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent {
  @Input() friend: Profile;
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  addIcon: IconProp = faPlus;
  removeIcon: IconProp = faTrashAlt;

  addFriend() {
    this.add.emit(this.friend.uuid);
  }
  removeFriend() {
    this.remove.emit(this.friend.uuid);
  }
}
