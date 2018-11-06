# Que es Angular?

Angular es una plataforma para la creación de aplicaciones en HTML y TypeScript.

Angular esta escrito en Typescript y constituye un ecosistema formado por un gran numero de librerias que tratan de resolver un problema complejo de forma dogmática

---

![fit](https://angular.io/generated/images/guide/architecture/overview2.png)

---

# Componentes y directivas

Los componentes son piezas de nuestra aplicación encargadas de la gestión de partes de nuestra interfaz.

Lo componentes tienen un ciclo de vida

Los componentes se declaran mediante el decorator `@Component`

---

![fit](https://angular.io/generated/images/guide/architecture/component-tree.png)

---

```javascript
@Component({...})
class MyComponent() {}

@Directive({...})
class MyDirective() {}
```

- _moduleId_: Cuando indicamos un id templateUrl y styleUrl se resuelven de forma relativa al componente

- _providers_: Lista de providers para la vista y su posible contenido proyectado

- _viewProviders_: Lista de proveedores solo para la vista (Útil en libs)

- _template | templateUrl_: Plantilla inline o externa de un componente

- _styles | styleUrls_: Lista de estilos inline o hoja de estilos externa

---

# Modulos

Un módulo en Angular es un conjunto de componentes, servicios, directivas, etc. Los elementos del conjunto se supone que constituyen una caracteristica funcional de nuestra aplicación.

Organizar una aplicación en módulos fomenta la reusabilidad.

Crearemos al menos un módulo para realizar el bootstrap de la aplicación (Por convención AppModule)

---

```javascript
@NgModule({ declarations: ..., imports: ...,
exports: ..., providers: ..., bootstrap: ...})
class MyModule {}
```

- _declarations_: Componentes, directivas y pipes del NgModule.

- _exports_: Subconjunto de declarations que serán usables desde otros módulos

- _imports_: Otros Módulos utilizados en este NgModule.

- _providers_: Métodos de creación de servicios que este NgModule contribuye al conjunto de servicios de la aplicación. Se convierten en globales y accesibles desde cualquier parte de la aplicación (También se pueden crear a nivel de componente)

---

- _entryComponents_: Lista de componentes no referenciados en ninguna template. Normalmente creados dinámicamente

- _bootstrap_: Vista principal de la aplicación. Root component. Sólo el modulo principal debe declarar la propiedad bootstrap

---

# Templates

Las templates en Angular combinan HTML con código Angular. En las plantillas podemos usar directivas para proporcionar flujo de control.

Puedes mostrar datos de la aplicación enlazando controles en la plantilla HTML con propiedades en la clase `@Component`

---

# Data binding

`autobinding: true`

Data binding es el conjunto de utilidades o técnicas para conectar la aplicación con el HTML

- _Event binding_ permite a la aplicación responder a acciones del usuario

- _Property binding_ permite interpolar valores calculados durante la ejecución de la aplicación en el HTML de las plantillas

---

# Services

Los Services son clases que ofrecen funcionalidad y gestión de estada de la aplicación. Normalmente los usaremos con datos que no pertenecen a ninguna vista concreta sino a la aplicación

---

# Inyección de dependencias

Es el mecanismo que permite inyectar servicios como dependencias en los componentes
