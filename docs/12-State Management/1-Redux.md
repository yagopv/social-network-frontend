theme: Next, 8
autoscale: true
build-lists: true
slidenumbers: true

# Redux

---

![fit 150%](https://cdn-images-1.medium.com/max/1600/0*cntBtPADjE2ykLSP.png)

---

## Store

- Un Store es el contenedor del estado de nuestra aplicación

- Sólo se puede modificar mediante dispatch de acciones

---
## State

- El State es el estado actual de los datos de nuestra aplicación en un momento del tiempo

---

## Actions

- Contienen información acerca de las modificaciones que queremos realizar en un Store

- Objetos formados por dos propiedades (... o no 😊)

```json
{
  type: ACTION_TYPE,
  payload: {}
}
```

---

## Action creators

- Funciones que se encargan de crear un Action

```javascript
function GetPost(postId) {
  return {
    type: GET_POSTS,
    postId
  }
}
```

---

## Reducers

- Funciones puras que reciben el estado actual de la aplicación más un Action para devolver un nuevo estado

- El nuevo estado ha de ser **IMMUTABLE**

---

## Reducers

```javascript
function myReducer(state, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        loading: true
      }
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.posts
      });
    case GET_POSTS_ERROR:
      return {
        loading: false
      }
    default:
      return state
  } 
}
```

---

## Selectors

- Un Selector es un función de utilidad que nos permite seleccionar fragmentos del estado de nuestra aplicación

- Lo usaremos con nuestras vistas

- Proporcionan memoizing => Mismos parámetros misma salida sin ejecución

---

## Selectors

```javascript
export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
)
```
