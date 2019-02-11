import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PostState } from '../../store/post.state';
import {
  GetPosts,
  AddPost,
  AddComment,
  DeletePost
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

@Component({
  selector: 'sn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION]
})
export class WallComponent implements OnInit {
  @Select(PostState.getPosts) posts$: Observable<Post[]>;
  @Select(AuthState.getUser) currentUser$: Observable<Profile>;
  @Select(ErrorState) errors$: Observable<Error>;

  friend: Friend;
  content: string;
  wallOwner: string;
  placeholder = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private element: ElementRef
  ) {}

  ngOnInit() {
    // We should subscribe as Angular does not renrender if only the param of thhe route change
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
      this.element.nativeElement.parentElement.scrollTop = 0;
    });
  }

  publishPost(content: string) {
    this.store
      .dispatch(new AddPost({ content, uuid: this.wallOwner }))
      .subscribe(() => (this.content = ''));
  }

  addComment({ postId, message }: { postId: string; message: string }) {
    this.store.dispatch(new AddComment(postId, message));
  }

  deletePost(uuid: string) {
    this.store.dispatch(new DeletePost(uuid));
  }

  postIdentity(index: number, post: Post) {
    return post.id;
  }
}
