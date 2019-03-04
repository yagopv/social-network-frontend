theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Template-driven Forms

---

## Qué son?

- Se puede crear practicamente cualquier formulario con una plantilla
- El flujo del formulario y control de errores lo controlamos directamente en la plantilla mediante el uso de directivas, data-binding y variables
- Menos flexibles y desde luego no muy reusables pero fáciles de crear

---

## FormsModule. Registro

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

## [(ngModel)]

```html
<input type="text" id="name" required [(ngModel)]="model.name" name="name">
```

- `[(ngModel)] ` two-way data binding permite comunicar el modelo con la vista y viceversa de una forma sencilla

- `ngModel` permite comprobar si el elemento ha sido visitado (touched), se ha introducido información (dirty) o si es válido (valid)

- Actualiza el control con una serie de clases en función de su estado (`ng-touched`, `ng-dirty`, `ng-valid`, `ng-untouched`, `ng-pristine`, `ng-invalid`)

- `ngModel` nos permite acceder a un `FormControl` subyacente

---

## NgForm

```html
<form #myForm="ngForm">
```

- `NgForm` se añade de forma automática cuando incluimos `FormsModule` a todos los formularios
- Complementa al elemento  `form`  con funcionalidad extra
- Contiene los controles que se han creado mediante la directiva  `ngModel`  y el atributo  `name` (obligatorio) monitorizando sus propiedades incluida su validez. 
- Podemos checkear la validez del formulario mediante la propiedad  `valid`.
- Internamente Angular creará instancias de `FormControl`

---

## Template variables

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

## Submit

En este caso no difiere de lo visto en `ReactiveForms`

```html
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
```


