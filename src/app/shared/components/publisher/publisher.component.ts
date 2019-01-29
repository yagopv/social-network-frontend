import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { Author } from '../../../dashboard/models/author.model';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'hab-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent {
  @Input() placeholder: string;
  @Input() user: Profile | Author;
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
  }
}
