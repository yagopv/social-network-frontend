import { Component, Input } from '@angular/core';
import { SocialNetworkUser } from '../../../core/core.models';
import { Comment } from '../wall.models';

@Component({
  selector: 'sn-post-comment',
  templateUrl: './post-comment.component.html'
})
export class PostCommentComponent {
  @Input() comment: Comment;
  @Input() currentUser: SocialNetworkUser;

  getLink(uuid: string) {
    if (uuid === this.currentUser.uuid) {
      return ['/wall'];
    } else {
      return ['/user', uuid, 'wall'];
    }
  }
}
