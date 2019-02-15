theme: Next, 8
autoscale: true
build-lists: true
footer: @Yago Pérez Vázquez 2019

# Lazy Loading

- Técnica para importar de forma asíncrona otros módulos de la aplicación

- Permite que el tamaño del bundle sea inferior en la primera carga

---

#Ejemplo

```json
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule'
  },
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
```

---

```javascript
const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
```

---

# Recordar!!

- Cuando estoy haciendo lazy loading debo eliminar el import del módulo de AppModule o la carga se hará de forma normal
