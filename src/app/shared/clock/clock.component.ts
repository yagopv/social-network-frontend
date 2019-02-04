import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sn-clock',
  template: `
    <div>
      <h1>{{ clock$ | async | date }}</h1>
      <h2>
        <b>{{ clock$ | async | date: 'h:mm:ss a' }}</b>
      </h2>
    </div>
  `,
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  clock$ = interval(1000).pipe(map(() => new Date()));
}
