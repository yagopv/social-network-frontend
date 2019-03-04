theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Structural Directives

---

## Structural Directives

- Son responsables de añadir, eliminar o modificar elementos del DOM
- Se pueden aplicar a cualquier *host element*

---

## Eliminar vs ocultar 

Otra forma de NO mostrar un elemento DOM sería

```html
<p [style.display]="'none'">
  Expression sets display to "none".
  This paragraph is hidden but still in the DOM.
</p>
```

Pero aunque el resultado visual sea el mismo las diferencias son mayores

- Cuando utilizo una directiva como `ngIf` se eliminan listeners y todos los elementos y clases asociados. Al hacer el attach de nuevo, comienza el ciclo de vida del componente

- Cuando utilizo style se mantiene el estado con todas las consecuencias. Puede que sea lo buscado en algún caso

---

## *

- Las directivas estructurales tienen una sintaxis particular utilizando un asterisco _*_ 

- En compilación esto se traduce a un tag *ng-template* alrededor del *host*

---

## NgIf

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>

<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
```

---

## NgFor

```html
<div *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>

<ng-template ngFor let-hero [ngForOf]="heroes" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{hero.name}}</div>
</ng-template>
```

---

## NgSwitch

```html
<div [ngSwitch]="hero?.emotion">
  <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="hero"></app-happy-hero>
  <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="hero"></app-sad-hero>
  <app-confused-hero *ngSwitchCase="'app-confused'" [hero]="hero"></app-confused-hero>
  <app-unknown-hero  *ngSwitchDefault           [hero]="hero"></app-unknown-hero>
</div>


<div [ngSwitch]="hero?.emotion">
  <ng-template [ngSwitchCase]="'happy'">
    <app-happy-hero [hero]="hero"></app-happy-hero>
  </ng-template>
  <ng-template [ngSwitchCase]="'sad'">
    <app-sad-hero [hero]="hero"></app-sad-hero>
  </ng-template>
  <ng-template [ngSwitchCase]="'confused'">
    <app-confused-hero [hero]="hero"></app-confused-hero>
  </ng-template >
  <ng-template ngSwitchDefault>
    <app-unknown-hero [hero]="hero"></app-unknown-hero>
  </ng-template>
</div>
```

---

## <ng-template />

- Es un elemento del framework para mostrar HTML
- Nunca se visualiza en el DOM, es un elemento Angular que desaparece tras la compilación
- Se sustituye por un comentario en la fase de render

---

## <ng-container />

- Se puedo usar `ng-container` en caso de no disponer de un elemento host
- Reducimos riesgo de recibir estilos globales
- Sólo se puede introducir una directiva estructural por elemento por lo que una buena forma de esquivar esta restricción es mediante el anidado de varios `ng-container`

---

## Ejemplo

```javascript
@Directive({ 
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

