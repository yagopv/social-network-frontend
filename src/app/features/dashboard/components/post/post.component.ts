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
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../../shared/animations/list.animation';
import { PublisherComponent } from '../../../../shared/components/publisher/publisher.component';
import { Store } from '@ngxs/store';
import { DeletePost, AddComment, Like } from '../../store/post.actions';

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

  @ViewChild(PublisherComponent) publisher: PublisherComponent;

  commentsPage = 0;
  commentsPageSize = 3;

  constructor(private store: Store) {}

  addComment(message: string) {
    this.store.dispatch(new AddComment(this.post.id, message));
  }

  deletePost() {
    this.store.dispatch(new DeletePost(this.post.id));
  }

  toggleLike() {
    this.store.dispatch(new Like(this.post.id));
  }

  commentIdentity(index: number, comment: Comment) {
    return comment.id;
  }

  resetComment() {
    this.publisher.resetContent();
  }
}
