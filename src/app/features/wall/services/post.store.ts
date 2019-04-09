import { Injectable } from '@angular/core';
import { Store } from '../../../shared/store/store';
import { Post } from '../models/post.model';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostStore extends Store<Post[]> {
  constructor(private postService: PostService) {
    super([]);
  }

  getPosts(postId?: string) {
    this.postService.getWall(postId).subscribe(posts => this.setState(posts));
  }
}
