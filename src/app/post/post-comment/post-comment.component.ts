import { Component, OnInit, Input } from '@angular/core';
import { PostCommentViewModel } from '../shared/post.model';

@Component({
  selector: 'hab-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: PostCommentViewModel;

  constructor() {}

  ngOnInit() {}
}
