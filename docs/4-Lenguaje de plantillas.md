autoscale: true

# {{ Interpolation }}

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

# Expresiones

Las expresiones en plantillas producen valores. La sintaxis similar a Javascript pero con ciertas caracteristicas prohibidas:

- Asignaciones (=, +=, -=, ...)
- Operador new
- Encadenando expresiones con ; o ,
- Operadores de incremento / decremento (++ y --)
- Sin soporte para operadores bitwise | y &
- Nuevos operadores introducidos por Angular como |, ?. y !.

---

# Contexto de la expresión

Normalmente el contexto será el componente al que pertenece pero también puede utilizar elementos dentro de la plantilla HTML a la que pertenece

```html
{{title}}
<span [hidden]="isUnchanged">changed</span>

<div *ngFor="let hero of heroes">{{hero.name}}</div>

<input #heroInput> {{heroInput.value}}
```

^ El scope esta limitado a la propia plantilla y el componente asociado. No se puede referenciar global scope (window)

---

# Declaraciones

Una declaración responde a un evento lanzado por un binding target (element, component, directive)

La diferencia con las expressiones es que producen efectos colaterales. Así es como modificamos el estado de nuestra aplicación. Respondiendo eventos

```html
<button (click)="deleteHero()">Delete hero</button>
```

---

# Contexto de la declaración

Normalmente es el componente asociado.

También puede hacer referencia a

```html
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```

---

# REGLA DE ORO

Tanto las expresiones como las declaraciones han de ser simples.

Evitar cálculos complejos o expresiones complejas.

La complejidad se ha de derivar al componente o servicios

---

# Data binding

---

# One way (Data source - Target view)

```html
{{expression}}
[target]="expression"
bind-target="expression"
```

---

# One way (Target view - Data source)

```html
(target)="statement"
on-target="statement"
```

---

# Two way

```html
[(target)]="expression"
bindon-target="expression"
```

---

# HTML Attributes vs DOM Properties

Es importante distinguir entre atributos y propiedades para entender la forma de funcionar de Angular

Los atributos inicializan propiedades o caracteristicas del elemento al que pertenecen. El valor real realmente reside en la propiedad DOM del elemento.

Algunos nombres de atributos se corresponden con las propiedades (Por ejemplo id) pero no tienen porque.

Un ejemplo claro es el uso de value en in input

---

```
<input value='My value' />
```

value como atributo inicializa el valor del input pero cuano escribo no se actualiza. La que se actualiza es la propiedad subyacente.

** El data binding de Angular funciona a nivel de DOM Properties y Eventos **

---

# [Property binding]

Conocido también como one-way data binding porque solo se propaga desde el componente a la vista

---

# Propiedad del elemento - propiedad del componente

```html
<img [src]="heroImageUrl">

<button [disabled]="isUnchanged">Cancel is disabled</button>
```

---

# Directiva - Propiedad del componente

```html
<div [ngClass]="classes">binding to the classes property</div>
```

---

# Propiedad del componente subyacente (Comunicación padre - hijo)

```html
<app-hero-detail [hero]="currentHero"></app-hero-detail>
```

Tambien se puede usar la sintaxis `bind-*`

Si omito los brackets entonces la propiedad no se actualizará. En ocasiones es lo buscado.

---

## Property binding o interpolation

Normalmente son intercambiables y es una cuestión de preferencia.

```html
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{title}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>
```

---

# Attribute binding (La excepción que confirma la regla)

Deciamos que **El data binding de Angular funciona a nivel de DOM Properties y Eventos**

Hay una excepción y es cuando utilizamos _attribute binding_. Hay ciertos atributos HTML que podemos necesitar enlazar utilizando nuestras clases modelo por ejemplo, atributos de accesibilidad (ARIA), SVGs, o _table spans (colspan)_ que no tienen correspondencia con propiedades del elemento en el DOM

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

Lo cual efectivamente cumple nuestra regla. Como lo solucionamos ?

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

# Class & Style binding

Podemos añadir clases o estilos inline usando _class_ y _style_ junto a la clase o propiedad que queremos enlazar

---

# class

```html
<!-- Añade o elimina todas las clases a la vez. O todas o ninguna  -->
<div class="bad curly special" [class]="badCurly">Bad curly</div>

<!-- Añade o elimina la clase isSpecial en función de una propiedad del modelo -->
<div [class.special]="isSpecial">The class binding is special</div>

<!-- Sobreescrimos la clase con lo que contenga la propiedad del modelo -->
<div class="special"
     [class.special]="!isSpecial">This one is not so special</div>
```

---

# style

```html
<button [style.color]="isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>
<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>
```

---

# (Event binding)

Los usuarios no se quedan simplemente mirando a la pantalla. El flujo de datos hasta ahora es siempre del componente a la vista

