import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sn-post-comment-counter',
  templateUrl: './post-comment-counter.component.html',
  styleUrls: ['./post-comment-counter.component.scss']
})
export class PostCommentCounterComponent implements OnInit {
  @Input() count: number;

  constructor() {}

  ngOnInit() {}
}
