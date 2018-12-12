import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetPosts } from 'app/post/store/actions';
import * as fromPosts from 'app/post/store/reducer';
import { Observable } from 'rxjs';
import { PostViewModel } from 'app/post/models/post.model';
@Component({
  selector: 'hab-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts$: Observable<PostViewModel[]>;

  constructor(private store: Store<fromPosts.PostsState>) {
    this.posts$ = store.pipe(select(fromPosts.getPosts));
  }

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }
}
