import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';

import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../shared/animations/list.animation';
import { PublisherComponent } from '../../../shared/components/publisher/publisher.component';
import { PostStore } from '../post.store';
import { UserStore } from '../../../core/store/user.store';
import { Profile } from '../../../core/models/user.models';
import { Post, Comment } from '../wall.models';

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

  constructor(private postStore: PostStore, private userStore: UserStore) {}

  addComment(message: string) {
    this.postStore
      .addComment(this.post.id, message, this.userStore.state)
      .subscribe();
  }

  deletePost() {
    this.postStore.deletePost(this.post.id).subscribe();
  }

  toggleLike() {
    this.postStore.like(this.post.id, this.userStore.state).subscribe();
  }

  commentIdentity(index: number, comment: Comment) {
    return comment.id;
  }

  resetComment() {
    this.publisher.resetContent();
  }
}
