import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { PostState } from '../../store/post.state';
import { PostViewModel } from '../../models/post.model';
import { GetPosts } from '../../store/post.actions';

@Component({
  selector: 'hab-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(PostState) posts$: Observable<PostViewModel[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }
}
