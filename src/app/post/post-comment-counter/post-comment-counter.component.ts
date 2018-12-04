import { Component, OnInit, Input } from '@angular/core';
import { PostCommentCounter } from '../shared/post.model';

@Component({
  selector: 'hab-post-comment-counter',
  templateUrl: './post-comment-counter.component.html',
  styleUrls: ['./post-comment-counter.component.scss']
})
export class PostCommentCounterComponent implements OnInit {
  @Input() count: number;

  constructor() {}

  ngOnInit() {}
}
