import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { Profile } from '../../../core/core.models';

@Component({
  selector: 'sn-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent {
  @Input() placeholder: string;

  @Input() minHeight: string;

  @Input() buttonHeight: string;

  @Input() user: Profile;
  @Output() publish = new EventEmitter();

  @ViewChild('text') text: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef) {}
  content = '';

  resetContent() {
    this.content = '';
    // This is necessary because the post has the OnPush strategy
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

  exploreKeyPressed(event: KeyboardEvent) {
    if (event.which === 13 && event.metaKey) {
      this.publishStatus();
    }
  }
}
