import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'sn-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {
  @Input() likeCount: number;
  @Output() like = new EventEmitter();

  likeClick() {
    this.like.emit();
  }
}
