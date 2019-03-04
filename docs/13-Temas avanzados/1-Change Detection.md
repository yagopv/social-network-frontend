theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Change detection

---

### Qué es lo que provoca un cambio?

```html
<h1>{{firstname}} {{lastname}}</h1>

<button (click)="changeName()">
  Change name
</button>
```

---

### Qué es lo que provoca un cambio?

[.code-highlight: all]
[.code-highlight: 7-10]
```javascript
@Component()
class App {

  firstname:string = 'Pascal';
  lastname:string = 'Precht';

  changeName() {
    this.firstname = 'Brad';
    this.lastname = 'Green';
  }
}
```

---

### Qué es lo que provoca un cambio?

[.code-highlight: all]
[.code-highlight: 9-13]
```
@Component()
class ContactsApp {

  contacts:Contact[] = [];

  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('/contacts')
      .map(res => res.json())
      .subscribe((contacts) => {
        this.contacts = contacts;
      });
  }
}
```

---

### Qué es lo que provoca un cambio?

- Eventos: click, submit
- XHR. Peticiones AJAX
- Timers. setTimeout, setInterval

---

# Quién avisa a Angular acerca de estos cambios

---

![](https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif)


---

### Zone.js

- Esta una libreria que nos permite ser notificados cuando ocurre algun evento asincrono como los indicados anteriormente
- Utiliza monkeypatching sobre las APIs nativas como addEventListener o XMLHttpRequest
- Crea contextos de ejecucion sobre los que podemos ejecutar tareas cuando se entra o sale de los mismos
- Angular implementa su propia Zone => NgZone

---

# Como funciona ?

---

![inline](../images/cd-tree.png)


---

![inline](../images/cd-tree-2.png)

---

![inline](../images/cd-tree-3.png)

---

![inline](../images/cd-tree-4.png)

---

![inline](../images/cd-tree-5.png)

---

![inline](../images/cd-tree-6.png)

---

![inline](../images/cd-tree-7.png)

---

### Resumen 

- Cada componente tiene su propio Change detector
- El flujo es unidireccional empezando en el root => Más previsible y fácil de optimizar
- Angular genera código VM friendly que puede ejecutar cientos de miles de checks sencillos en milisegundos

---

# Mutabilidad e Inmutabilidad

---

### Que entendemos por mutación

[.code-highlight: all]
[.code-highlight: 2-3, 8-11]
[.code-highlight: 14-16]
```javascript
@Component({
  template: '<v-card [vData]="vData"></v-card>',
  directves: [VCardCmp]
})
class VCardApp {

  constructor() {
    this.vData = {
      name: 'Christoph Burgdorf',
      email: 'christoph@thoughtram.io'
    }
  }

  changeData() {
    this.vData.name = 'Pascal Precht';
  }
}
```

---

![inline](../images/immutable-1.png)

---

![inline](../images/immutable-2.png)

---

![inline](../images/immutable-3.png)

---

![inline](../images/immutable-4.png)

---

![inline](../images/immutable-5.png)

---

![inline](../images/immutable-6.png)

---

![inline](../images/immutable-7.png)

La referencia es la misma pero las propiedades pueden haberse modificado (mutado) por lo que se necesita lanzar el algoritmo de detección de cambios

---

![inline](../images/cd-tree-7.png)

Angular se comporta de forma conservadora por defecto y realiza las comprobaciones en cada componente ya que no tiene forma de saber si se ha modificado alguna propiedad al hacer una comparación por referencia de los objetos.

---

## Algoritmo de Change Detection

- Una comparación profunda (deep) sería imposible a efectos de rendimiento.

- El algoritmo de detección de cambios de Angular comprueba si han cambiado las expresiones o propiedades enlazadas en las plantillas mediante data binding y si es asi renderiza de nuevo la vista

---

## Immutabilidad

[.code-highlight: all]
[.code-highlight: 1-3]
[.code-highlight: 5]
[.code-highlight: 7]

```javascript
var vData1 = {
  name: 'Pascal Precht'
};

var vData2 = { name: 'Christoph Burgdorf' };

vData1 === vData2 // false
```

Al realizar un cambio de esta forma de siempre tenemos como resultado un nuevo objeto y por tanto una nueva referencia en memoria

---

