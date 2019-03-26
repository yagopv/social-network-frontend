import { Component, Input, OnDestroy } from '@angular/core';
import { Profile } from '../../../auth/models/profile.model';
import { Author } from '../../../dashboard/models/author.model';
import { Friend } from '../../../dashboard/models/friend.model';
import { FADE_IN_OUT_ANIMATION } from '../../animations/fade.animation';

@Component({
  selector: 'sn-avatar',
  template: `
    <img
      [@fade]="fadeAnimValue"
      [src]="imageUrl"
      [ngStyle]="{ width: width, height: height, 'min-width': width }"
    />
  `,
  styles: [
    `
      img {
        border-radius: 50%;
      }
    `
  ],
  animations: [FADE_IN_OUT_ANIMATION]
})
export class AvatarComponent implements OnDestroy {
  imageUrl = '';
  fadeAnimValue = 'in';

  @Input()
  set user(user: Profile | Author | Friend) {
    if (user.avatarUrl !== undefined) {
      this.imageUrl =
        user.avatarUrl || `https://api.adorable.io/avatars/128/${user.uuid}`;
    }
  }

  @Input() width = '40px';
  @Input() height = '40px';

  ngOnDestroy() {
    this.fadeAnimValue = 'out';
  }
}
