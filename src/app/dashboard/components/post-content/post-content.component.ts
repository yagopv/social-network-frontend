import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'hab-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() post: PostModel;

  constructor() {}

  ngOnInit() {}
}
