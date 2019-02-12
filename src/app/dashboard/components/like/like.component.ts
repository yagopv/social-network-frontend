import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'sn-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {
  likeIcon: IconProp = faThumbsUp;

  @Input() likeCount: number;
  @Output() like = new EventEmitter();

  likeClick() {
    this.like.emit();
  }
}
