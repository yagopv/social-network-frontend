theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

# Creación de un proyecto

```bash
npm install -g @angular/cli

ng new social-network --prefix=sn --style=scss
cd social-network
ng serve
```

---

## Estructura de directorios generada

https://angular.io/guide/file-structure

---

## Explorar la configuración en _angular.json_

https://angular.io/guide/workspace-config

---

## Explorar package.json

https://angular.io/guide/npm-packages

---

## Browser support y polyfills

https://angular.io/guide/browser-support

---

## Configuración Typescript

https://angular.io/guide/typescript-configuration

---

## Dependencias y librerias en nuestro package.json

https://angular.io/guide/npm-packages

---

## Configuración de Typescript

https://angular.io/guide/typescript-configuration

---

### Añadir scripts y hojas de estilos de forma global

```javascript
// Instalar simple-reset-css
npm install simple-reset-css --save

// Añadir la hoja de estilos en `angular.json` en arquitect/build/styles y configurar stylePreprocessorOptions scss
...
"styles": [
  "src/scss/styles.scss",
  "./node_modules/simple-css-reset/reset.css"
],
"stylePreprocessorOptions": {
  "includePaths": ["src/scss"]
}
...
```

