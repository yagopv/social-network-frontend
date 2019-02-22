theme: Next, 8
autoscale: true
build-lists: true

# ngxs-store

---

## Porqué ngxs?

- Es simple. ngrx/store y ngrx/effects generan demasiado boilerplate
- Puedo utilizar RxJS pero no es totalmente necesario un conocimiento profundo del framework
- Encaja perfectamente con Angular
- Mejor experiencia de usuario

---

## Instalación

```bash
$ npm install 
	@ngxs/store
    @ngxs/devtools-plugin
    @ngxs/logger-plugin
    @ngxs/router-plugin --save
```
---

## Bootstrap en AppModule

```javascript
@NgModule({
  ...
  imports: [
    ...
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false }),
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    ...
  ]
  ...
})
export class AppModule {}
```

---

## Bootstrap en feature modules

```javascript
NgxsModule.forFeature([PostState])
```



---

## Como funciona ngxs/store

[Diagrama de flujo ngxs](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-L9CoGJCq3UCfKJ7RCUg%2F-LVrR_Jobt3NVt61AhlH%2F-LVrRb1WdI1nngz9VmFm%2Fdiagram.png?generation=1547118480096027&alt=media)

---

## Actions

```javascript
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public loginRequest: LoginRequestModel) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public loginResponse: LoginResponseModel) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public errors: ErrorModel[]) {}
}
```

---

## Dispatching Actions

El dispatch devuelve un Observable por lo que me puedo subscribir

```javascript
constructor(private store: Store) {}
...
this.store.dispatch(new Login(form.value))
  .subscribe(() => this.form.reset());
```

---

## State

```javascript
@State<ErrorModel[]>({
  name: 'errors',
  defaults: []
})
export class ErrorState {
  constructor() {}

  @Action(SetErrors)
  setErrors({ setState }: StateContext<ErrorModel[]>, { errors }: SetErrors) {
    setState(errors);
  }

  @Action(ResetErrors)
  resetErrors({ setState }: StateContext<ErrorModel[]>) {
    setState([]);
  }
}
```

---

## Async State

```javascript
export interface AuthStateModel {
  refreshToken: string;
  accessToken: string;
  uuid: string;
  email: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    currentUser: null
  }
})
export class AuthState {
  constructor(private store: Store, private authService: AuthService) {}

  // ngxs will subscribe to the post observable for you if you return it from the action
  @Action(Login)
  login({ dispatch }: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.login).pipe(
      tap(data => dispatch(new LoginSuccess(data))),
      catchError(error => dispatch(new LoginFailed(error.error)))
    );
  }
}
```

---

## Select

```javascript
export class HomeComponent implements OnInit {
  @Select(PostState) posts$: Observable<PostViewModel[]>;
  @Select(state => state.posts) otherWayToGetPosts$: Observable<PostViewModel[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }
}
```

---

## Memoized Selectors

- El termino memoizing indica un tipo de función cachea y devuelve el mismo valor siempre que los parámetros de entrada no se modifiquen. Es un concepto ampliamente utilizado con las librerías de State Management

- ngxs nos proporciona un decorator @Selector para realizar memoizing de partes de nuestro estado

---
## Selectors

```javascript
export class PostState {

  @Selector() 
  static postFromPaul(state: PostViewModel[]) {
    return state.filter(p => p.name === 'Paul');
  }
}

...

@Select(PostState.postFromPaul) posts$: Observable<PostViewModel[]>;
```

---

## Dynamic Selectors

```javascript
@State<PostViewModel[]>({
  name: 'posts',
  defaults: []
})
export class PostState {
  static postByType(type: string) {
    return createSelector([PostState], (state: PostViewModel[]) => {
      return state.filter(p => p.type(type) > -1);                  
    });
  }
}

...

@Select(PostState.postByType('images')) postsByType$: Observable<PostViewModel[]>;  
```

---

## Seleccionando de múltiples estados

```javascript
@State<PostViewModel[]>({ ... })
export class PostState {
  @Selector([AuthState])
  static postsFromCurrentUser(state: PostViewModel[], authState: Auth) {
    return state.filter(p => p.user.id === authState.currentUser.id);
  }
}
```

