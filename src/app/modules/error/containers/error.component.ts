import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { Error } from '../models/error.model';
import { ResetErrors } from '../store/error.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'sn-errors',
  template: `
    <div class="errors" *ngIf="errors?.length">
      <p *ngFor="let error of errors">
        {{ getErrorMessage(error) | capitalize }}
      </p>
      <a (click)="resetErrors()"><fa-icon [icon]="closeIcon"></fa-icon></a>
    </div>
  `,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy {
  @Input() errors: Error[];
  @Output() reset = new EventEmitter();

  constructor(private store: Store) {}

  closeIcon: IconProp = faTimesCircle;

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  getErrorMessage({ detail, data }: Error): string {
    if (detail) {
      return detail;
    }

    if (data) {
      return `You ${data.label} is wrong`;
    }
  }
  ngOnDestroy() {
    this.store.dispatch(new ResetErrors());
  }
}
