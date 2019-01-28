import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PostState } from '../../store/post.state';
import {
  GetPosts,
  AddPost,
  AddComment,
  DeletePost
} from '../../store/post.actions';
import { PostCollection } from '../../models/post-collection.model';
import { Post } from '../../models/post.model';
import { AuthState } from '../../../auth/store/auth.state';
import { Profile } from '../../../auth/models/profile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(PostState.getPosts) posts$: Observable<PostCollection>;
  @Select(AuthState.getUser) user$: Profile;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts(this.route.snapshot.params.userId));
  }

  publishPost(content: string) {
    this.store.dispatch(new AddPost({ content }));
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
