import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import marked from 'marked';
import { SocialNetworkUser } from '../../../core/core.models';
import { Post } from '../wall.models';

@Component({
  selector: 'sn-post-body',
  template: `
    <div class="card-body" [innerHtml]="content"></div>
  `,
  styleUrls: ['./post-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostBodyComponent implements OnInit {
  @Input() post: Post;
  @Input() currentUser: SocialNetworkUser;
  content: string;

  ngOnInit() {
    this.content = marked(this.post.content);
  }
}
