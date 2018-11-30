theme: Next, 8
autoscale: true

# Template-driven Forms

---

# Qué son?

- Se puede crear practicamente cualquier formuliario con una plantilla
- El flujo del formulario y control de errores lo controlamos directamente en la plantilla mediante el uso de directivas, data-binding y variables
- Menos flexibles y desde luego no muy reusables pero rápidos y fáciles de usar

---

# Registrar el módulo

```javascript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    FormsModule
  ],
})
export class AppModule { }
```

El registro de `FormsModule` hace que automáticamente se evalúe cada formulario como un `template-drive form` añadiendo una directiva `ngForm` a cada uno		

------

# [(ngModel)]

`[(ngModel)] ` two-way data binding permite comunicar el modelo con la vista de una forma sencilla

```html
<input type="text" id="name"
       required
       [(ngModel)]="model.name" name="name">
```

La directiva `ngModel` permite comprobar si el elemento subyacente ha sido visitado (touched), se ha introducido información (dirty) o si es válido (valid)

Además actualiza el control con una serie de clases especiales en función de su estado (`ng-touched`,` ng-dirty`,` ng-valid`,`ng-untouched`,` ng-pristine`,` ng-invalid`)

La directiva `ngModel` nos permite acceder a un `FormControl` subyacente.

---

# NgForm

La directiva `NgForm` se añade de forma automática cuando incluimos `FormsModule`

Podemos referenciarla mediante:

```html
<form #heroForm="ngForm">
```

Esta directiva complementa al elemento  `form`  con funcionalidad extra. 

Contiene los controles que se han creado mediante la directiva  `ngModel`  y el atributo  `name` (obligatorio) monitorizando sus propiedadesm incluido su validez. Además podemos checkear la validez del formulario mediante la propiedad  `valid`.

Internamente Angular creará instancias de `FormControl`

---

# Template variables

Necesitaremos variables para efectuar la gestión del formulario en la plantilla

```html
<label for="name">Name</label>
<input type="text" class="form-control" id="name"
       required
       [(ngModel)]="model.name" name="name"
       #name="ngModel">
<div [hidden]="name.valid || name.pristine"
     class="alert alert-danger">
  Name is required
</div>
```

---

# Form Submit

En este caso no difiere de lo visto en `ReactiveForms`

```html
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
```

---

# Validación

- La validación en los `template-driven forms` se realiza a partir de atributos al igual que la validación HTML nativa. Angular usa directivas para emparejar dichos atributos con funciones encargadas de realizar la validación

- Cada vez que un valor cambia se ejecuta la validación 
- Podemos inspeccionar el resultado exportando el control a través de una variable
- Podemos utilizar validación custom a través de directivas

---

# Validación

```html
<input id="name" name="name" class="form-control"
      required minlength="4" appForbiddenName="bob"
      [(ngModel)]="hero.name" #name="ngModel" >

<div *ngIf="name.invalid && (name.dirty || name.touched)"
    class="alert alert-danger">

  <div *ngIf="name.errors.required">
    Name is required.
  </div>
  <div *ngIf="name.errors.minlength">
    Name must be at least 4 characters long.
  </div>
  <div *ngIf="name.errors.forbiddenName">
    Name cannot be Bob.
  </div>

</div>
```

---

# Custom validation

En `template-driven forms` no tenemos acceso directo al `FormControl` por lo que tenemos que añadir una directiva a la plantilla que actúe como contenedor. Para que Angular la reconozca como tal necesitamos registrarla en el módulo correspondiente



```javascript
providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
```

