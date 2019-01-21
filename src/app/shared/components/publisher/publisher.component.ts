import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hab-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent {
  @Input() placeholder: string;
  @Output() publish = new EventEmitter();
  faCaretSquareRight: IconProp = faCaretSquareRight;
  publishText: string;

  constructor() {}

  publishStatus() {
    if (!this.publishText) {
      return;
    }
    this.publish.emit(this.publishText);
    this.publishText = '';
    console.log(this.publishText);
  }
}
