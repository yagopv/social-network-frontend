theme: Next, 8
autoscale: true
footer: @Yago Pérez Vázquez 2019
slidenumbers: true

# Lazy Loading

---

## Lazy Loading

- Técnica para importar de forma asíncrona otros módulos de la aplicación
- Permite que el tamaño del bundle sea inferior en la primera carga
- Es la forma que tiene Angular de activar Code Splitting en nuestra aplicación

---

![](https://media2.giphy.com/media/14ut8PhnIwzros/giphy.gif?cid=e1bb72ff5c6e6b72594c5a67459b354c)

---

##  Definiendo rutas

```javascript
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

## Routing module

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

## Importante !!:bulb:

- Cuando estoy haciendo lazy loading debo eliminar el import del módulo de AppModule o la carga se hará de forma normal y no funcionará correctamente
