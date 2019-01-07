import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { ErrorModel } from '../error.model';

@Component({
  selector: 'hab-errors',
  template: `
    <div class="errors" *ngIf="errors.length">
      <p *ngFor="let error of errors">{{ error.detail | titlecase }}</p>
      <a (click)="reset()">Hide</a>
    </div>
  `,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {
  @Input() errors: ErrorModel[];
  @Output() errorReset = new EventEmitter();

  reset() {
    this.errorReset.emit();
  }

  ngOnDestroy() {
    this.errorReset.emit();
  }
}
