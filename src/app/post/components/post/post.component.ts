import { Component, OnInit, Input } from '@angular/core';
import { PostViewModel, PostContentViewModel } from '../../models/post.model';

@Component({
  selector: 'hab-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostViewModel;

  postContent: PostContentViewModel;

  ngOnInit() {
    this.postContent = new PostContentViewModel(this.post);
  }
}
