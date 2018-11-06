# Dando estilos a nuestros componentes

- Las aplicaciones Angular pueden reciben estilos usando CSS. También podremos utilizar precompiladores como SASS de forma sencilla
- Los estilos se aplican de forma modular, es decir, el scope es el componente y las clases y estilos definidos no afectan al resto de la aplicación. Asimismo los estilos definidos en otros componentes tampoco afectarán al que estemos implementando

---

# Selectores especiales

**:host**

El pseudoselector *:host* permite hacer referencia y dar estilos al elemento que se encarga de definir el componente para su renderizado. El elemento definido en la propiedad *selector*

```html
:host {
  display: block;
  border: 1px solid black;
}

:host(.active) {
  border-width: 3px;
}
```

---



# Selectores especiales

**:host-context**

Permite hacer algo que con CSS estándar no podemos. Seleccionar un elemento padre.

```html
:host-context(.theme-light) h2 {
  background-color: #eef;
}
```

---

# Carga de estilos en un componente

- A través de *styles* o *styleUrls*
- Inline en la *template* del componente
- CSS imports

---

# Propiedad *styles*

```javascript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {
/* . . . */
}
```

---

#Propiedad *styleUrls*

```javascript
@Component({
  selector: 'app-root',
  template: `
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styleUrls: ['./hero-app.component.css']
})
export class HeroAppComponent {
/* . . . */
}
```

---

# Inline en la *template*

```javascript
@Component({
  selector: 'app-hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <link rel="stylesheet" href="../assets/hero-team.component.css">
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
  `
})
```

---

# CSS *@imports*

```javascript
@import './hero-details-box.css';
```

---

# Definiendo el tipo de modularidad - *viewEncapsulation*

- *ShadowDom* - Implementación nativa de ShadowDom. Soporte limitado
- *Native* - Implmentación nativa también pero de un estándar anterior
- Emulated - Por defecto. Simula *ShadowDom* y por tanto soporta todos los navegadores
- None - Los estilos se aplicacarán de forma global

---

# CSS generado

```html
<hero-details _nghost-pmm-5>
  <h2 _ngcontent-pmm-5>Mister Fantastic</h2>
  <hero-team _ngcontent-pmm-5 _nghost-pmm-6>
    <h3 _ngcontent-pmm-6>Team</h3>
  </hero-team>
</hero-detail>
```

