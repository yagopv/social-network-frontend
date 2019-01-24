import { Component, Input } from '@angular/core';
import { CommentModel } from '../../models/post.model';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'hab-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent {
  @Input() comment: CommentModel;
  @Input() user: Profile;
}
