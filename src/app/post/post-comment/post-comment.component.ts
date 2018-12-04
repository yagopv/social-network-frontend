import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from '../shared/post.model';

@Component({
  selector: 'hab-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: PostComment;

  constructor() {}

  ngOnInit() {}
}
