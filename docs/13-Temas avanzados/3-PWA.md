theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Progressive Web Apps

---

# Service Workers

---

## Service Workers

- Scripts que se ejecutan en el navegador y se encargan del cacheo de los recursos de la aplicación
- Funcionan como un proxy de red interceptando todas las peticiones HTTP y seleccionando el modo de responder a las mismas
- Podemos cachear peticiones de red o recursos como scripts, imágenes o la página de inicio (index.html)
- Los service workers se mantienen incluso después del cerrado de la pestaña o del navegador

---

## Service Workers en Angular

```bash
ng add @angular/pwa
```

---

## Service Workers en Angular

- Añade el paquete @angular/service-worker
- Habilita en el CLI en soporte para Service Workers
- Registra el Service Worker en el AppModule
- Modifica index.html
- Incluye link a manifest.json
- Añade meta tags
- Instala iconos
- Crea el fichero de configuración del service worker,  ngsw-config.json que se encarga de especificar el comportamiento del mismo

--

## Probando el service worker generado

```bash
npm i http-server -g
http-server -p 8080 -c-1 dist/<project-name>
```
