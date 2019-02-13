import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Post } from '../../models/post.model';
import marked from 'marked';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../../../auth/models/profile.model';

@Component({
  selector: 'sn-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostContentComponent implements OnInit {
  @Input() post: Post;
  @Input() currentUser: Profile;
  arrowRight: IconProp = faLongArrowAltRight;
  content: string;

  ngOnInit() {
    this.content = marked(this.post.content);
  }

  getLink(uuid: string) {
    if (uuid === this.currentUser.uuid) {
      return ['/wall'];
    } else {
      return ['/user', uuid, 'wall'];
    }
  }
}
