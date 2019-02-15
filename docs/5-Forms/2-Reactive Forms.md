theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez

# Reactive Forms

---

# Que son?

- Propocionan una aproximación a los formularios basada en modelos de datos creados en nuestras clases asociadas a componentes
- Inmutables. Cada cambio en el estado de un form devuelve un nuevo estado => Eficiencia
- La implementación esta basada en Observables (Pueden accederse de forma síncrona) 
- Facilitan el testeo al estar basados en clases
- Lo que programo es lo que va a pasar y puedo depurarlo

---

# Registro del módulo que nos permite usar Reactive Forms

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

# FormControl. Registro en el componente

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

# FormControl. Registro en la template

```html
<label>
  Name:
  <input type="text" [formControl]="name">
</label>
```

---

# FormControl. Mostrar el componente

```html
<app-name-editor></app-name-editor>
```

---

# FormControl. Mostrando valores

- A través del Observable `valueChanges`
- A través de la propiedad `value`

```html
<p>
  Value: {{ name.value }}
</p>
```

---

# FormControl. Modificando el valor

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
- *FormGroup* permite controlar el estado de un grupo de *FormControl

---

# FormGroup. Creamos la instancia

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
  });
}
```

---

# FormGroup. Asociación modelo - vista

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

# FormGroup. Submit

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
```

```javascript
onSubmit() {
  console.warn(this.profileForm.value);
}
```

```html
<button type="submit" [disabled]="!profileForm.valid">Submit</button>
```

---

#FormGroup. Anidando

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

# FormGroup. Aninando en plantilla

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

---

#Ejemplo con patchValue

```javascript
updateUserProfile() {
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

El proceso de creación de un formulario usando *FormGroup* puede resultar repetitivo y monótono. 


Angular proporciona un método más declarativo y fácil de usar con *FormBuilder*.

---

# FormBuilder. Ejemplo

```javascript
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

# Validación

Una parte fundamental en cualquier librería o módulo de gestión de formularios es la validación de los mismos

---

# Validación en ReactiveForms 

```javascript
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: ['', MailValidator],
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

# Custom Validation

```javascript
export function MailValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  if (
    control.value &&
    (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))
  ) {
    return { malformedMail: true };
  }

  return null;
}
```

---

# FormArray

*FormArray* permite añadir *FormControl* de forma dinámica a nuestros formularios

---

# FormArray. Ejemplo

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

## FormArray. Uso en clase

###Accediendo a los *alias*

```javascript
get aliases() {
  return this.profileForm.get('aliases') as FormArray
}
```



### FormArray. Añadiendo nuevos *alias*

```javascript
addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

---

## FormArray. Uso en la plantilla

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


