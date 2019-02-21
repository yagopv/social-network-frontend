theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

# NgModule

---

## Módulos en Angular

- Los módulos en Angular permiten agrupar componentes, directivas, servicios y otra serie de artefactos que constituyen una unidad funcional
- Son una forma de organizar la aplicación 
- El core de Angular esta formado por una serie de NgModules como FormsModule, HttpClientModule, o RouterModule
- No tienen nada que ver con ES6 Modules o CommonJS

---

## Sintaxis

```javascript
@NgModule({
  declarations: [
    AppComponent,
    MyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## declarations

- Lista de clases que pertenecen al módulo. Pipes, Services, Components, Directives

- Las templates de los componentes se compilan en el contexto del módulo. Necesito por tanto tener todos los artefactos disponibles o bien declarados o importados

- Las clases declaradas en declarations no se pueden declarar en otros módulos

---

## providers

- Lista de proveedores para registrar en el  injector del NgModule y que nos permitirán su uso a través del mecanismo de DI. Si es el módulo encargado del bootstrap entonces es el rrot injector

- Los servicios pasan a estar disponibles para cada componente, directiva, pipe o service hijo del injector

---

## imports

- Otros módulos que voy a usar en el que estoy definiendo
- Los módulos importados es como si sus exports se hubiesen declarado en el NgModule que los importa y por tanto todos sus artefactos pasan a estar disponibles

---

## exports

- Lista de declarations que quiero exportar para su uso por otros módulos mediante import
- Es el API pública del NgModule. 
- declarations son privadas y exports públicas
- Los módulos importandos se pueden a su vez exportar

---

## bootstrap

- Lista de componentes raiz para arrancar la aplicación

- Normalmente sólo es uno => Root component

---

## entryComponents

- Lista de componentes que se pueden cargar de forma dinámica en la aplicación. No están definidos en ninguan plantilla

- El componente encargado de hacer el bootstrap y los componentes cargados por el router se añaden de forma automática a los entryComponents

- Otros componentes que se pretendan cargar de forma dinámica se tienen que añadir

---

## NgModules comunes

| NgModule | Import | Uso |
| --- | --- | --- |
| BrowserModule | @angular/platform-browser | Para usar la aplicación en un Browser |
| CommonModule | @angular/common | Importa ciertas directivas como NgIf o NgFor |
| FormsModule | @angular/forms | Template-driven forms |
| ReactiveFormsModule | @angular/forms | Reactive Forms |
| RouterModule | @angular/router | Cuando quiero usar el router|
| HttpClientModule | @angular/common/http | Para comunicarme con un servidor |

---

## NgModules comunes

- BrowserModule importa y exporta CommonModule

- Por tanto, se debe usar BrowserModule en AppModule y CommonModule en el resto de módulos funcionales

---

## Feature Modules

- Agrupaciones funcionales para una aplicación Angular

- No tienen nada de especial, simplemente se usan a nivel organizativo

- Normalmente tendremos un módulo raiz y varios funcionales

- El módulo raiz importara los módulos funcionales para formar una aplicación
