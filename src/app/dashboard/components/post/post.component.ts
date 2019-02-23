import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';

import { Post } from '../../models/post.model';
import { Profile } from '../../../auth/models/profile.model';
import { Comment } from '../../models/comment.model';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../shared/animations/list.animation';
import { PublisherComponent } from '../../../shared/components/publisher/publisher.component';

@Component({
  selector: 'sn-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush // This avoid rerender in another posts
})
export class PostComponent {
  @Input() post: Post;
  @Input() currentUser: Profile;

  @Output() comment = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() like = new EventEmitter();

  @ViewChild(PublisherComponent) publisher: PublisherComponent;

  deleteCommentIcon: IconProp = faTrashAlt;
  commentsPage = 0;
  commentsPageSize = 3;

  toggleLike() {
    this.like.emit();
  }

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

  resetComment() {
    this.publisher.resetContent();
  }
}
