theme: Next, 8
autoscale: true

# Observables

---

## Que es un Observable

- Un Observable representa un stream por el que fluyen datos que podemos manipular mediante operadores y finalmente obtener mediante una subscripción
- Proporciona soporte para el envío de mensajes entre publicadores y subscriptores
- Son declarativos, no se ejecutan hasta que consumidor se subscribe
- El consumidor recibe notificaciones hasta que  la función se completa, se da de baja o se produce un error no controlado

---

```javascript
const observable = Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

// observer => { next, error, complete }
```

---

## Qué nos dan los Observables que no tengamos ya

|      | Single   | Multiple   |
| ---  | ---      | ---        |
| Pull | Function | Generator  |
| Push | Promise  | Observable |

---

# Pull vs Push

- En un sistema Pull el consumidor determina cuando recibe los datos del productor. El productor no sabe cuando se enviarán estos datos. Las funciones de Javascript y los generators son un claro ejemplo
- En un sistema Push el productor determina cuando enviar los datos al consumidor. El consumidor no sabe cuando va a recibir estos datos. Las Promises y los Observables encajan en este sistema
- Las Funciones y los Observables son sistemas Pasivos, es decir, hasta que no se invocan no comienzan a producir valores. Las Promises y los generators son sistemas Activos que producen valores
- Suscribirse a un observable es equivalente a llamar a una función (call() o apply() vs subscribe())

---

## Creación de un Observable de forma declarativa

Observable haciendo push de los valores 1,2,3 y después de un segundo el 4 para completarse posteriormente
Observable.create es un alias para el constructor de Observable

```javascript
import { Observable } from 'rxjs';

const observable = Observable.create(function subscribe(observer) {
  const id = setInterval(() => {
    observer.next('hi')
  }, 1000);
});
```

---

## Suscripción a un Observable

Cuando me suscribo a un Observable le paso un Observer, que basicamente es in objeto con tres funciones { next, error, complete }

```javascript
observable.subscribe(x => console.log(x));
```

Cada suscripción a un Observable es independiente y es como una nueva "llamada a la función" 

---

## Tipos de notificationes que un Observable puede emitir

- Next: Envía un valor como un número, string o objeto
- Error: Envía un error JavaScript o una excepción. Corta la ejecución del Observable y nada más se enviará
- Complete: No envía nada. Corta la ejecución del Observable y nada más se enviará

---

## Error

Cuando se produce un error también se dejan de enviar valores por lo que es una buena idea controlarlos mediante try/catch

```javascript
import { Observable } from 'rxjs';
 
const observable = Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err); // delivers an error if it caught one
  }
});
```

---

## Complete
```javascript
import { Observable } from 'rxjs';

const observable = Observable.create(function subscribe(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
  observer.next(4);
});
```

4 no se envía

---

## Eliminando suscripciones y liberando recursos

Una suscripción representa un recurso que se puede liberar mediante la función unsubscribe

```javascript
const subscription = observable.subscribe(x => console.log(x));

subscription.unsubscribe();
```

El pipe async de Angular cancela las suscripciones por si mismo por lo que nos ahorramos hacerlo en el OnDestroy

---

## Retornando la función para eliminar la suscripción

```javascript
var observable = Rx.Observable.create(function subscribe(observer) {
  // Keep track of the interval resource
  var intervalID = setInterval(() => {
    observer.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalID);
  };
});
```

---

