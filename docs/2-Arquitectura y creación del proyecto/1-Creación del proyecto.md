theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Creación de un proyecto

```bash
npm install -g @angular/cli

ng new social-network --prefix=sn --style=scss
cd social-network
ng serve
```

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

---

## El proyecto Angular

|Tema|Docs|
|---|---|
|**Estructura de directorios**|https://angular.io/guide/file-structure|
|**Configuración workspace**|https://angular.io/guide/workspace-config|
|**Configuración npm**|https://angular.io/guide/npm-packages|
|**Soporte navegadores**|https://angular.io/guide/browser-support|
|**Configuración Typescript**|https://angular.io/guide/typescript-configuration|



