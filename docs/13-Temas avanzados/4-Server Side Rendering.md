theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

# Server Side Rendering (SSR)

---

## Esquema de navegación clásico

- Se solicita una página al servidor y este envía una versión estática que el navegador interpreta y renderiza
- Cuando navego a otra página pulsando un link se solicita de nuevo al servidor y se produce el mismo proceso - SEO Friendly
- La página se renderiza de forma completa con los datos incluidos
- Expericencia del usuario más pobre

## Single Page Application

- Se pide la página de inicio y se produce la descarga de toda la aplicación en el bundle inicial
- La navegación ocurre del lado cliente a través de una serie de técnicas JS
- No SEO Friendly
- La página se renderiza y se comienza la descarga de datos. Vemos un renderizado progresivo y uso de loaders hasta que las peticiones de red finalizan
- Experiencia de usuario más rica
- Mejor rendimiento en dispositivos móviles (menos recursos)
- Mostrar la primera página de forma rápida (53% de las visitas a páginas en dispositivos móbiles se abandonan)

---

![](https://media.giphy.com/media/y3QOvy7xxMwKI/giphy.gif)

## ... Y si combinamos ambas?

---

## Aplicaciones isomórficas

---

![](https://media.giphy.com/media/y3QOvy7xxMwKI/giphy.gif)

---

## Aplicaciones isomórficas

- El renderizado inicial se produce del lado del servidor
- De forma dinámica se generan las páginas en un servidor node en respuesta a peticiones del cliente
- A partir de ahí el lado cliente toma el control y el resto de la aplicación se comporta como SPA

---

## SSR en Angular

- Dynamic SSR => Se comporta como indicamos anteriormente. Problema => SSR en el servidor es muy muy costoso
- Static Pre-rendering => Se hace un prerenderizado inicial de una serie de tutas en archivos estáticos que son los que se envían al cliente

---

## Cuando usar Static Prerendering 

- La aplicación en estática (home.html, about.html, ...)
- Las rutas dinámicas pueden apuntarse a la versión dinámica que se comporta como una SPA
- La aplicación no se actualiza con frecuencia ya que hay que generar las rutas estáticas de nuevo

---

## Cuando usar Dynamic SSR

- La aplicación es totalmente dinámica
- Listas de productos que se generan de forma dinámica
- La estructura de la aplicación se basa en JSON o en contenido generado a través de un CMS

---

## Cómo?

- Instalar dependencias
- Preparar la aplicación modificando la configuración y el código
- Añadir build target usando el schematic de Angular CLI @nguniversal/express-engine
- Crear un servidor para SST
- Empaquetar y ejecutar la aplicación en el servidor
- [Go!!](https://angular.io/guide/universal#preparing-for-server-side-rendering)

---

![](https://media.giphy.com/media/l44Q5OXJ6qaNr838Q/giphy.gif)

---

## No!!

```bash
ng add @nguniversal/express-engine --clientProject social-network
```

---

## Y añade esto

Para que funcione lazy loading

```javascript
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule, // Add this !!
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```
