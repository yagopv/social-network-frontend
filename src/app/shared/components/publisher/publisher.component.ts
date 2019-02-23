import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { Author } from '../../../dashboard/models/author.model';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'sn-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent {
  @Input() placeholder: string;
  @Input() user: Profile | Author;
  @Output() publish = new EventEmitter();

  @ViewChild('text') text: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef) {}
  content = '';

  faCaretSquareRight: IconProp = faCaretSquareRight;

  resetContent() {
    this.content = '';
    // This is necesary because the post has the OnPush strategy
    this.changeDetector.markForCheck();
  }

  resetHeight() {
    this.text.nativeElement.style.height = '30px';
  }

  publishStatus() {
    if (!this.content) {
      return;
    }
    this.publish.emit(this.content);
  }
}
