import { transition, trigger, animate, style } from '@angular/animations';

export const FADE_IN_OUT_ANIMATION = trigger('fade', [
  transition('* => in', [
    style({ opacity: 0 }),
    animate(1000, style({ opacity: 1 }))
  ]),
  transition('* => out', [animate(1000, style({ opacity: 0 }))])
]);
