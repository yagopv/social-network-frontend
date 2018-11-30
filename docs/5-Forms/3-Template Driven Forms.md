theme: Next, 8
autoscale: true

# Template-driven Forms

---

# Qué son?

- El flujo del formulario y control de errores lo controlamos directamente en la plantilla mediante el uso de directivas, data-binding y variables
- Menos flexibles y desde luego no muy reusables pero rápidos y fáciles de usar

---

#Paso 1. Registrar el módulo

```javascript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    FormsModule
  ],
})
export class AppModule { }
```

------

