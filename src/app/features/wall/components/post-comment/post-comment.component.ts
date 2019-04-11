import { Component, Input } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { Profile } from '../../../../core/models/user.models';

@Component({
  selector: 'sn-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {
  @Input() comment: Comment;
  @Input() currentUser: Profile;

  getLink(uuid: string) {
    if (uuid === this.currentUser.uuid) {
      return ['/wall'];
    } else {
      return ['/user', uuid, 'wall'];
    }
  }
}
