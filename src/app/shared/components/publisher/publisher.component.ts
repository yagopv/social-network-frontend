import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hab-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent {
  @Output() publish = new EventEmitter();
  faCaretSquareRight: IconProp = faCaretSquareRight;
  publishText: string;

  constructor() {}

  publishStatus() {
    this.publish.emit(this.publishText);
    this.publishText = '';
    console.log(this.publishText);
  }
}
