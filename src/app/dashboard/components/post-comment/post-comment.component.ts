import { Component, Input } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'sn-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {
  @Input() comment: Comment;
  @Input() user: Profile;
}
