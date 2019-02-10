import { Component, OnInit, ElementRef } from '@angular/core';

import { Observable } from 'rxjs';
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
import { Profile, Friend } from '../../../auth/models/profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LIST_ANIMATION,
  LIST_ITEMS_ANIMATION
} from '../../../shared/animations/list.animation';
import { ErrorState } from '../../../error/store/error.state';
import { Error } from '../../../error/models/error.model';

@Component({
  selector: 'sn-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  animations: [LIST_ANIMATION, LIST_ITEMS_ANIMATION]
})
export class WallComponent implements OnInit {
  @Select(PostState.getPosts) posts$: Observable<Post[]>;
  @Select(AuthState.getUser) user$: Observable<Profile>;
  @Select(state => state.friends) friends$: Observable<Friend[]>;
  @Select(ErrorState) errors$: Observable<Error>;

  content: string;

  wallOwner: string;
  placeholder: string;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private element: ElementRef
  ) {}

  ngOnInit() {
    // We should subscribe as Angular does not renrender if only the param of thhe route change
    this.route.params.subscribe(routeParams => {
      this.wallOwner = routeParams.userId;
      this.store.dispatch(new GetPosts(this.wallOwner));

      this.placeholder = this.wallOwner
        ? 'Leave a comment'
        : 'What are you thinking?';

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
