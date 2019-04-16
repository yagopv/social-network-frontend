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
import { WallStore } from '../wall.store';
import { UserStore } from '../../../core/store/user.store';
import { SocialNetworkUser } from '../../../core/core.models';
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
  @Input() currentUser: SocialNetworkUser;

  @ViewChild(PublisherComponent) publisher: PublisherComponent;

  commentsPage = 0;
  commentsPageSize = 3;

  constructor(private postStore: WallStore, private userStore: UserStore) {}

  addComment(message: string) {
    this.postStore
      .addComment(this.post.id, message, this.userStore.state)
      .subscribe(() => {
        this.publisher.resetContent();
        this.publisher.resetHeight();
      });
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
