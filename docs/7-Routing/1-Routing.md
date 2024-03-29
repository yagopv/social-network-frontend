theme: Next, 8
autoscale: true
slidenumbers: true

# Angular Router

---

![left fit](https://media1.giphy.com/media/xT0Gqe9Ap0qSOLicKc/giphy.gif?cid=e1bb72ff5c6e6d2a6479414f6f1c1657)

## Single Page Applications (SPA)

- Tradicionalmente la navegación se realizaba a través de un servidor que generaba el código HTML de la página y lo enviaba al cliente conectado
- Desde hace unos años nuevos modelos se han establecido como Single Page Applicactions o Server Side Rendering
- En una SPA entregamos una plantilla HTML básica al cliente con una serie de bundles javascript y a partir de ahí es el cliente el encargado de construir la página

---

## SPA. Ventajas

- Una vez cargadala página  la velocidad y respuesta de la página es mayor y la experiencia de usuario mejora

- El cacheo de datos en local es muy efectivo

- Capacidad de depuración aumenta con los frameworks JS y herramientas disponibles en los navegadores

- Desacoplamiento claro de un API REST

---

## SPA. Inconvenientes

- El renderizado inicial es mas lento 
- SEO. Google no renderiza perfectamente JS
- Browser History, moverse entre estados. Necesitamos ayuda, por ejemplo el **Router de Angular**

---

## El navegador y su modelo de navegación

- A través de direcciones en la barra de direcciones
- A través de eventos click en links
- Utilizando los botones de navegación

---

## Angular Router

El router de Angular, como en el resto de Frameworks JS intenta replicar el modelo de navegación de los navegadores y facilitar el uso de la SPA

---

## Configuración del router

Necesito configurar la URL base o decirle a Angular a partir de dónde encontrar las rutas

```html
<base href="/">
```

Tengo que Importar el módulo

```javascript
import { RouterModule, Routes } from '@angular/router';
```

---

## Configuración del router

Creación de las rutas. El orden importa y gana la primera que coincida

```javascript
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
```

---

## Configuración del router en NgModule

```javascript
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // Debug
    )
  ...
  ],
  ...
})
export class AppModule { }
```

---
## Router

Es el [servicio](https://angular.io/api/router/Router) que nos permite realizar la navegación entre rutas así como el acceso a todas las propiedades principales

---
## Routes

El tipo que define el array de rutas de la aplicación y sus mapeos con el correspondiente componente

---
## Route

- La interfaz de cada uno de los objetos que forman el array de Routes

- Define cómo el Router debe navegar a un componente basado en un patrón de URL

---

## RouterOutlet

Directiva que se encarga de marcar la posición en la que empezar a renderizar en la plantilla

```html
<router-outlet></router-outlet>
```

---

## RouterLink

Directiva para navegación entre rutas. Admite strings o array dinámico

```html
<h1>Angular Router</h1>
<nav>
  <a routerLink="/crisis-center">Crisis Center</a>
  <a routerLink="/heroes">Heroes</a>
</nav>
<router-outlet></router-outlet>
```

---
## RouterLink dinámico

```html
// /team/11/user/bob;details=true
<a [routerLink]="['/team', teamId, 'user', userName, {details: true}]">
</a>

// /user/bob?debug=true
<a [routerLink]="['/user/bob']" [queryParams]="{debug: true}">
</a>
```

---
## RouterLinkActive

Directiva para añadir o eliminar clases en función de si una ruta esta activa o no

```html
<a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
```

---

## RouterState

- El estado actual del Router
- Después de cada navegación se contruye el arbol de rutas activadas (ActivatedRoute)
- Se puede acceder al RouterState a través del servicio Router

---

## RouterState

```javascript
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    //...
  }
}
```

---

## ActivatedRoute

Servicio que se utiliza para acceder a la información de la ruta actual

```javascript
@Component({...})
class MyComponent {
  constructor(route: ActivatedRoute) {
    const id: Observable<string> = route.params.map(p => p.id);
    const url: Observable<string> = route.url.map(segments => segments.join(''));
    // route.data includes both `data` and `resolve`
    const user = route.data.map(d => d.user);
  }
}
```

---

## ActivatedRouteSnapshot

- En muchos casos utilizaré el snapshot de la ruta. 
- ActivatedRoute contiene muchas propiedades Observables por lo que resulta interesante para suscribirse a cambios
- ActivatedRouteSnapshot en cambio nos proporciona acceso al valor actual de dichas propiedades

---

## Router Events

- El router [emite eventos](https://angular.io/guide/router#router-events) en cada navegación.
- Emite eventos a través de la propiedad Observable Router.events

---

## Usando Los eventos del Router para realizar acciones

```javascript
@Component({
  selector: 'app-routable',
  templateUrl: './routable.component.html',
  styleUrls: ['./routable.component.css']
})
export class RoutableComponent implements OnInit {
 
  navStart: Observable<NavigationStart>;
 
  constructor(private router: Router) {
    // Create a new Observable the publishes only the NavigationStart event
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }
 
  ngOnInit() {
    this.navStart.subscribe(evt => console.log('Navigation Started!'));
  }
}
```

---

## Routing component

Se dice que un componente es un routing component cuando tiene un RouterOutlet en su plantilla

---

## Routing Module

Es habitual crear uno o más módulos para definir las rutas Este módulo se importará en el módulo principal o funcional asociado

```javascript
const appRoutes: Routes = [
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes',        component: HeroListComponent },
  { path: '**', component: PageNotFoundComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

## Child Routes. Definiendo las rutas

```javascript
const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];
```

---

## Child Routes. Definiendo el Routing Module como módulo funcional

```javascript
@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrisisCenterRoutingModule { }
```

---

## Guards

```javascript
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}
```

---

## Guards

```javascript
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ],
      }
    ]
  }
];
```

---

## Lazy Loading

Mediante lazy loading puedo cargar módulos de forma asíncrono al navegar a la ruta correspondiente

```javascript
{
  path: 'admin',
  loadChildren: './admin/admin.module#AdminModule',
},
```

---

## Resolvers. Definición

```javascript
@Injectable({
  providedIn: 'root',
})
export class CrisisDetailResolverService implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
    let id = route.paramMap.get('id');
 
    return this.cs.getCrisis(id).pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);
        } else { // id not found
          this.router.navigate(['/crisis-center']);
          return EMPTY;
        }
      })
    );
  }
}
```

---

## Resolvers. Uso

```javascript
{
  path: ':id',
  component: CrisisDetailComponent,
  resolve: {
    crisis: CrisisDetailResolverService
  }
},

ngOnInit() {
  this.route.data
    .subscribe((data: { crisis: Crisis }) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis;
    });
}
```
