# ngrx/store

---

# Instalar schematics y dependencias

```bash
npm install @ngrx/schematics --save-dev
npm install @ngrx/{store,entity,store-devtools} --save
```

---

# Extender angular schematics 

```bash
ng config cli.defaultCollection @ngrx/schematics
```

```json

// angular.json

"schematics": {
  "@ngrx/schematics:component": {
    "styleext": "scss"
  }
}
```

---

# Configurar initial state

```bash
ng generate store State --root --module app.module.ts
```
