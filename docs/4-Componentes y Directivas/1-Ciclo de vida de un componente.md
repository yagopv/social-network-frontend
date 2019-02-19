theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

## Ciclo de vida de un componente

Los componentes y directivas en Angular tienen un ciclo de vida en el cual se crean, se modifican, se destruyen. A través de una serie de métodos podremos engancharnos en dichos momentos para realizar las acciones que necesitemos

```javascript
export class MyComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
```
---

## Métodos del ciclo de vida

- _ngOnChanges()_ Se llama cada vez que las propiedades de entrada del componente (_@Input_) se modifican. Se llama antes de _ngOnInit()_.

  Las variables de entrada deben modificar su referencia, es decir, si modifico propiedades de un objeto no se considera la variable como modificada.

- _ngOnInit()_ Se llama sólo una vez después del primer _ngOnChanges()_ una vez que el componente establece por primera vez sus propiedades de entrada y se ha inicializado.

  Deberia utilizarse para inicializaciones complejas o para realizar un primer setup del componente. Debe evitarse este tipo de complejidad en el constructor del componente ya que estamos ralentizando la instanciación innecesariamente. Las llamadas HTTP deberían ir en este método

---

- _ngDoCheck()_ Se lanza después de _ngOnChanges()_ y _ngOninit()_. Se llama cada vez que se actualiza alguna parte de la aplicación. Se llama con mucha frecuencia. ⚠️ **DEBE UTILIZARSE CON PRECAUCIÓN!!** 

- _ngAfterContentInit()_ Se ejecuta una vez que Angular proyecta contenido en la vista del componente. Se llama sólo una vez después de _ngDoCheck()_

- _ngAfterContentChecked()_ Se ejecuta cada vez que el contenido del componente ha sido verificado por el mecanismo de detección de cambios de Angular, se llama después del método _ngAfterContentInit()_ y en cada invocación a _ngDoCheck()_. ⚠️ **DEBE UTILIZARSE CON PRECAUCIÓN!!** 

- _ngAfterViewInit()_ Se ejecuta una vez que la plantilla se ha instanciado e inicializado por completo. Se invoca después de _ngAfterContentChecked()_. Sólo aplica a componentes y no a directivas (no tienen vista). Se ejecuta sólo una vez. Es un buen sitio para inicializaciones que dependan de la vista (P.Ej un plugin sobre un elemento DOM)

---

- _ngAfterViewChecked()_ Se ejecuta despues de _ngAfterViewInit()_ y cada vez que el componente verifique cambios (Incluso de otros componentes de los que es padre) ⚠️ **DEBE UTILIZARSE CON PRECAUCIÓN!!** 

- _ngOnDestroy()_ Se ejecuta cada vez que Angular destruye el componente. Útil para darse de baja de observables, eventos, liberar recursos, etc.

---

## Demo

[https://stackblitz.com/angular/roqnqkkpdrl?file=src%2Fapp%2Fspy.component.ts](https://stackblitz.com/angular/roqnqkkpdrl?file=src%2Fapp%2Fspy.component.ts)    

