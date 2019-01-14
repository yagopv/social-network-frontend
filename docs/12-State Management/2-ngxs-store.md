# ngxs-store

---

# Porqué ngxs?

- Es simple. ngrx/store y ngrx/effects generan demasiado boilerplate
- Puedo utilizar RxJS pero no es totalmente necesario un conocimiento profundo del framework
- Encaja perfectamente con Angular
- Mejor experiencia de usuario

---

# Instalación

```bash
$ npm install @ngxs/store @ngxs/devtools-plugin @ngxs/logger-plugin @ngxs/router-plugin --save
```
---

# Bootstrap en AppModule

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

# Diagrama de flujo

![inline](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-L9CoGJCq3UCfKJ7RCUg%2F-LVrR_Jobt3NVt61AhlH%2F-LVrRb1WdI1nngz9VmFm%2Fdiagram.png?generation=1547118480096027&alt=media)

---

# Actions

```javascript
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public login: LoginModel) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';
  constructor(public currentUser: AuthUserModel) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public errors: ErrorModel[]) {}
}
```

---

# Dispatching Actions

En un componente.

El dispatch devuelve un Observable por lo que me puedo subscribir

```javascript
constructor(private store: Store) {}
...
this.store.dispatch(new Login(form.value))
  .subscribe(() => this.form.reset());
```

---

# State

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

# Async State

```javascript
export interface AuthStateModel {
  currentUser: AuthUserModel;
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

# Select

```javascript
export class HomeComponent implements OnInit {
  @Select(PostState) posts$: Observable<PostViewModel[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }
}
```

---

# Selectors

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