El binding de eventos nos permite hacer el flujo contrario, de la vista al componente

---

# Eventos nativos

```html
<button (click)="onSave($event)">Save</button>
<button on-click="onSave($event)">On Save</button>
```

El nombre entre `()` representa el evento (eventos estándar de los elementos DOM) sobre el que queremos añadir el listener. `onSave()` representa el método del Componente asociado que queremos ejecutar

`$event` existirá en el contexto de la plantilla y se puede pasar al método ejecutado. `$event` es un objeto de un evento DOM.

---

# Eventos custom

Mediante el uso de Event Emitter puedo lanzar eventos propios de la aplicación

Es de gran utilidad cuando el componente no necesita conocer la implementación concreta => Reusabilidad

Es un patrón que se usa de forma extendida en la aplicaciones Angular

Por ejemplo, este componente no sabe como efectuar un borrado, simplemente emite un evento:

---

```
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

```
<app-hero-detail (deleteRequest)="deleteHero($event)" [hero]="currentHero"></app-hero-detail>
```

---

# [(Two-way binding)]

A veces necesitaremos que el binding vaya en ambos sentidos

---

```
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

```
<app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer>
```

Este patrón tiene su sintaxis propia en Angular

```
<app-sizer [(size)]="fontSizePx"></app-sizer>
<div [style.font-size.px]="fontSizePx">Resizable Text</div>
```

---

# Attribute vs Structural Directives

Angular permite construir diretivas de dos tipos:

- Attribute: Modifican el comportamiento de los elementos HTML y se aplican como atributos

- Structural: Se responsbilizan de controlar el DOM añadiendo o eliminando nodos

---

# Built-in attribute directives

Las directivas de atributo van ligadas y modifican el comportamiento de los elementos HTML. Hay varias predefinidas:

---

# NgClass

Directiva avanzada para el control del atributo class. Podemos añadir o eliminar varias clases a la vez, cosa que no podríamos hacer a través de property binding con `class`

```
<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>

...

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

# NgStyle

Similar a NgClass pero para los estilos inline

```
<div [ngStyle]="currentStyles">
  This div is initially italic, normal weight, and extra large (24px).
</div>

...

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

# NgModel (Two-way data binding)

Directiva especializada para controlar elementos de un formulario.

```
<input [(ngModel)]="currentHero.name">
```

---

En realidad `ngModel` es simplemente un shorthand de:

```
<input
  [ngModel]="currentHero.name"
  (ngModelChange)="currentHero.name=$event">
```

---

que a su vez oculta el funcionamiento real del elemento input que seria:

```
<input [value]="currentHero.name"
       (input)="currentHero.name=$event.target.value" >
```

---

El shorthand `[(ngModel)]`solo puede realizar el binding con una propiedad. Si se necesita algo más avanzado se puede recurrir a la forma extendida

```
<input
  [ngModel]="currentHero.name"
  (ngModelChange)="setUppercaseName($event)">
```

---

# Built-in structural directives

Este tipo de directivas permiten modificar el DOM subyacente añadiendo, eliminando o modificando elementos

---

# NgIf

Permite añadir o eliminar un elemento del DOM a través de la evaluación boolena de una propiedad o expresión

```
<app-hero-detail *ngIf="isActive"></app-hero-detail>
```

---

# NgForOf

Esta directiva permite la repetición de un elemento DOM a través de una sintaxis propia que Angular puede interpretar y que se conoce como _microsyntax_

```
<div *ngFor="let hero of heroes; let I=index; trackBy: hero.id">{{i + 1}} - {{hero.name}}</div>
```

- `let` crea una variable local en el contexto de la directiva
- `index` es un indice que comienza en cero y representa el elemento del array que se esta renderizando
- `trackBy` permite optimizar el rendimiento de la directiva al enlazar una nueva colección (Por ejemplo después de una llamada AJAX)

---

# NgSwitch

Es un conjunto de directivas que emulan el comportamiento de un bloque switch.

```
<div [ngSwitch]="currentHero.emotion">
  <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="currentHero"></app-happy-hero>
  <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="currentHero"></app-sad-hero>
  <app-confused-hero *ngSwitchCase="'confused'" [hero]="currentHero"></app-confused-hero>
  <app-unknown-hero  *ngSwitchDefault           [hero]="currentHero"></app-unknown-hero>
</div>
```

Sólo se mostrará el bloque que cumpla la condición. Nótese que ngSwitch es una directiva de atributo (Sin \*)

---

# Variables en plantillas

Se pueden definir variables locales en plantillas mediante #. La variable se puede referencias en cualquier lado de la plantilla

```
<input #phone placeholder="phone number">

<!-- lots of other elements -->

<!-- phone refers to the input element; pass its `value` to an event handler -->
<button (click)="callPhone(phone.value)">Call</button>
```

---

# Plantilla resumen

```
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
