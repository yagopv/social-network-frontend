import { Component, OnInit, Input } from '@angular/core';
import { SocialNetworkUser } from '../../../core/core.models';
import { Post } from '../wall.models';

@Component({
  selector: 'sn-post-head',
  templateUrl: './post-head.component.html',
  styleUrls: ['./post-head.component.scss']
})
export class PostHeadComponent implements OnInit {
  @Input() post: Post;
  @Input() currentUser: SocialNetworkUser;

  constructor() {}

  ngOnInit() {}

  getLink(uuid: string) {
    if (uuid === this.currentUser.uuid) {
      return ['/wall'];
    } else {
      return ['/wall', uuid];
    }
  }
}
