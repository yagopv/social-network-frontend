theme: Next, 8
autoscale: true

# Injectors

---

## Injectors

- El sistema de inyección de dependencias de Angular es jerárquico
- Hay un arbol de inyectores paralelo al arbol de componentes de la aplicatión
- Estos inyectores son reconfigurables

---

## Platform Injector

- Se usa internamente durante el bootstrap de la app y es el injector que encontramos más arriba en la jerarquían de inyectores
- Configura servicios específicos de la plataforma
- Se pueden configurar más proveedores a través de `extraProviders` en la función platformBrowser()

```javascript
const platform = platformBrowserDynamic([ { 
  provide: SharedService, 
  deps:[] 
}]);
platform.bootstrapModule(AppModule);
platform.bootstrapModule(AppModule2);
```

---

## Root injector

- Se crea y asocia con nuestro AppModule

---

## @Injectable

- Podemos configurar en donde queremos inyectar el servicio a través de este decorador usando `providedIn`
- Es típico usar 'root' que representa el injector de AppModule

---

## @Injectable

Indicamos a Angular que el inyector de AppModule será el responsable de generar las instancias

```javascript
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() { }
}
```

---

## @Injectable

En este caso declaramos que este servicio debe ser creado por cualquier inyector de HeroModule

```javascript
@Injectable({
  providedIn: HeroModule,
})
export class HeroService {
  getHeroes() { return HEROES; }
}
```

Es casi lo mismo que usar NgModule para configurar el injector con la salvedad de que hacerlo así permite hacer uso del tree-shaking y por tanto es más óptimo

---

## @NgModule

Se puede configurar en el inyector del módulo. La diferencia es la comentada anteriormente respecto a usar @Injectable

```javascript
providers: [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]
```

---

## @Component

Los componentes de un módulo tienen sus propios inyectores. Puedo configurar los providers a este nivel y limitar el uso del servicio a este componente y sus hijos

```javascript
@Component({
  selector: 'app-heroes',
  providers: [ HeroService ],
  template: `
    <h2>Heroes</h2>
    <app-hero-list></app-hero-list>
  `
})
export class HeroesComponent { }
```

---

## @Directive

- Un @Component es una diretiva al fin y al cabo. por tanto puedo configurarlo también a nivel de directiva
- El injector en un componente o directiva se crea a nivel de DOM Element. Si tengo un componente con varias directivas sobre el mismo elemente, compartirán el injector

---

## Injector bubbling

- El mecanismo de búsqueda de un proveedor para mi dependencia es el típico que se sigue por ejemplo en el bubbling de eventos del DOM
- Comienzo la búsqueda por el injector del componente que solicita la dependencia
- Luego seguiré por el injector del componente padre
- Luego me voy al de módulo si no hay más padres
- Luego al root
- Finalmente me iría al platform injector si no lo he encontrado en ningún otro sitio. En este último caso se lanzaría una excepción

---

## @Host

Limita la búsqueda del proveedor al componente en el que lo usamos

```javascript
@Component({
  selector: 'app-hero-contact',
  template: `
  <div>Phone #: {{phoneNumber}}
  <span *ngIf="hasLogger">!!!</span></div>`
})
export class HeroContactComponent {
 
  hasLogger = false;
 
  constructor(
      @Host()
      private heroCache: HeroCacheService,
 
      @Host() 
      @Optional()
      private loggerService: LoggerService
  ) {
    if (loggerService) {
      this.hasLogger = true;
      loggerService.logInfo('HeroContactComponent can log!');
    }
  }
 
  get phoneNumber() { return this.heroCache.hero.phone; }
 
}
```

---

![](https://media.giphy.com/media/3oEduMJa2bhdNRpL4A/giphy.gif)








