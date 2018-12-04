import { Component, OnInit, Input } from '@angular/core';
import { Post, PostContent } from '../shared/post.model';

@Component({
  selector: 'hab-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  postContent: PostContent;

  ngOnInit() {
    this.postContent = new PostContent(this.post);
  }
}
