theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

# Form Validation

---

## Form validation

- Una parte crítica de la gestión de formularios es la validación de los mismos
- Angular proporciona una serie de utilidades para facilitar la validación tanto en formularios reactivos como template-driven

---

# Reactive Forms

---

## Validación en ReactiveForms 

Se añaden validares que proporciona el framework (built-in) o bien validadores custom

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
<input type="text" formControlName="firstName">
```

---

## Built-in validators

```javascript
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl): ValidationErrors | null
  static requiredTrue(control: AbstractControl): ValidationErrors | null
  static email(control: AbstractControl): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
  static nullValidator(control: AbstractControl): ValidationErrors | null
  static compose(validators: ValidatorFn[]): ValidatorFn | null
  static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
```

---

## Custom Validation

Lo único que se necesita es pasar el FormControl y devolver un objeto con el resultado de la validación o null

```javascript
export function MailValidator(
  control: AbstractControl
): { [key: string]: boolean } {
  const EMAIL_REGEXP = 
    /^[a-z0-9!##$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

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

## Validación cruzada

```javascript
const heroForm = new FormGroup({
  'name': new FormControl(),
  'alterEgo': new FormControl(),
  'power': new FormControl()
}, { validators: identityRevealedValidator });

...

export const identityRevealedValidator: ValidatorFn = 
  (control: FormGroup): ValidationErrors | null => {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');

    return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
};
```

---

# Template-driven

---

## Validación en template-driven forms

- Se realiza a partir de atributos al igual que la validación HTML nativa
- Angular usa directivas para emparejar dichos atributos con funciones encargadas de realizar la validación
- Cada vez que un valor cambia se ejecuta la validación 
- Podemos inspeccionar el resultado exportando el control a través de una variable
- Podemos utilizar validaciones personalizadas a través de creación de directivas

---

## Validación

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

## Creando validadores

En `template-driven forms` no tenemos acceso directo al `FormControl` por lo que tenemos que añadir una directiva a la plantilla que actúe como contenedor

Para que Angular la reconozca como tal necesitamos registrarla en el módulo correspondiente


```javascript
  // multi porque se pueden crear desde varios sitios. Reune las validaciones en un único provider como array
  // useExisting para reutilizar la instancias. useClass crearia una cada vez que utilizamos la directiva
  providers: [
    { provide: NG_VALIDATORS, useExisting: MailValidatorDirective, multi: true } 
  ]
```

---

## Creando validadores. La directiva

```javascript
@Directive({
  selector: '[snMail]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MailValidatorDirective, multi: true }
  ]
})
export class MailValidatorDirective implements Validator {
  @Input('snMail') mail: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return MailValidator(control);
  }
}
```

---

## Validación cruzada

```javascript
@Directive({
  selector: '[appIdentityRevealed]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IdentityRevealedValidatorDirective, multi: true }]
})
export class IdentityRevealedValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return identityRevealedValidator(control)
  }
}
```

```html
<form #heroForm="ngForm" appIdentityRevealed>
```

---

# Clases CSS 

---

## Generación automática de clases

- Angular genera de forma automática clases por nosotros
- Nos facilita la maquetación de la interfaz

---

## Clases

.ng-valid
.ng-invalid
.ng-pending
.ng-pristine
.ng-dirty
.ng-untouched
.ng-touched

---

## CSS

```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948;
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442;
}
```

---

# Async Validation

---

## Async validation

- ValidatorFn -> AsyncValidatorFn
- En lugar de devolver una función devolvemos una Promise o Observable
- El Observable debe retornarse en un estado completado (first, last, take, or takeUntil)
- Cuando comienza la validación podemos visualizar el estado pending en nuestros controles asociados

---

## Pending Async validation

```html
<input [(ngModel)]="name" #model="ngModel" appSomeAsyncValidator>
<app-spinner *ngIf="model.pending"></app-spinner>
```

---

## Ejemplo

```javascript
@Injectable({ providedIn: 'root' })
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private heroesService: HeroesService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.heroesService.isAlterEgoTaken(ctrl.value).pipe(
      map(isTaken => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => null)
    );
  }
}
```

---

## UpdateOn

- Es interesante en algunas situaciones validar solamente los formularios una vez que hacemos foco fuera del campo
- Un caso claro serian las validaciones asincronas. Seria muy negativo hacerlo cada vez que tecleamos sobre el campo

---

## UpdateOn

Template-driven

```html
<input [(ngModel)]="name" [ngModelOptions]="{updateOn: 'blur'}">
```

FormControl

```javascript
new FormControl('', {updateOn: 'blur'});
```

FormGroup

```javascript
{ updateOn: 'blur' }
```
