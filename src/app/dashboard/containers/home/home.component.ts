import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PostState } from '../../store/post.state';
import { GetPosts, Publish } from '../../store/post.actions';
import { PostStateModel } from '../../models/post-state.model';

@Component({
  selector: 'hab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(PostState.getPostsByDate) posts$: Observable<PostStateModel>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }

  publishPost(content: string) {
    this.store.dispatch(new Publish({ content }));
  }
}
