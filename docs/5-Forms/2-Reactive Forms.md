theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Reactive Forms

---

## Que son?

- Se basan en la creación de modelos de datos en clases
- Inmutables. Cada cambio en el estado de un form devuelve un nuevo estado => Eficiencia
- La implementación esta basada en Observables (Pueden accederse de forma síncrona) 
- Facilitan el testing al estar basados en modelos de datos
- Lo que programo es lo que va a pasar y por tanto puedo depurarlo. Tengo el control

---

## ReactiveFormsModule

El módulo que nos permite el uso de los formularios reactivos. Se registra de la siguiente forma:

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

## FormControl. Registro en componente

FormControl permite el registro de controles en nuestros componentes

```javascript
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

## FormControl. Registro en template

Luego los asociaremos con las plantillas

```html
<label>
  Name:
  <input type="text" [formControl]="name">
</label>
```

---

## FormControl. Acceso a valores

Podemos acceder a los valores subyacentes

- A través del Observable _valueChanges_
- A través de la propiedad _value_

```html
<p>
  Value: {{ name.value }}
</p>
```

---

## FormControl. Modificando de valores

- A través del método _setValue()_. Modifica el valor y lo valida contra la estructura definida en el FormControl

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

## FormGroup

- FormControl permite realizar tracking sobre un elemento input
- FormGroup permite controlar el estado de un grupo de varios FormControl

---

## FormGroup. Creación del modelo

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

## FormGroup. Asociación con template

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

## FormGroup. Submit

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
```

```javascript
onSubmit() {
  console.warn(this.profileForm.value);
}
```

```html
<button type="submit">Submit</button>
```

---

##FormGroup. Nesting en el componente

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

## FormGroup. Nesting en template

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

## Actualizaciones parciales con patchValue

- _setValue()_ permite reemplazar el valor de un FormControl completamente
- _patchValue()_ permite actualizar varios FormControl a la vez sin tener que especificar todos

---

## Ejemplo con patchValue

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

## FormBuilder

El proceso de creación de un formulario usando FormGroup puede resultar repetitivo y monótono 
Angular proporciona un método más declarativo y fácil de usar que básciamente hace lo mismo

---

## FormBuilder. Declaración

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

## FormArray

*FormArray* permite añadir *FormControl* de forma dinámica a nuestros formularios

---

## FormArray. Ejemplo

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

### Accediendo a los alias

```javascript
get aliases() {
  return this.profileForm.get('aliases') as FormArray
}
```



### FormArray. Añadiendo nuevos alias

```javascript
addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

---

## FormArray. Uso en template

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


