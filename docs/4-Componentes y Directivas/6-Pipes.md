theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Pipes

---

## Qué son?

- Una Pipe es simplemente una función que recibe datos como input y a través de una transformación produce una salida
- En Angular tenemos una serie de Pipes disponibles a través del framework pero también podemos crearlas nosotros

---

## Angular Pipes

- `DatePipe`
- `UpperCasePipe`
- `LowerCasePipe`
- `CurrencyPipe`
- `PercentPipe`
- `JsonPipe`
- `AsyncPipe`

---

## Parámetros

Un Pipe puede recibir cualquier número de parámetros opcionales

```html
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>
```

El parámetro puede ser cualquier expresión válida de las que usamos en nuestras templates

```html
template: `
  <p>The hero's birthday is {{ birthday | date:format }}</p>
  <button (click)="toggleFormat()">Toggle Format</button>
`
```

---

## Encadenando Pipes

Podemos encadenar Pipes. El valor de salida de cada una será el de entrada de la siguiente

```javascript
{{  birthday | date:'fullDate' | uppercase}}
```

---

## Creación de Pipes

```javascript
@Pipe({name: 'exponentialStrength'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}
```

---

## A tener en cuenta

- Puedes usar las Pipes creadas de la misma forma que usarías una propia del framework
- Las Pipes creadas se deben declarar en el módulo al que pertenezcan en el array de la propiedad *declarations*

---

## Pure vs Impure

El mecanismo de detección de cambios en las Pipes es un tanto especial

- **Pure**: Sólo se actualiza la vista si se actualizan los valores de una primitiva o se modifica la referencia a un objeto
- **Impure**: Se actualiza con más frecuencia cada vez que se lanza un ciclo de detección en el framework, es decir, después de una pulsación de una tecla, movimiento del ratón, evento asíncrono, timeouts

---

## Impure 

```javascript
@Pipe({
  name: 'flyingHeroesImpure',
  pure: false
})
export class FlyingHeroesImpurePipe extends FlyingHeroesPipe {}
```

---

## Pure (Por defecto)

```javascript
@Pipe({ name: 'flyingHeroes' })
export class FlyingHeroesPipe implements PipeTransform {
  transform(allHeroes: Flyer[]) {
    return allHeroes.filter(hero => hero.canFly);
  }
}
```

Las función transform de las Pipes puras ha de ser también pura, es decir, debe retornar un nuevo valor o referencia

---

## AsyncPipe

- Es una Pipe importante dentro del framework. Se trata de una Pipe que es capaz de mantener su propio estado

- Permite suscribirnos a Promises o Observables y cada vez que se produce una actualización en los mismos se reflejará en la vista


