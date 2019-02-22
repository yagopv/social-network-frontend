theme: Next, 8
autoscale: true
build-lists: true

# HttpClient

---

## HttpClient

- Navegadores => XMLHttpRequest y fetch
- HttpClient es una implementación de Angular para la comunicación con APIs

---

## Configuración

```javascript
@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

---

## Uso

Normalmente en servicios (mejor práctica) en lugar de directamente en componentes

```javascript
@Injectable()
export class MyService {
  constructor(private http: HttpClient) { }
}
```
---

## Métodos ofrecidos

- get
- post
- put
- delete
- patch
- head
- jsonp

---

## Uso de HttpClient

Se devuelve un observable que por tanto puedo transformar mediante operadores (o incluso convertir a Promise conm toPromise())

```javascript
http.get(`${baseUrl}/api/races`)
    .subscribe((response: Array<RaceModel>) => {
      console.log(response);
});

```

---

## Leyendo la respuesta

Por defecto se lee el body. 

A veces podemos necesitar leer cabeceras o cualquier otra cosa en la respuesta

[.code-highlight: all]

[.code-highlight: 5]

```javascript
uploadAvatar(image: File) {
  const formData = new FormData();
  formData.append('avatar', image);
  return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
      observe: 'response'
  });
}
```


---

## Añadiendo Headers

```javascript
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

this.http.post<Config>(this.configUrl, config, httpOptions)
  .pipe(
    catchError(this.handleError)
  );

```
---

## Parámetros en la URL

```javascript
search(text: string) {
  return this.http.get<Profile[]>(
      `${environment.apiBaseUrl}/user/search`, {
    params: { q: text }
  });
}
```

---

## Gestión de errores

catchError se encarga de capturar el error y no provoca el final en la ejecución del Observable

```javascript
getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      catchError(this.handleError)
    );
}
```

También podría utilizar la función de error del Observer pasado a la subscripción pero catchError es mejor práctica

---

## Type-checking de las respuestas

El siguiente código provoca un error en el compilador de TypeScript

```javascript
.subscribe((data: Config) => this.config = {
    configUrl: data.configUrl,  // data.configUrl typescript error
    textfile:  data.textfile
});
```

Pero si tipamos la respuesta mediante generics

```javascript
getConfig() {
  return this.http.get<Config>(this.configUrl);
}
```

Ahora ya no tendriamos dicho error por lo que es la convención

---

## Interceptors

```javascript
@Injectable()
export class MyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, 
            next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
```

---

## Interceptors

- intercept transforma una request en un Observable 
- next permite llamar al siguiente interceptor en la cadena de interceptors

---

## Interceptors

```javascript
{ provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
```

multi indica a Angular que este token es una array de valores, es decir, puedo proporcionar múltiples interceptors en diferentes puntos y Angular lo convertirá en un Array
