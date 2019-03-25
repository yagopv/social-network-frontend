import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Post } from '../../models/post.model';
import marked from 'marked';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'sn-post-body',
  template: `
    <div class="post-body" [innerHtml]="content"></div>
  `,
  styleUrls: ['./post-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostBodyComponent implements OnInit {
  @Input() post: Post;
  @Input() currentUser: Profile;
  content: string;

  ngOnInit() {
    this.content = marked(this.post.content);
  }
}
