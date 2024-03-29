theme: Next, 8
autoscale: true
slidenumbers: true

# Animaciones

---

## Animaciones

- Angular tiene su propio lenguaje de definición de animaciones
- El sistema está construido sobre la nueva api de animaciones web (WAAPI)
- Para empezar tenemos que añadir el módulo BrowserAnimationsModule

---

## BrowserAnimationsModule
```javascript
// @angular/animations en package.json

import {BrowserAnimationsModule}
  from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule]
})
class AppModule {}
```

---

## @triggers

- Las animaciones en Angular se inician a través de un tipo especial de property binding  **[@{trigger_name}]**
- Cuando una propiedad cambia de estado o un elemento se inserta o desaparece del DOM se lanzará una animación
- El @trigger está enlazado con el componente, que es donde realmente se declara y define la animación

---

## @triggers

```html

<!-- Anima cuando `someStateValue` cambia. Usamos state() -->
<div [@myAnimationTrigger]="someStateValue">
  ...
</div>

<!-- Anima cuando se añade o elimina del DOM  (enter/leave) -->
<div @myAnimationTrigger *ngIf="exp">
  ...
</div>
```

---

## Definición de animaciones 

La animación se define en el @Component

```javascript
@Component({
  template: `
    <div [@myAnimationTrigger]="myValue">...</div>
  `,
  animations: [
    trigger('myAnimationTrigger', [
      transition('* => someState', [
        // animaciones
      ])
    ])
  ]
})
class MyComponentWithAnimations {
  myValue = 'someState';
}
```

---

## Creación de triggers

Un trigger lanza la transición que consiste en varios pasos o estados

```javascript
trigger('myAnimationTrigger', [
  transition('* => visible', [
    style({ opacity: 0 }), // Estado inicial
    animate('500ms', style({ opacity: 1 })) // Qué tiene que hacer
  ]),
  transition('* => hidden', [
    animate('500ms', style({ opacity: 0 }))
  ])
])
```

---

## Creación de estados

Cuando la animación se completa se irá al estado correspondiente y se aplicarán los estilos definidos

Esta animación y la anterior son equivalentes

```javascript
trigger('myAnimationTrigger', [
  state('visible', style({ opacity: 1 })), // Estilos iniciales
  state('hidden', style({ opacity: 0 })), // Estilos iniciales
  transition('* => visible', [
    animate('500ms')
  ]),
  transition('* => hidden', [
    animate('500ms')
  ])
])
```

---

## style()

Aplica el estilo al elemento de forma inmediata

```javascript
trigger('myAnimationTrigger', [
  transition('* => visible', [
    // fade out del elemento de forma inmediata
    style({ opacity: 0 }),

    //...
  ]),

  transition('* => hidden', [
    // Usa la opacidad actual del elemento 
    style({ opacity: '*' }),

    //...
  ])
])
```

---

## animate() + style()

animate() + style() aplicarán el estilo al elemento a lo largo de una duración indicada

```javascript

trigger('myAnimationTrigger', [
  transition('* => visible', [
    // fade out del elemento de forma inmediata
    style({ opacity: 0 }),

    // Animar la opacidad a lo largo de 1 sec
    animate(1000, style({ opacity: 1 }))
  ]),

  transition('* => hidden', [
    // Usa la opacidad actual del elemento 
    style({ opacity: '*' }),

    // Anima la opacidad a lo lardo de 500ms
    animate('500ms', style({ opacity: 0 }))
  ])
])
```

---

## animate() + keyframes()

Aplicará una serie de keyframes a lo largo de una linea temporal

```javascript

trigger('myAnimationTrigger', [
  transition('* => visible', [
    animate('1s', keyframes([
      style({ opacity: 0 }), // 0%
      style({ opacity: 0.8 }), // 33%
      style({ opacity: 0.2 }), // 66%
      style({ opacity: 1 }), // 100%
    ]))
  ]),

  transition('* => hidden', [
    animate('1s', keyframes([
      style({ opacity: 1, offset: 0 }), // 0%
      style({ opacity: 0.2, offset: 0.8 }), // 80%
      style({ opacity: 0.4, offset: 0.9 }), // 90%
      style({ opacity: 0, offset: 1 }), // 100%
    ]))
  ])
])
```

