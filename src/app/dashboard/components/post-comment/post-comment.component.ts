import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../../models/post.model';
import { LoginResponse } from '../../../auth/models/auth-user.model';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStateModel } from '../../../auth/store/auth.state';

@Component({
  selector: 'hab-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: CommentModel;
  @Input() user: AuthStateModel;

  constructor() {}

  ngOnInit() {}
}
