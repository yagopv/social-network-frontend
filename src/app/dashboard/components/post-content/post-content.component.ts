import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { markViewDirty } from '@angular/core/src/render3/instructions';
import marked from 'marked';

@Component({
  selector: 'sn-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() post: Post;

  content: string;

  ngOnInit() {
    this.content = marked(this.post.content);
  }
}
