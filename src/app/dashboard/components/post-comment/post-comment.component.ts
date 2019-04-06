import { Component, Input } from '@angular/core';
import { Comment } from '../../../modules/dashboard/models/comment.model';
import { Profile } from '../../../modules/auth/models/profile.model';

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
