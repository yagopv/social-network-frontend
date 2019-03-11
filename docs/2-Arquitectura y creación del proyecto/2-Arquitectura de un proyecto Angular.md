theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Arquitectura Angular

---

## Que es Angular?

- Angular es una plataforma para la creación de aplicaciones en HTML y TypeScript.

- Angular es un ecosistema de librerias que tratan de resolver un problema complejo de una forma un tanto dogmática

![right fit](https://angular.io/generated/images/guide/architecture/overview2.png)


---

## Componentes y directivas

- Los componentes son las piezas fundamentales de nuestra aplicación encargadas de la gestión de diferentes partes de nuestra interfaz

- Un componente se encarga de controlar una vista 

- Una aplicación es en general un arbol de componentes

- Se declaran mediante el decorator @Component o @Directive

- Una directiva no es mas que un componente sin plantilla

- Tienen un ciclo de vida que nos permite realizar acciones tanto en su creación y attach al DOM, como en su actualización, destrucción y eliminación

![right fit 120%](https://angular.io/generated/images/guide/architecture/component-tree.png)

---

```javascript
@Component({...})
class MyComponent() {}

@Directive({...})
class MyDirective() {}
```

- _selector_: string que permite identificar el componente a compilar y renderizar
- _providers_: Lista de providers para la vista y sus hijos
- _viewProviders_: Lista de providers solo para la vista
- _template | templateUrl_: Plantilla inline o externa de un componente. No aplica a directivas
- _styles | styleUrls_: Lista de estilos inline o hoja de estilos externa

---

## Módulos

- Conjunto de componentes, servicios, directivas, pipes, etc. 

- Los elementos del módulo deberían constituir una unidad funcional en nuestra aplicación

- Organizar una aplicación en módulos fomenta la reusabilidad

- Existirá al menos un módulo para realizar el _bootstrap_ de la aplicación (Por convención _AppModule_)

---

```javascript
@NgModule({ declarations: ..., imports: ...,
exports: ..., providers: ..., bootstrap: ...})
class AppModule {}
```

- _declarations_: Componentes, directivas y pipes que forman parte del módulo

- _exports_: Subconjunto de declarations que se exporta para ser usados en otros módulos

- _imports_: Otros módulos utilizados en el _NgModule_ que se está declarando. Se añaden a _declarations_

- _providers_: Declaración y definición de la manera de construir providers en nuestra aplicación. Se convierten en globales y accesibles desde cualquier parte de la aplicación aunque también se pueden crear a nivel de componente

---

- _entryComponents_: Lista de componentes no referenciados en ninguna template. Normalmente creados dinámicamente

- _bootstrap_: Componente raiz de nuestra aplicación principal. Sólo el modulo principal debe declarar la propiedad _bootstrap_

---

## Templates

- Combinan HTML tradicional con una sintaxis especial que define Angular. Esta sintaxis permite enlazar los modelos de datos de nuestros componentes con las plantillas

- En las plantillas podemos usar directivas con el objetivo de realizar flujo de control, como si un lenguaje de programación se tratase (if, else, for, switch ...)

- Puedes mostrar datos de la aplicación enlazando controles en la plantilla HTML con propiedades en la clase `@Component`

![right fit 120%](https://angular.io/generated/images/guide/architecture/component-databinding.png)

---

# Data binding

Data binding es el conjunto de utilidades o técnicas que crean un mecanismo para conectar la aplicación con el HTML

- _Event binding_ permite a la aplicación responder a acciones del usuario (click, hover, mousedown ...)

- _Property binding_ permite enviar valores calculados durante la ejecución de la aplicación al HTML de las plantillas

![right fit 120%](https://angular.io/generated/images/guide/architecture/databinding.png)


---

## Services

Los _Services_ son clases que ofrecen funcionalidad y gestión del estado de la aplicación. Normalmente los usaremos con datos que no pertenecen a ninguna vista concreta sino a la aplicación en global

---

## Inyección de dependencias

- Es el mecanismo que permite inyectar servicios en los componentes

- Este mecanismo nos permite inyectar por ejemplo la misma instancia de un servicio en diferentes partes de la aplicación (Singleton)
