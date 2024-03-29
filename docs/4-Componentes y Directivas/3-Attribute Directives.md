theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Attribute Directives

---

## Attribute Directives

Se encargan de modificar la apariencia o comportamiento de un elemento, componente o otra directiva

---

## @Directive

Se definen usando el decorator @Directive

```javascript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() { }
}
```

---

## ElementRef

Podemos inyectar `ElementRef` para permitir acceso al elemento *host* a través de su propiedad *nativeElement*



```javascript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```

---

## HostListener

Con `HostListener` podemos suscribirnos a eventos DOM



```javascript
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight(null);
}

private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
}
```

---

## @Input

Podemos usar `@Input` para enviar valores a la Directiva como venimos haciendo habitualmente

```html
<p [appHighlight]="color">Highlight me!</p>
```

```javascript
@Input('appHighlight') highlightColor: string;
@HostListener('mouseenter') onMouseEnter() {
  this.highlight(this.highlightColor || 'red');
}

```

---

## @HostBinding


Puedo utilizar `HostBinding` para enlazar con atributos del elemento contenedor

```javascript
@HostBinding('class.active') private ishovering: boolean;
```



