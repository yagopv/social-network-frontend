import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { ErrorModel } from '../error.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hab-errors',
  template: `
    <div class="errors" *ngIf="errors.length">
      <p *ngFor="let error of errors">{{ error.detail | capitalize }}</p>
      <a (click)="reset()"><fa-icon [icon]="closeIcon"></fa-icon></a>
    </div>
  `,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {
  @Input() errors: ErrorModel[];
  @Output() errorReset = new EventEmitter();

  closeIcon: IconProp = faTimesCircle;

  reset() {
    this.errorReset.emit();
  }

  ngOnDestroy() {
    this.errorReset.emit();
  }
}
