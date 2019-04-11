import { Component, Input } from '@angular/core';
import { Profile } from '../../../features/auth/models/profile.model';

@Component({
  selector: 'sn-me',
  templateUrl: './me.component.html'
})
export class MeComponent {
  @Input() user: Profile;
}
