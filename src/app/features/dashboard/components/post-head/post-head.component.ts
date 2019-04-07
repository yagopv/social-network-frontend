import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post.model';

import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'sn-post-head',
  templateUrl: './post-head.component.html',
  styleUrls: ['./post-head.component.scss']
})
export class PostHeadComponent implements OnInit {
  @Input() post: Post;
  @Input() currentUser: Profile;

  arrowRight: IconProp = faLongArrowAltRight;
  constructor() {}

  ngOnInit() {}

  getLink(uuid: string) {
    if (uuid === this.currentUser.uuid) {
      return ['/wall'];
    } else {
      return ['/user', uuid, 'wall'];
    }
  }
}
