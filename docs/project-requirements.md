theme: Next, 8
autoscale: true
build-lists: true

# Angular Frontend

---

## Requisitos del proyecto

- La aplicación a desarrollar tiene que ser una Single Page Application (SPA)
  - Deben incluirse varias rutas (Por lo menos 3)
  - Cada ruta debe configurarse en un NgModule diferente
  - El uso de Lazy Loading es un bonus pero no obligatorio

- La aplicación debe constar de varios NgModule, normalmente uno por ruta además del módulo principal. Puede haber módulos que no se correspondan con ninguna ruta en concreto como por ejemplo módulos de autenticación o con artefactos compartidos (SharedModule)

- Deberiamos diferenciar componentes de acceso a datos y lógica de negocio de componentes presentacionales (Smart vs Dumb components)

- La aplicación debería incluir al menos un formulario (Reactive o Template-driven)
  - Debemos gestionar la validación de los formularios
  - Incluir validaciones personalizadas es un bonus pero no obligatorio

- La aplicación debe comunicarse con una API REST y definir los servicios de acceso al mismo de forma clara y ordenada

- Utilizar un patrón de State Management es un bonus aunque no es obligatorio

- Incluir una capa de autenticación en la aplicación (Login, Registro) es un bonus aunque no es obligatorio


