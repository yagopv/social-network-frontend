import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Post } from '../../models/post.model';
import { Profile } from '../../../auth/models/profile.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'hab-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post;
  @Input() user: Profile;
  @Output() publishComment = new EventEmitter();

  addComment(content: string) {
    this.publishComment.emit({
      postId: this.post.id,
      message: content
    });
  }

  commentIdentity(index: number, comment: Comment) {
    return comment.id;
  }
}
