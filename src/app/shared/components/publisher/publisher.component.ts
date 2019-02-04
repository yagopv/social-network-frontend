import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { Author } from '../../../dashboard/models/author.model';
import { Profile } from 'selenium-webdriver/firefox';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'sn-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnChanges {
  @Input() placeholder: string;
  @Input() user: Profile | Author;
  @Input() content: string;
  @Output() publish = new EventEmitter();

  @ViewChild('text') text: ElementRef;

  faCaretSquareRight: IconProp = faCaretSquareRight;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content && changes.content.currentValue === '') {
      this.text.nativeElement.style.height = '30px';
    }
  }

  publishStatus() {
    if (!this.content) {
      return;
    }
    this.publish.emit(this.content);
  }
}
