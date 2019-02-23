import { Component, Input } from '@angular/core';
import { Profile } from '../../../auth/models/profile.model';
import { Author } from '../../../dashboard/models/author.model';
import { Friend } from '../../../dashboard/models/friend.model';

@Component({
  selector: 'sn-avatar',
  template: `
    <img [src]="imageUrl" [ngStyle]="{ width: width, height: height }" />
  `,
  styles: [
    `
      img {
        border-radius: 50%;
      }
    `
  ]
})
export class AvatarComponent {
  imageUrl = '';

  @Input()
  set user(user: Profile | Author | Friend) {
    if (user.avatarUrl !== undefined) {
      this.imageUrl =
        user.avatarUrl || `https://api.adorable.io/avatars/128/${user.uuid}`;
    }
  }

  @Input() width: string;
  @Input() height: string;
}
