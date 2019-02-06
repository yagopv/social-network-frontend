theme: Next, 8
autoscale: true
build-lists: true

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

- Las animaciones en Angular se inician a través de propiedades @trigger
- Cuando una propiedad cambia de estado o un elemento se inserta o desaparece del DOM se lanzará una animación
- El @trigger está enlazado con el componente, que es donde se define la animación

---

## @triggers

```html

<!-- Anima cuando `someStateValue` cambiar -->
<div [@myAnimationTrigger]="someStateValue">
  ...
</div>

<!-- Anima cuando se añade o elimina del DOM  (enter/leave) -->
<div @myAnimationTrigger *ngIf="exp">
  ...
</div>
```

---

## Paso 1

La animación se define en el @Component

```javascript

import {transition, trigger} from "@angular/animations";

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

## Paso 2

Un trigger lanza la transición que consiste en varios pasos o estados

```javascript
trigger('myAnimationTrigger', [
  transition('* => visible', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 }))
  ]),
  transition('* => hidden', [
    animate('500ms', style({ opacity: 0 }))
  ])
])
```

---

## Paso 3

Cuando la animación se completa se irá al estado correspondiente y se aplicarán los estilos definidos

```javascript
trigger('myAnimationTrigger', [
  state('visible', style({ opacity: 1 })),
  state('hidden', style({ opacity: 0 })),
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

style() aplica el estilo a el elemento de forma inmediata

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
 // <div *ngIf="exp" @myInsertRemoveTrigger>...</div>

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

## Routing animations

- Las animaciones de cambios se hacen utilizando las técnicas vistas
- Cuando se hace un cambio de ruta, el router de Angular avisará de ese cambio a un trigger llamado @routeAnimations

---

## Routing animations. Paso 1

Lo primero será configurar un @routeAnimations trigger

```javascript
<div class="route-container" [@routeAnimations]="...">
  <router-outlet></router-outlet>
</div>
```

---

## Routing animations. Paso 2

Las rutas se pueden definir con información especifica haciendo referencia a las animaciones

```javascript
const ROUTES = [
  { component: HomePage, path: '', data: {animation: 'HomePage' }},
  { component: ProfilePage, path: '/profile/:id', data: {animation: 'ProfilePage' }},
  { component: AboutPage, path: '/about', data: {animation: 'AboutPage' }},
  { component: ContactPage, path: '/contact', data: {animation: 'ContactPage' }},
]
```

```html
<div class="route-container" [@routeAnimations]="prepareRoute(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
</div>
```