## Inmmutabilidad. Estrategia OnPush

Angular es capaz de evitar el lazamiento del algoritmo de detección de cambios si las propiedades de entrada del componente no son modificadas

[.code-highlight: all]
[.code-highlight: 3-4, 9]
[.code-highlight: 6]
```javascript
@Component({
  template: `
    <h2>{{vData.name}}</h2>
    <span>{{vData.email}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VCardCmp {
  @Input() vData;
}
```

---

![inline](../images/immutable-3.png)

---

![inline](../images/immutable-4.png)

---

![inline](../images/immutable-8.png)

---

![inline](../images/immutable-9.png)

---

![inline](../images/immutable-10.png)

Evito la modificación en el subarbol ya que la referencia no se ha modificado

---

![inline](../images/cd-tree.png)

---

![inline](../images/cd-tree-9.png)

---

![inline](../images/cd-tree-8.png)

---

## OnPush

Sólo se lanza el algoritmo de detección de cambios en caso de que:

- Las referecias con @Input se modifiquen
- Un evento sen lanza en el componente o de alguno de sus hijos
- Lanzamos la detección de cambios de forma explícita mediante detectChanges() o markForCheck()

---

## detectChanges()

Lanza la detección de cambios en el componente y sus hijos

```javascript
@Component({
  selector: 'counter',
  template: `{{count}}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent { 
  count = 0;

  constructor(private cdr: ChangeDetectorRef) {

    setTimeout(() => {
      this.count = 5;
      this.cdr.detectChanges();
    }, 1000);

  }
}
```

---

# markForCheck()

No lanza detección de cambios pero marca el componente y sus ancestros hasta el root para que lancen el alforitmo de detección de cambios en su siguiente iteración o en la actual si ya está ocurriendo

```javascript
@Component({
  selector: 'counter',
  template: `{{count}}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent { 
  count = 0;

  constructor(private cdr: ChangeDetectorRef) {

    setTimeout(() => {
      this.count = 5;
      this.cdr.markForCheck();
    }, 1000);

  }
}
```

---

![](https://media.giphy.com/media/HVyOUw2FWbBQI/giphy.gif)

---

# Qué pasa con los Observables si están por todas partes

---

[.code-highlight: all]
[.code-highlight: 3-4]
[.code-highlight: 7-8]
[.code-highlight: all]
```javascript
@Component() // assuming OnPush
class CartBadgeCmp {

  @Input() addItemStream:Observable<any>;
  counter = 0;

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
    })
  }
}
```

---

![inline](../images/cd-tree-10.png)

---

![inline](../images/cd-tree-11.png)

---

![inline](../images/cd-tree-10.png)

---

![inline](../images/cd-tree-10.png)

No pasa nada porque no cumple ninguna de las reglas mencionadas anteriormente. La referencia del observable es la misma

---

[.code-highlight: all]
[.code-highlight: 6, 11]
```javascript
@Component() // assuming OnPush
class CartBadgeCmp {

  @Input() addItemStream:Observable<any>;
  counter = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
      this.cd.markForCheck(); // marks path
    })
  }
}
```

---

![inline](../images/cd-tree-10.png)

---

![inline](../images/cd-tree-11.png)

---

![inline](../images/cd-tree-12.png)

Se marca el path hasta el root

---

![inline](../images/cd-tree-13.png)

Se lanza la detección de cambios en el path

---

![inline](../images/cd-tree-10.png)

Y todo queda en calma de nuevo ...

---

![](https://media.giphy.com/media/wbcMnfHqOJX9K/giphy.gif)

---

## Async pipe

El ejemplo anterior es un ejemplo de uso de markForCheck() pero hay otra forma de hacerlo sin tener que usar markForCheck() de forma explícita

```javascript
@Component({
  template: `
    <div *ngFor="let item of items | async">{{item.title}}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() items;
}
```

...

```html
<a (click)="addItem()">Add item</a>
```

---

- El pipe async se suscribe a un Observable o a una Promise y devuelve el último valor emitido
- Cuando se produce una modificación debido a alguna de las 3 razones comentadas anteriormente la pipe marca el componente para lanzar la detección de cambios
- Angular marca el componente por nosotros

---

![](https://media.giphy.com/media/dYGCU6itccVJbdyyeb/giphy.gif)
