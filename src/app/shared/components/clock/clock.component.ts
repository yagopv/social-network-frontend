import { Component, ChangeDetectionStrategy } from '@angular/core';
import { interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'sn-clock',
  template: `
    <div class="card text-center bg-dark text-light pt-2 pb-2">
      <h1>{{ clock$ | async | date }}</h1>
      <h2>
        <b>{{ clock$ | async | date: 'hh:mm a' }}</b>
      </h2>
    </div>
  `,
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  clock$ = interval(60000).pipe(
    startWith(0),
    map(() => new Date())
  );
}
