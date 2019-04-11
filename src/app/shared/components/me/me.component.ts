import { Component, Input } from '@angular/core';
import { Profile } from '../../../core/models/user.models';

@Component({
  selector: 'sn-me',
  templateUrl: './me.component.html'
})
export class MeComponent {
  @Input() user: Profile;
}
