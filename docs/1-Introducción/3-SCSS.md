theme: Next, 8
autoscale: true

# SCSS

---

# SCSS

- Es un precompilador de CSS
- Nos da una serie de beneficios sobre escribir solamente CSS como el nesting o el uso de variables y mixins
- Parsea el fichero .scss y lo convierte a .css

---

# Variables

SCSS

```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

---

# Variables

CSS

```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

---

# Nesting

SCSS

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

---

# Nesting

CSS

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

---

# Partials

SCSS

```scss
// _reset.scss

html,
body,
ul,
ol {
  margin:  0;
  padding: 0;
}
```

---

# Partials

CSS

```css
// base.scss

@import 'reset';

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

---

# Mixins

```scss
@mixin transform($property) {
  transform: $property;
}

.box { @include transform(rotate(30deg)); }
```

---

# Mixins

```css
.box {
  -webkit-transform: rotate(30deg); // Angular ❤️
  -ms-transform: rotate(30deg); // Angular ❤️
  transform: rotate(30deg);
}
```
