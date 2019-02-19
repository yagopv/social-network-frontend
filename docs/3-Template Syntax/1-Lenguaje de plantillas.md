theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

# Template Syntax

---

## {{ Interpolation }}

Angular convierte las expresiones en strings y los inserta en el lugar en el que se están declarando

Interpolation es una sintaxis especial que internamente Angular convierte en _property bindings_

```html
<p>My name is {{firstName}}</p>

<h3>
  {{title}}
  <img src="{{imageUrl}}">
</h3>

<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}</p>
```

---

## Expressions

Las expresiones en plantillas producen valores. La sintaxis similar a Javascript pero con ciertas caracteristicas no permitidas:

- Asignaciones (=, +=, -=, ...)
- Operador new
- Encadenando expresiones con ; o ,
- Operadores de incremento / decremento (++ y --)
- Sin soporte para operadores bitwise | y &
- Nuevos operadores introducidos por Angular como |, ?. y !.

---

## Expression context

Normalmente el contexto será el componente asociado pero también puede utilizar elementos dentro de la plantilla HTML a la que pertenece

```html
{{title}}
<span [hidden]="isUnchanged">changed</span>

<div *ngFor="let hero of heroes">{{hero.name}}</div>

<input #heroInput> {{heroInput.value}}
```

El scope de las variables esta limitado a la propia plantilla y el componente asociado. No se puede referenciar global scope (window)

---

## Statements

Una declaración o statement responde a un evento lanzado por un binding target (element, component, directive)

La diferencia con las expressiones es que producen efectos colaterales. Una expresión evalúa pero un statement realiza una acción. Así es como modificamos el estado de nuestra aplicación. Respondiendo eventos

```html
<button (click)="deleteHero()">Delete hero</button>
```

---

## Statement context

Normalmente es el componente asociado

```html
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```

---

## REGLAS DE ORO

- Tanto las expresiones como las declaraciones han de ser simples

- Evitar cálculos complejos o expresiones complejas

- La complejidad se ha de derivar al componente o servicios

---

# Data binding

---

## One way

### Data source - Target view

```javascript
{{expression}}
[target]="expression"
bind-target="expression" // No lo usaremos
```

### Target view - Data source

```javascript
(target)="statement"
on-target="statement" // No lo usaremos
```

---

## Two way

```javascript
[(target)]="expression"
bindon-target="expression"
```

---

