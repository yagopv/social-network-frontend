theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# TypeScript

---

## TypeScript

- TypeScript es un superset de Javascript (ES5 y ES6), por tanto podemos utilizar practicamente todas las posibilidades que nos brinden las nuevas versiones de Javascript y el compilador de Typescript se encargará de convertirlos ficheros al formato que hayamos configurado y que los navegadores actuales comprendan

- Continuamente se actualiza con nuevas funcionalidades que provienen del estándar

- La caracteristica principal que añade TypeScript es la del tipado de datos

- Otras funcionalidades que aporta son los _Decorators_, ampliamente utilizados en Angular

---

![](https://media.giphy.com/media/xUOwGdD7RGT4CTnUaY/giphy.gif)

---

## Sintaxis general

```javascript
let variable: type;

// Realmente aqui no es necesario el tipo ya que lo infiere
const counter: number = 0; 

const name: string = 'Yago';

const post: Post = new Post();

```

---

## Generics

```javascript
// TypeScript soporta lo que en muchos lenguajes se denomina _Generics_ 

const posts: Array<Post> = [new Post()];

// Ahora el array sólo puede contener Post. En caso contrario el compilador nos lo indicaría con un error
```

---

## Generics

```javascript
// Sin generics => Ligado a number
function identity(arg: number): number {
    return arg;
}
```

```javascript
// Puedo usar any
function identity(arg: any): any {
    return arg;
}
```

---

## Generics

```javascript
// Pero mejor un generic
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let output = identity("myString"); // Inference

```

---

## any

```javascript
// any representa cualquier valor

let changing: any = 2;

changing = true; // sin problema
```

---

## Union types

```javascript
// Nos permite usar varios tipos

let changing: number | boolean = 2;

changing = true; // sin problema
```

---

## Enums

```javascript
enum PostStatus {published, draft, deleted}

const post = new Post(); 

post.status = PostStatus.draft;
```

---

## Return types

```javascript
// Podemos especificar el tipo de retorno de una función
function getPosts(): Post[] { }
```

```javascript
// Si la función no devuelve nada puedo usar `void`
function log(): void { }
```

---

## Interfaces

```javascript
// Javascript es dinámico y es una de sus grandes cualidades
function addPointsToScore(player, points) { 
  player.score += points;
}

// Esta función se puede aplicar a cualquier objeto con una propiedad `score`. Cómo lo traduzco a TypeScript
```

```javascript
function addPointsToScore(player: { score: number; }, points: number): void { 
  player.score += points;
}

// Fuerza el parámetro a ser score y el compilador lo detectará
```

---

## Interfaces

```javascript
interface HasScore { 
  score: number;
}
function addPointsToScore(player: HasScore, points: number): void {
  player.score += points;
}
```

---

## Interfaces

```javascript
// Puedo definir funciones en la interfaz
interface Runner { 
  id: number;
  run(meters: number): void;
}

function startRunning(runner: Runner): void {
  runner.run(20);
}
```

---

## Parámetros opcionales

```javascript
// En Javascript si un parámetro no existe se convertirá en undefined al invocar a la función
// Si la función esta tipada entonces el compilador nos avisará del error, pero, que pasa si realmente el parámetro es opcional
// Para estos casos tengo el operador '?'
function addPointsToScore(player: HasScore, points?: number): void { 
  points = points || 0;
  player.score += points;
}
```

---

## Classes. Implementación de interfaces

```javascript
// Puedo usar clases ES6. Las clases pueden implementar interfaces como en otros lenguajes de programación

interface CanRun { 
  run(meters: number): void;
}
interface CanEat { 
  eat(): void;
}
class HungryRunner implements CanRun, CanEat { 
  run(meters) { }
  eat() { } 
}
```

---

## Classes. Class properties

```javascript
// Puedo utilizar propiedades de clase. Esto no es una característica de ES6 y sólo lo puedo hacer a tavés de Typescript
class Post { 
  maxLines = 25;

  renderLine(numberOfLine: number) {
    if (numberOfLine < this.maxLines) {
      ...
    }
  }
}
```

---

## private y public shorcut

```javascript
// En typescript
class Post {
  constructor(public id: number, private content: string) { }
}

// equivale a 
class Post {
  public id: number;
  private content: string;

  constructor(id: number, content: string) { 
    this.id = id;
    this.content = content;
  }
}
```

---
## Decorators

- Posiblemente parte del estándar en el futuro
- Ampliamente utilizados por Angular
- Es una forma de añadir metadatos a un target como podría ser un método, una clase ...

---

## Decorators

```javascript
class PostService {
  @Log()
  getPosts() { }

  @Log()
  getPost(id: number) { }
}

const Log = function () {
  return (target: any, name: string, descriptor: any) => {
    logger.log(`call to ${name}`);
    return descriptor; 
  };
};

```

---

## Decorators

- _target_: El método objetivo de nuestro decorator
- _name_: El nombre del método objetivo
- _descriptor_: El descriptor del método objetivo  (es enumerable, writable, ... ?)

---

## Decorators

```javascript
postService.getPosts();
// logs: call to getPosts
postService.getPost(1); 
// logs: call to getPost
```

---

## Decorators

[Explorando los diferentes decorators en Angular](https://netbasal.com/exploring-the-various-decorators-in-angular-b208875b207c)
[Creación de decorators](https://toddmotto.com/angular-decorators)

---

## Instalando types

Por ejemplo para usar Typescript con angular 1.x

```bash
npm install --save-dev @types/angular
```

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

Al instalar un tipo el compilador lo detectará automáticamente si está en `node_modules`






