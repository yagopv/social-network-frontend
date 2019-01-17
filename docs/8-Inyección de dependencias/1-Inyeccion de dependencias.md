theme: Next, 8
autoscale: true

# Inyección de dependencias (DI)

---

# En qué consiste el patrón DI

---

[.code-hightlight: all]
[.code-hightlight: 3]
[.code-hightlight: 4]
[.code-hightlight: 5]
[.code-hightlight: 3-5]
[.code-hightlight: all]
```javascript
class Car {
  constructor() {
    this.engine = new Engine();
    this.tires = Tires.getInstance();
    this.doors = app.get('doors');
    this.milesDriven = 0;
  }

  drive(miles) {
    this.milesDriven = this.milesDriven + miles;
  }
}
```

---


[.code-hightlight: all]
[.code-hightlight: 2]
```javascript
class Car {
  constructor(engine, tires, doors) {
    this.engine = engine;
    this.tires = tires;
    this.doors = doors;
    this.milesDriven = 0;
  }

  drive(miles) {
    this.milesDriven = this.milesDriven + miles;
  }
}
```

---

```javascript
var car = new Car(
  new Engine(),
  new Tires(),
  new Doors()
);
```

---

```javascript
var mockCar = new Car(
  new MockEngine(),
  new MockTires(),
  new MockDoors()
);
```

---

![](https://media.giphy.com/media/xT1XGVp95GDPgFYmUE/giphy.gif)

---

# DI en Angular

---

## Cómo inyectar un servicio en Angular

```javascript
@Component({
  selector: 'example-component',
  template: '<div>I am a component</div>'
})
class ExampleComponent {
  constructor(private http: Http) {
    this.http.get() ...
  }
}
```

---

## Cómo inyectar un servicio en Angular

- A través de la definición del tipo `Http` con Typescript Angular asigna una instacia del Servicio al parámetro `http`
- `tsconfig.json` contiene una propiedad _emitDecoratorMetadata_ establecida a _true_. Esto emite metadata acerca del tipo del parámetro al compilar el TypeScript a JavaScript

---

## Cómo inyectar un servicio en Angular

Versión compilada de nuestro Componente

[.code-highlight: all]
[.code-highlight: 13]
```javascript
var ExampleComponent = (function() {
  function ExampleComponent(http) {
    this.http = http;
  }
  return ExampleComponent;
})();
ExampleComponent = __decorate(
  [
    Component({
      selector: 'example-component',
      template: '<div>I am a component</div>',
    }),
    __metadata('design:paramtypes', [Http]),
  ],
  ExampleComponent
);
```

---

## Cómo inyectar un servicio en Angular

Al compilar a JavaScript estamos informando a Angular que el primer parámetro de nuestro componente necesita una instancia del servicio Http

```javascript
__metadata('design:paramtypes', [Http]);
```

Angular se encargará a través de una serie de reglas de buscar la instancia de ese servicio para proporcionársela al constructor

---

## @Inject

@Inject es una forma manual de buscar un determinado **token** (Http) para su inyección

```javascript
@Component({
  selector: 'example-component',
  template: '<div>I am a component</div>'
})
class ExampleComponent {
  constructor(@Inject(Http) private http) { }
}
```

Si hay un montón de dependencias el contructor puede convertirse en ilegible. Dado que Angular soporta la inyección a través de la emisión de metadatos la mayor parte del tiempo (o nunca probablemente) no es necesario usar @Inject

---

## @Injectable

Usamos @Injectable para declarar un servicio como apto para ser usado como dependencia. Realmente sólo es obligatorio si el servicio cuenta a su vez con alguna dependencia (Si no lo añadimos no se emitiría metadata) pero por convención se añade SIEMPRE

```javascript
@Injectable()
export class UserService {
  constructor(private http: Http) {}
  isAuthenticated(): Observable<boolean> {
    return this.http.get('/api/user').map((res) => res.json());
  }
}
```

---

## Registrando un proveedor

La forma:

```javascript
@NgModule({
  providers: [AuthService],
})
class ExampleModule {}
```

es un atajo de:

```javascript
@NgModule({
  providers: [
    {
      provide: AuthService,
      useClass: AuthService,
    },
  ],
})
class ExampleModule {}
```

---

## Registrando un provider

- La propiedad `provide` es el token para el provider que estamos registrando. 
- Angular puede buscar qué esta almacenado bajo el token `AuthService` usando el valor de `useClass`
- Una de las ventajas que nos proporciona es que podemos tener 2 proveedores diferentes usando la misma clase o sobreescribir el proveedor con otro diferente manteniendo el nombre del token

---

## Sobreescribiendo providers

Cambio de requerimiento para usar la autenticación de Facebook en lugar de la implementada

```javascript
@NgModule({
  declarations: [LoginComponent, UserInfoComponent],
  providers: [
    {
      provide: AuthService,
      useClass: MyAppAuthService,
    },
  ],
})
export class AuthModule {}
```

```javascript
@NgModule({
  declarations: [LoginComponent, UserInfoComponent],
  providers: [
    {
      provide: AuthService,
      useClass: FacebookAuthService,
    },
  ],
})
export class AuthModule {}
```

No necesito modificar las dependenciar en cada componente que use el servicio

---

## @Optional

Podemos hacer que una dependencia sea opcional

```javascript
constructor(@Optional() private logger: Logger) {
  if (this.logger) {
    this.logger.log(some_message);
  }
}
```

---

## Value Providers

Podemos proporcionar string, numbers, o objjetos preparados para ser usados en lugar de pedir a Angular que cree una instancia de una clase

```javascript
export function SilentLoggerFn() {}

const silentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: SilentLoggerFn
};

[{ provide: Logger, useValue: silentLogger }]

```

---

## Factory Providers

Podemos utilizar una factoría para crear instancias de forma dinámica

[.code-highlight: all]
[.code-highlight: 3]
```javascript
constructor(
  private logger: Logger,
  private isAuthorized: boolean) { }

getHeroes() {
  let auth = this.isAuthorized ? 'authorized ' : 'unauthorized';
  this.logger.log(`Getting heroes for ${auth} user.`);
  return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
}
```

Qué pasa si no quiero inyectar un servicio completo AuthService y solamente quiero hacerlo con la propiedad isAuthorized
Podemos inyectar Logger pero no isAuthorized => Necesitamos una factoría

---

## Factory Providers

```javascript
let heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};

export let heroServiceProvider =
  { provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
  };
```

---

## Factory Providers

```javascript

@Component({
  selector: 'app-heroes',
  providers: [ heroServiceProvider ],
  template: `
    <h2>Heroes</h2>
    <app-hero-list></app-hero-list>
  `
})
export class HeroesComponent { }
```

---

## Tokens y Providers de Angular

Angular proporciona tokens y providers que podemos usar para modificar el comportamiento del framework como por ejemplo PLATFORM_INITIALIZER, APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, NG_VALIDATORS, RouterModule.forRoot, RouterModule.forChild ...etc.

---

## Tree-Shaking de providers

Cuando especifico el array de providers en el NgModule, el servicio acabará en el bundle final aunque no se esté usando en la aplicación
Hay una forma de evitarlo (Angular 6+)

```javscript
@Injectable({
  providedIn: 'root',
})
export class Service {
}

@Injectable({
  providedIn: 'root',
  useFactory: () => new Service('dependency'),
})
export class Service {
  constructor(private dep: string) {
  }
}
```
