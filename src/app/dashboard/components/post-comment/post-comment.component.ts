import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '../../models/post.model';
import { AuthUserModel } from '../../../auth/models/auth-user.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'hab-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: CommentModel;
  currenUser: AuthUserModel;

  constructor(private authService: AuthService) {
    this.currenUser = this.authService.currentUserSnapshot;
  }

  ngOnInit() {}
}
