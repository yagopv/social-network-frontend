import { Component, Input } from '@angular/core';
import { SocialNetworkUser } from '../../../core/core.models';

@Component({
  selector: 'sn-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent {
  @Input() user: SocialNetworkUser;
}
