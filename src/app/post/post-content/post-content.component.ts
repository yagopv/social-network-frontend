import { Component, OnInit, Input } from '@angular/core';
import { PostContent } from '../shared/post.model';

@Component({
  selector: 'hab-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() postContent: PostContent;

  constructor() {}

  ngOnInit() {}
}
