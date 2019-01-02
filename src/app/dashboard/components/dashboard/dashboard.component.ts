import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostViewModel } from 'app/post/models/post.model';
import { Store, Select } from '@ngxs/store';
import { PostState } from 'app/post/post.state';
import { GetPosts } from '../../../post/post.state';

@Component({
  selector: 'hab-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(PostState) posts$: Observable<PostViewModel[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }
}
