import { Component, Input } from '@angular/core';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'hab-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent {
  @Input() user: Profile;
}