![](https://media.giphy.com/media/l0MYPkRAqZ3w1PN28/giphy.gif)

---

## Subjects

- Deciamos que cada subscribe sobre un Observable representaba un contexto de ejecución diferente en el que no se compartía nada
- Una Subject es un tipo especial de Observable que permite compartir suscripciones a varios Observers y además puede emitir valores a todos ellos (multicast)
- **Una Subject es un Observable** y por tanto podemos subscribirnos a ella proporcionando un Observer. El funcionamiento es el mismo pero internamente no se crea un nuevo contexto de ejecución y simplemente registra al nuevo Observer en la lista de Observers de la Subject
- **Una Subject es un Observer** y por tanto tiene acceso a los métodos next, error y complete. Puede por tanto emitir valores a todos los Observers conectados
- Además, como una Subject es un Observer puedo proporcionarla como parámetro a la función subscribe de cualquier Observable
---

## Subject con varios subscriptores

```javascript
const subject = new Subject<number>();
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1 | observerB: 1 | observerA: 2 | observerB: 2
```

---

## Subject como Observer

En este ejemplo estamos conviertiendo un Observable unicast a multicast siendo el método para que la ejecución de un Observable pueda compartirse por varios Observers

```javascript
const subject = new Subject<number>();
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

const observable = from([1, 2, 3]);
observable.subscribe(subject);

// Logs:
// observerA: 1 | observerB: 1 | observerA: 2 | observerB: 2 | observerA: 3 | observerB: 3
```

---

![](https://media.giphy.com/media/4bWWKmUnn5E4/giphy.gif)

---

## BehaviorSubject

- Es lo mismo que una Subject pero cuya peculiaridad es que tiene conocimiento de cual es el valor actual y se lo entrega a cada nuevo subscriptor en cuanto ejecuta la función subscribe
- Es muy útil para diversas situcaciones cuando uso RxJS

---

```javascript
const subject = new BehaviorSubject(0); // 0 is the initial value
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.next(1);
subject.next(2);
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});
subject.next(3);

// Logs
// observerA: 0 | observerA: 1 | observerA: 2 | observerB: 2 | observerA: 3 | observerB: 3
```

---

## Operators

- Son funciones que permiten manipular los resultados emitidos por los Observables
- Tenemos funciones de creación de Observables, condicionales, combinación, filtrado, transformación, ...

---

Esta función genera valores para los cuadrados de los números impares

```javascript
const nums$ = of(1, 2, 3, 4, 5).pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);

nums$.subscribe(x => console.log(x));
```

El operador pipe es una función de un Observable RxJS que habilita realizar composición de operadores

---

## Operators

- Creation:	from,fromEvent, of
- Combination:	combineLatest, concat, merge, startWith , withLatestFrom, zip
- Filtering:	debounceTime, distinctUntilChanged, filter, take, takeUntil
- Transformation:	bufferTime, concatMap, map, mergeMap, scan, switchMap
- Utility:	tap
- Multicasting:	share

---

## Observables en Angular

- EventEmitter extiende la clase Observable
- El módulo HTTP usa observables para la gestión de peticiones y respuestas
- El módulo del Router y de Forms usan observables para escuchar y responder a eventos del usuario 

---

## EventEmitter

```javascript
@Component({
  selector: 'zippy',
  template: `
  <div class="zippy">
    <div (click)="toggle()">Toggle</div>
    <div [hidden]="!visible">
      <ng-content></ng-content>
    </div>
  </div>`})
 
export class ZippyComponent {
  visible = true;
  @Output() open = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
 
  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }
}
```

---

## Peticiones HTTP

Las ventajas que proporciona son:

- Observables no modifican la respuesta del servidor por lo que se pueden aplicar operadores para transformarla a nuestro gusto
- Las peticiones HTTP se pueden cancelar a través de unsubscribe()
- Se puede configurar para comprobar el progreso de la petición y obtener feedback
- Las peticiones que fallan se pueden reintentar facilmente

---

## AsyncPipe

El pipe async permite la subscripcion a un Observable

```javascript
@Component({
  selector: 'async-observable-pipe',
  template: `<div><code>observable|async</code>:
       Time: {{ time | async }}</div>`
})
export class AsyncObservablePipeComponent {
  time = new Observable(observer =>
    setInterval(() => observer.next(new Date().toString()), 1000)
  );
}
```

---

## Router

Router.events proporciona eventos de  navegación como observables. Se pueden filtrar para buscar el que necesito


```javascript
@Component({
  selector: 'app-routable',
  templateUrl: './routable.component.html',
  styleUrls: ['./routable.component.css']
})
export class Routable1Component implements OnInit {
 
  navStart: Observable<NavigationStart>;
 
  constructor(private router: Router) {
    // Create a new Observable that publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }
 
  ngOnInit() {
    this.navStart.subscribe(evt => console.log('Navigation Started!'));
  }
}
```

---

## Router

ActivatedRoute es un servicio de Angular que se basa en propiedades observables para obtener información acerca del path, parametros, querystring, ... de cada ruta navegada

```javascript
@Component({
  selector: 'app-routable',
  templateUrl: './routable.component.html',
  styleUrls: ['./routable.component.css']
})
export class Routable2Component implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}
 
  ngOnInit() {
    this.activatedRoute.url
      .subscribe(url => console.log('The URL changed to: ' + url));
  }
}
```

---

## Reactive Forms

Los formularios contienen una serie de propiedades como observables para monitorizar los valores y las modificaciones en los mismos
FormControl proporciona propiedades como valueChanges o statusChanges que nos dan enventos de cambio en los valores de los inputs

```javascript
import { FormGroup } from '@angular/forms';
 
@Component({
  selector: 'my-component',
  template: 'MyComponent Template'
})
export class MyComponent implements OnInit {
  nameChangeLog: string[] = [];
  heroForm: FormGroup;
 
  ngOnInit() {
    this.logNameChange();
  }
  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}
```

---

## Recursos

[RxJs API](https://rxjs-dev.firebaseapp.com/api)
[Rx Visualizer](https://rxviz.com)
[Rx Marbles](http://rxmarbles.com)

