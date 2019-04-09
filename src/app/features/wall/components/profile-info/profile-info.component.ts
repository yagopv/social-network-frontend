import { Component, Input } from '@angular/core';
import { Friend } from '../../../friends/models/friend.model';

@Component({
  selector: 'sn-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {
  @Input() user: Friend;
}