---

## :enter & :leave

Cuando un item se inserta o elimina del DOM se usan :enter y :leave

```javascript
 // Template => <div *ngIf="exp" @myInsertRemoveTrigger>...</div> 

trigger('myInsertRemoveTrigger', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1s', style({ opacity: 1 })
  ]),
  transition(':leave', [
    animate('1s', style({ opacity: 0 })
  ])
])
```

:enter se lanza cuando algún *ngIf / *ngFor introduce un nuevo elemento en el DOM
:leave se lanza cuando se elimina un elemento del DOM

---

## (@animation.callback)

Cuando una animación comienza o finaliza emite callbacks

```javascript
@Component({
  animations: [
    trigger('myInsertRemoveTrigger', [
      //...
    ])
  ],
  template: `
    <div *ngIf="exp"
        @myInsertRemoveTrigger
        (@myInsertRemoveTrigger.start)="onAnimationEvent($event)"
        (@myInsertRemoveTrigger.done)="onAnimationEvent($event)">...</div>
  `
})
class MyInsertRemoveComponent {
  onAnimationEvent(event: AnimationEvent) { /* ... */ }
}
```

---

## (@animation.callback)

- (@trigger.start) Se llama al empezar la animación
- (@trigger.done) Cuando se completa
- Un AnimationEvent se envía via $event

---

## (@animation.callback)

```javascript
  onAnimationEvent(event: AnimationEvent) {
    console.log(event.triggerName); // myInsertRemoveTrigger
    console.log(event.phaseName); // start o done
    console.log(event.totalTime); // 1000
    console.log(event.fromState); // void o *
    console.log(event.toState); // * o void
    console.log(event.element); // el element
  }
```

---

![fit 150%](https://media.giphy.com/media/QGzPdYCcBbbZm/giphy.gif)

---

## query()

El gran poder de las animaciones con Angular esta en query()
Se utiliza para seleccionar elementos DOM desde un padre

```javascript
trigger('pageAnimations', [
  transition(':enter', [
    query('.hero, form', [
      style({opacity: 0, transform: 'translateY(-100px)'}),
      stagger(-30, [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
        style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ])
])
```

---

## stagger()

Se usa junto con query para producir un retardo entre los elementos a animar

Muy útil para la animación de listas

```javascript
transition(':decrement', [
  query(':leave', [
    stagger(50, [
      animate('300ms ease-out', 
      style({ opacity: 0, width: '0px' })),
    ]),
  ])
])
```

---

## group() &  sequence()

Sirve para lanzar animaciones en paralelo

```javascript
transition('void => *', [
  style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
  // or sequence()
  group([
    animate('0.3s 0.1s ease', style({
      transform: 'translateX(0)',
      width: 120
    })),
    animate('0.3s ease', style({
      opacity: 1
    }))
  ])
])
```

---

## :increment & :decrement

Se lanzan cuando un valor numérico se incrementa o decrementa

```javascript
trigger('filterAnimation', [
  transition(':enter, * => 0, * => -1', []),
  transition(':increment', [
    query(':enter', [
      style({ opacity: 0, width: '0px' }),
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 1, width: '*' })),
      ]),
    ], { optional: true })
  ]),
  transition(':decrement', [
    query(':leave', [
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
      ]),
    ])
  ]),
])
```

---

## animateChild()

Si voy a animar elementos hijos es necesario que esperen a que el padre haya acabado sus propias animaciones ya que tienen prioridad.

En caso contrario no se verían las animaciones del hijo. Esta diseñado para funcionar con query()

```javascript
transition(':enter', [
  query('@listItems:not(sn-post-comment)', 
  stagger(300, animateChild()), {
    optional: true // Puede no estar presente en el DOM
  })
])
```

