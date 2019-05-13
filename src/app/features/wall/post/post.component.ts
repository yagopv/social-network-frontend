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
import { SocialNetworkUser } from '../../../core/core.models';
import { Post, Comment } from '../wall.models';
import { UserService } from '../../../core/services/user.service';
import { WallService } from '../wall.service';

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

  constructor(
    private wallService: WallService,
    private userService: UserService
  ) {}

  addComment(message: string) {
    this.wallService
      .addComment(this.post.id, message, this.userService.currentUser)
      .subscribe(() => {
        this.publisher.resetContent();
        this.publisher.resetHeight();
      });
  }

  deletePost() {
    this.wallService.deletePost(this.post.id).subscribe();
  }

  toggleLike() {
    this.wallService
      .like(this.post.id, this.userService.currentUser)
      .subscribe();
  }

  commentIdentity(index: number, comment: Comment) {
    return comment.id;
  }

  resetComment() {
    this.publisher.resetContent();
  }
}
