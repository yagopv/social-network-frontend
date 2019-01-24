import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PostState } from '../../store/post.state';
import { GetPosts, Publish, AddComment } from '../../store/post.actions';
import { PostStateModel } from '../../models/post-state.model';
import { PostModel } from '../../models/post.model';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'hab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(PostState.getPosts) posts$: Observable<PostStateModel>;
  @Select(AuthState.getUser) user$: Profile;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }

  publishPost(content: string) {
    this.store.dispatch(new Publish({ content }));
  }

  publishComment({ postId, message }: { postId: string; message: string }) {
    this.store.dispatch(new AddComment(postId, message));
  }

  postIdentity(index: number, post: PostModel) {
    return post.id;
  }
}
