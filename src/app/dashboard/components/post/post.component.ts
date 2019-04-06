import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';

import { Store } from '@ngxs/store';
import {
  DeletePost,
  AddComment,
  Like
} from '../../../modules/dashboard/store/post.actions';
import {
  LIST_ITEMS_ANIMATION,
  LIST_ANIMATION
} from '../../../shared/animations/list.animation';
import { Profile } from '../../../modules/auth/models/profile.model';
import { Post } from '../../../modules/dashboard/models/post.model';
import { PublisherComponent } from '../../../shared/components/publisher/publisher.component';
import { Comment } from '../../../modules/dashboard/models/comment.model';

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
