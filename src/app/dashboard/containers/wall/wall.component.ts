import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, Select, Actions, ofAction } from '@ngxs/store';

import { PostState } from '../../store/post.state';
import {
  GetPosts,
  AddPost,
  AddPostSuccess,
  AddCommentSuccess
} from '../../store/post.actions';
import { Post } from '../../models/post.model';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../shared/animations/list.animation';
import { ErrorState } from '../../../error/store/error.state';
import { Error } from '../../../error/models/error.model';
import { FriendsState } from '../../store/friend.state';
import { Friend } from '../../models/friend.model';
import { PublisherComponent } from '../../../shared/components/publisher/publisher.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'sn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION]
})
export class WallComponent implements OnInit {
  @Select(PostState) posts$: Observable<Post[]>;
  @Select(AuthState.getUser) currentUser$: Observable<Profile>;
  @Select(ErrorState) errors$: Observable<Error>;
  @ViewChild(PublisherComponent) publisher: PublisherComponent;
  @ViewChildren(PostComponent) posts: QueryList<PostComponent>;

  friend: Friend;
  content: string;
  placeholder = '';
  postPage = 0;
  postPageSize = 10;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private element: ElementRef,
    private actions$: Actions
  ) {}

  ngOnInit() {
    // We should subscribe as Angular does not re render if only the param of the route change
    this.route.params.subscribe(routeParams => {
      this.store.dispatch(new GetPosts(routeParams.userId));
      if (routeParams.userId) {
        this.store
          .select(FriendsState.getFriend(routeParams.userId))
          .subscribe((friend: Friend) => {
            if (friend) {
              this.friend = friend;
              this.placeholder = `Leave a comment to ${friend.fullName}`;
            }
          });
      } else {
        this.placeholder = 'What are you thinking?';
      }
      this.postPage = 0;
      this.element.nativeElement.parentElement.scrollTop = 0;
    });

    this.actions$.pipe(ofAction(AddPostSuccess)).subscribe(() => {
      this.publisher.resetContent();
      this.publisher.resetHeight();
    });

    this.actions$.pipe(ofAction(AddCommentSuccess)).subscribe(({ postId }) => {
      const post = this.posts.find(
        postComponent => postComponent.post.id === postId
      );
      if (post) {
        post.resetComment();
      }
    });
  }

  publishPost(content: string) {
    const uuid = this.friend && this.friend.uuid;
    this.store.dispatch(new AddPost({ content, uuid }));
  }

  postIdentity(index: number, post: Post) {
    return post.id;
  }
}
