import {
  transition,
  trigger,
  animate,
  style,
  query,
  stagger,
  keyframes,
  animateChild
} from '@angular/animations';

export const LIST_ANIMATION = trigger('list', [
  transition(':enter', [
    query('@listItems', stagger(300, animateChild()), { optional: true })
  ])
]);

export const LIST_ITEMS_ANIMATION = trigger('listItems', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }), // initial
    animate(
      '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
      style({ transform: 'scale(1)', opacity: 1 })
    ) // final
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    animate(
      '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
      style({
        transform: 'scale(0.5)',
        opacity: 0,
        height: '0px',
        margin: '0px'
      })
    )
  ])
]);
