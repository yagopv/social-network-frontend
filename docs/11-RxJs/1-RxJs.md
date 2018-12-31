theme: Next, 8
autoscale: true

# Observables

---

# Que es un Observable

- Un Observable proporciona soporte para el paso de mensajes entre publicadores y subscriptores

- Son declarativos, no se ejecutan hasta que consumidor se subscribe. El consumidor recibe notificaciones hasta que  la función se completa o se da de baja

---

# Declaración de un Observable

```javascript
const observable = Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});
```

---

# Subscripción a un Observable

Un Observable  empieza a enviar valores sólo cuando se subscriben al mismo

```javascript
const unsubscribe = observable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});

...

unsubscribe();

```


---

# Multicasting

Un Observable emite los mismos valores de forma indenpendiente a cada subscriptor

Multicast es una técnica por la que los valores emitidos serån compartidos por ambos subscriptores y si el momento de la subscripción es diferente en el tiempo entonces los valores ya teransmitidos no se transmitirán de nuevo

---

# Gestión de errores

Se ha de hacer a través del método error del observer ya que try/catch no lo hace de forma efectiva debido a la naturaleza asíncrona del observable

```javascript
myObservable.subscribe({
  next(num) { console.log('Next num: ' + num)},
  error(err) { console.log('Received an errror: ' + err)}
});
```

---

# RxJs

---

# Operadores

[RxJs](https://rxjs-dev.firebaseapp.com/) nos ofrece una colección extensa de operadores y métodos de creación de Observables

- Creation:	from, fromPromise,fromEvent, of
- Combinación:	combineLatest, concat, merge, startWith , withLatestFrom, zip
- Filtrado:	debounceTime, distinctUntilChanged, filter, take, takeUntil
- Transformación	bufferTime, concatMap, map, mergeMap, scan, switchMap
- Utilidad:	tap
- Multicasting:	share

---

# Observables en Angular

---

