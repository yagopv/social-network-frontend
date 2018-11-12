autoscale: true

# Forms

---

# Forms

- **Reactive**: Robustos, escalables, reusables y testables. Si la aplicación esta basada en formularios es una buena idea usarlos
- **Template-driven**: Fáciles de usar y comunes en aplicaciones que no contienen un gran número de formularios
- Con ambos tipos de formularios podemos hacer lo mismo

---

|                 | REACTIVE            | TEMPLATE-DRIVEN          |
| --------------- | ------------------- | ------------------------ |
| Configuración   | Explícita en clases | Directivas en plantillas |
| Modelo de datos | Estructurado        | Desestructurado          |
| Previsibilidad  | Síncrono            | Asíncrono                |
| Validaciones    | Funciones           | Directivas               |
| Mutabilidad     | Inmutable           | Mutable                  |
| Escalabilidad   | API Low-Level       | Abstracciones High-Level |

---

# Reactive Forms

---

# Que son?

- Propocionan una aproximación a los formularios basada en modelos de datos creados en nuestras clases asociadas a componentes
- Inmutables. Cada cambio en el estado de un form devuelve un nuevo estado
- La implementación esta basada en Observables (Pueden accederse de forma síncrona) 
- Facilitan el testeo al estar basados en clases
- Lo que programo es lo que va a pasar y puedo depurarlo. Son menos mágicos

---

# Paso 1. Registrar el módulo

```javascript
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```

---

# Paso 2. Crear un componente y registrar un nuevo FormControl

```javascript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
}
```

---

# Paso 3. Registrar el FormControl en la template

```html
<label>
  Name:
  <input type="text" [formControl]="name">
</label>
```



**Mostrar el componente**

```html
<app-name-editor></app-name-editor>
```

---

# Mostrando valores

- A través del Observable `valueChanges`
- A través de la propiedad `value`

```html
<p>
  Value: {{ name.value }}
</p>
```

---

# Modificando el valor

- A través del método `setValue()`. Modifica el valor y lo valida contra la estructura definida en el `FormControl`

```javascript
updateName() {
  this.name.setValue('Nancy');
}
```

```html
<p>
  <button (click)="updateName()">Update Name</button>
</p>
```

---

# FormGroup

- *FormControl* permite realizar tracking sobre un elemento *input* 
- *FormGroup* permite controlar el estado de un grypo de *FormControl

---

# Paso 1. Creamos la instancia

```javascript
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
}
```

---

# Paso 2. Asociamos el FormGroup con el modelo y la vista

```html
<form [formGroup]="profileForm">
  <label>
    First Name:
    <input type="text" formControlName="firstName">
  </label>

  <label>
    Last Name:
    <input type="text" formControlName="lastName">
  </label>
</form>
```

---

# Paso 3. Haciendo submit del form

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
```

```javascript
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
```

```html
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

---

#FormGroup en escenarios complejos

Cuando trabajamos con Formularios de cierta complejidad es interesante tener un mecanismo que nos permita agrupar elementos similares o que formen un todo juntos. Esto permite aplicar composición a los modelos de datos que estamos creando.



---

#Paso 1. Aninando FormGroup

```javascript
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
}
```

---

# Paso 2. Agrupando los elementos en la plantilla

```html
<form [formGroup]="profileForm">
    ...	
    <div formGroupName="address">
      <h3>Address</h3>

      <label>
        Street:
        <input type="text" formControlName="street">
      </label>

      <label>
        City:
        <input type="text" formControlName="city">
      </label>

      <label>
        State:
        <input type="text" formControlName="state">
      </label>

      <label>
        Zip Code:
        <input type="text" formControlName="zip">
      </label>
    </div>
</form>
```

---

# Actualizaciones parciales con *patchValue*

- *setValue*() permite reemplazar el valor de un *FormControl* completamente

- *patchValue()* permite actualizar diversos *FormControl* a la vez

```javascript
updateProfile() {
  this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street'
    }
  });
}
```

---

# FormBuilder

El proceso de creación de un formulario usando *FormBuilder* y *FormGroup* puede resultar repetitivo y monótono. 



Angular proporciona un método más declarativo y fácil de usar.

---

# Ejemplo de creación de formulario utilizando *FormGroup*

```javascript
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  constructor(private fb: FormBuilder) { }
}
```

---

# Validación en formularios

Una parte fundamental en cualquier librería o módulo de gestión de formularios es la validación de los mismos

---

# Validando un formulario

```javascript
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
});
```

```html
<input type="text" formControlName="firstName" required>
```

---

# FormArray

*FormArray* permite añadir *FormControl* de forma dinámica a nuestros formularios

---

# Definiendo un formulario con *FormArray*

```javascript
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
  aliases: this.fb.array([
    this.fb.control('')
  ])
});
```

---

## Utilizando nuestra nueva property

###Accediendo a los *alias*

```javascript
get aliases() {
  return this.profileForm.get('aliases') as FormArray
}
```



### Añadiendo nuevos *alias*

```javascript
addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

---

##Uso en la plantilla

```html
<div formArrayName="aliases">
  <h3>Aliases</h3> <button (click)="addAlias()">Add Alias</button>

  <div *ngFor="let address of aliases.controls; let i=index">
    <!-- The repeated alias template -->
    <label>
      Alias:
      <input type="text" [formControlName]="i">
    </label>
  </div>
</div>
```

---

# Template-driven Forms

---

# Qué son?

