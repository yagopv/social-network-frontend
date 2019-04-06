import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Post } from '../../../modules/dashboard/models/post.model';
import { Profile } from '../../../modules/auth/models/profile.model';
import marked from 'marked';

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
  @Input() currentUser: Profile;
  content: string;

  ngOnInit() {
    this.content = marked(this.post.content);
  }
}
