import { Component, Input } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { AuthUserModel } from '../../../auth/models/auth-user.model';

@Component({
  selector: 'hab-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: PostModel;
  @Input() currentUser: AuthUserModel;
}
