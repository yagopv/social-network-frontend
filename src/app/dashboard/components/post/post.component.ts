import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Post } from '../../models/post.model';
import { Profile } from '../../../auth/models/profile.model';
import { Comment } from '../../models/comment.model';
import {
  faTrashAlt,
  faPlusCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../shared/animations/list.animation';

@Component({
  selector: 'sn-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION]
})
export class PostComponent {
  @Input() post: Post;
  @Input() user: Profile;
  @Output() comment = new EventEmitter();
  @Output() delete = new EventEmitter();

  deleteCommentIcon: IconProp = faTrashAlt;
  commentsPage = 0;
  commentsPageSize = 3;
  moreCommentsIcon = faPlusCircle;
  lessCommentsIcon = faMinusCircle;

  addComment(content: string) {
    this.comment.emit({
      postId: this.post.id,
      message: content
    });
  }

  deletePost() {
    this.delete.emit(this.post.id);
  }

  commentIdentity(index: number, comment: Comment) {
    return comment.id;
  }
}
