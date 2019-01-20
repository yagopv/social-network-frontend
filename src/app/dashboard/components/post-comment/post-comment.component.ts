import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../../models/post.model';

@Component({
  selector: 'hab-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: CommentModel;

  constructor() {}

  ngOnInit() {}
}
