import { Component, OnInit, Input } from '@angular/core';
import { PostContentViewModel } from '../shared/post.model';

@Component({
  selector: 'hab-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() postContent: PostContentViewModel;

  constructor() {}

  ngOnInit() {}
}