![](https://media0.giphy.com/media/9TA8eo1jJzDwc/giphy.gif?cid=e1bb72ff5c6c2bf468596d774d2d8c8c)

---

## HTML Attributes vs DOM Properties

- Los atributos inicializan propiedades o caracteristicas del elemento al que pertenecen. El valor real realmente reside en la propiedad DOM del elemento.

- Algunos nombres de atributos se corresponden con las propiedades (Por ejemplo id) pero no tienen porque.

---

Un ejemplo claro es el uso de value en in input

```html
<input value='My value' />
```

`value` como atributo inicializa el valor del input pero cuano escribo no se actualiza. La que se actualiza es la propiedad subyacente.

**El data binding de Angular funciona a nivel de propiedades y Eventos**

---

## [Property binding]

Conocido también como one-way data binding porque solo se propaga desde el componente a la vista

```html
<!-- [Propiedad del elemento]="Propiedad del componente" -->
<img [src]="heroImageUrl">
<button [disabled]="isUnchanged">Cancel is disabled</button>
```

---

## [Property binding]

```html
<!-- [Directiva]="Propiedad del componente" -->
<div [ngClass]="classes">binding to the classes property</div>
```

---

## [Property binding]

```html
<!-- Comunicación padre - hijo -->
<app-hero-detail [hero]="currentHero"></app-hero-detail>
```

**Si omito los brackets entonces la propiedad no se actualizará. En ocasiones es lo buscado**

---

## [Property binding] vs {{ interpolation }}

Normalmente son intercambiables y es una cuestión de preferencia.

```html
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{title}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>
```

---

## Attribute binding (La excepción que confirma la regla)

Deciamos que **El data binding de Angular funciona a nivel de DOM Properties y Eventos**

Hay una excepción y es cuando utilizamos _attribute binding_.
Hay ciertos atributos HTML que podemos necesitar enlazar utilizando nuestras clases modelo por ejemplo, atributos de accesibilidad (ARIA), SVGs, o _table spans (colspan)_ que no tienen correspondencia con propiedades del elemento en el DOM

---

Cuando escribimos esto

```
<tr><td colspan="{{1 + 1}}">Three-Four</td></tr>
```

Tenemos como resultado el siguiente error

```bash
Template parse errors:
Can't bind to 'colspan' since it isn't a known native property
```

Lo cual efectivamente cumple nuestra regla de que Angular funciona a nivel de properties. Como lo solucionamos ?

```html
 <tr><td [attr.colspan]="1 + 1">One-Two</td></tr>
```
---

Utilizando _attribute binding_!!

También se suele usar para atributos de accesibilidad

```html
<button [attr.aria-label]="actionName">{{actionName}} with Aria</button>
```

---

## Class & Style binding

Podemos añadir clases o estilos inline usando [class] y [style] junto a la clase o propiedad que queremos enlazar

---

## [class]

```html
<!-- Añade o elimina todas las clases a la vez. O todas o ninguna  -->
<div class="bad curly special" [class]="badCurly">Bad curly</div>

<!-- Añade o elimina la clase isSpecial en función de una propiedad del modelo -->
<div [class.special]="isSpecial">The class binding is special</div>

<!-- Sobreescrimos la clase con lo que contenga la propiedad del modelo -->
<div class="special" [class.special]="!isSpecial">This one is not so special</div>
```

---

## [style]

```html
<button [style.color]="isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>
<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>
```

---

## (Event binding)

- Los usuarios no se quedan simplemente mirando a la pantalla. El flujo de datos hasta ahora es siempre del componente a la vista

- El binding de eventos nos permite hacer el flujo contrario, de la vista al componente

---

## Eventos nativos

```html
<button (click)="onSave($event)">Save</button>
<button on-click="onSave($event)">On Save</button>
```

- El nombre entre `()` representa el evento (eventos estándar de los elementos DOM) sobre el que queremos añadir el listener. 
- `onSave()` representa el método del componente asociado que queremos ejecutar
- `$event` es un objeto normal de un evento DOM
- `$event` existirá en el contexto de la plantilla y se puede pasar al método ejecutado

---

## Eventos custom. EventEmitter

- Mediante el uso de `EventEmitter` puedo lanzar eventos propios de la aplicación
- Es de gran utilidad cuando el componente no necesita conocer la implementación concreta => Reusabilidad
- Es un patrón que se usa de forma extendida en la aplicaciones Angular

---

Ejemplo: El siguiente componente no sabe como efectuar un borrado, simplemente emite un evento:

```javascript
template: `
<div>
  <img src="{{heroImageUrl}}">
  <span [style.text-decoration]="lineThrough">
    {{prefix}} {{hero?.name}}
  </span>
  <button (click)="delete()">Delete</button>
</div>`

deleteRequest = new EventEmitter<Hero>();

delete() {
  this.deleteRequest.emit(this.hero);
}
```

---

Desde el padre, que conoce como efectuar el borrado, nos suscribimos al evento

```html
<app-hero-detail 
  (deleteRequest)="deleteHero($event)" 
  [hero]="currentHero"></app-hero-detail>
```

---

## [(Two-way binding)]

- A veces necesitaremos que el binding vaya en ambos sentidos
- Esta técnica es la que se usa en los formularios de Angular

---

```javascript
@Component({
  selector: 'app-sizer',
  template: `
  <div>
    <button (click)="dec()" title="smaller">-</button>
    <button (click)="inc()" title="bigger">+</button>
    <label [style.font-size.px]="size">FontSize: {{size}}px</label>
  </div>`
})
export class SizerComponent {
  @Input()  size: number | string;
  @Output() sizeChange = new EventEmitter<number>();

  dec() { this.resize(-1); }
  inc() { this.resize(+1); }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
```

---

```html
<app-sizer 
  [size]="fontSizePx" 
  (sizeChange)="fontSizePx=$event"></app-sizer>
```

Este patrón tiene su sintaxis propia en Angular

```html
<app-sizer [(size)]="fontSizePx"></app-sizer>

<div [style.font-size.px]="fontSizePx">Resizable Text</div>
```



---

## Attribute & Structural Directives

- **Attribute**: Modifican el comportamiento de los elementos HTML y se aplican como atributos
- **Structural**: Se responsbilizan de controlar el DOM añadiendo o eliminando nodos

---

## Built-in attribute directives

Las directivas de atributo van ligadas y modifican el comportamiento de los elementos HTML. Hay varias predefinidas

---

## NgClass

Directiva avanzada para el control del atributo class. Podemos añadir o eliminar varias clases a la vez, cosa que no podríamos hacer a través de property binding con `class`

```html
<div [ngClass]="currentClasses"></div>

```

```javascript
currentClasses: {};
setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses =  {
    'saveable': this.canSave,
    'modified': !this.isUnchanged,
    'special':  this.isSpecial
  };
}
```
---

## NgStyle

Similar a NgClass pero para los estilos inline

```html
<div [ngStyle]="currentStyles"></div>
```

```javascript
currentStyles: {};
setCurrentStyles() {
  // CSS styles: set per current state of component properties
  this.currentStyles = {
    'font-style':  this.canSave      ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
    'font-size':   this.isSpecial    ? '24px'   : '12px'
  };
}
```

---

## NgModel (Two-way data binding)

Directiva especializada para controlar elementos de un formulario

```html
<input [(ngModel)]="currentHero.name">
```

---

En realidad `ngModel` es simplemente un shorthand de un patrón que sería bastante habitual en Angular:

```html
<input
  [ngModel]="currentHero.name"
  (ngModelChange)="currentHero.name=$event">
```

que a su vez oculta el funcionamiento real del elemento input que seria:

```html
<input 
  [value]="currentHero.name"
  (input)="currentHero.name=$event.target.value" >
```

---

El shorthand _[(ngModel)]_ solo puede realizar el binding con una propiedad. Si se necesita algo más avanzado se puede recurrir a la forma extendida

```html
<input
  [ngModel]="currentHero.name"
  (ngModelChange)="setUppercaseName($event)">
```

---

## Built-in structural directives

Este tipo de directivas permiten modificar el DOM añadiendo, eliminando o modificando elementos

---

## NgIf

Permite añadir o eliminar un elemento del DOM a través de la evaluación boolena de una propiedad o expresión

```html
<app-hero-detail *ngIf="isActive"></app-hero-detail>
```

---

## NgForOf

Esta directiva permite la repetición de un elemento DOM a través de una sintaxis propia que Angular puede interpretar y que se conoce como _microsyntax_

```html
<div *ngFor="let hero of heroes; let i=index; trackBy: hero.id">
  {{i + 1}} - {{hero.name}}
</div>
```

- `let` crea una variable local en el contexto de la directiva
- `index` es un indice que comienza en cero y representa el elemento del array que se esta renderizando
- `trackBy` permite optimizar el rendimiento de la directiva al enlazar una nueva colección (Por ejemplo después de una llamada AJAX)

---

## NgSwitch

Es un conjunto de directivas que emulan el comportamiento de un bloque switch

```html
<div [ngSwitch]="currentHero.emotion">
  <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="currentHero"></app-happy-hero>
  <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="currentHero"></app-sad-hero>
  <app-confused-hero *ngSwitchCase="'confused'" [hero]="currentHero"></app-confused-hero>
  <app-unknown-hero  *ngSwitchDefault           [hero]="currentHero"></app-unknown-hero>
</div>
```

Sólo se mostrará el bloque que cumpla la condición. Nótese que ngSwitch es una directiva de atributo (Sin \*)

---

## Variables en plantillas

Se pueden definir variables locales en plantillas mediante _#_. La variable se puede referenciar en cualquier parte de la plantilla

```html
<input #phone placeholder="phone number">

...

<button (click)="callPhone(phone.value)">Call</button>
```

---

![fit 190%](https://media1.giphy.com/media/12NUbkX6p4xOO4/giphy.gif?cid=e1bb72ff5c6c328e32787a515922863e)

---

## Resumen

```javascript
@Component({
  selector: 'app-little-tour',
  template: `
    <input #newHero
      (keyup.enter)="addHero(newHero.value)"
      (blur)="addHero(newHero.value); newHero.value='' ">

    <button (click)="addHero(newHero.value)">Add</button>

    <ul><li *ngFor="let hero of heroes">{{hero}}</li></ul>
  `
})
export class LittleTourComponent {
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  addHero(newHero: string) {
    if (newHero) {
      this.heroes.push(newHero);
    }
  }
}
```

