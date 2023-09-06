/* 
La idea de redux es tener un unico lugar donde se almacene el estado global de toda la app (par facilitar comprension y mantenimiento de la app) 
Este estado se almacena en un objeto llamado STORE (que es inmutable. No se lo puede cambiar directamente, para esto se utilizan los REDUCERS)
El REDUCER es una funcion que toma el estado actual y una accion como entrada y devuelve un nuevo estado
Una accion es un objeto que contiene un tipo (tipo de accion que se realiza) y un payload (datos que quiero añadir al nuevo estado)
Cuando una accion se dispara en la app, se envia al STORE. En el STORE se procesa con el REDUCER y este REDUCER devuelve un estado que se almacena en el STORE
Despues de cada actualizacion del estado, redux notifica a cada componente que esta escuchando los cambios del estado, para que puedan actulizarse con los nuevos datos
*/

import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './slices/usuarioSlice';
import usuarioEncontradoReducer from './slices/usuarioEncontradoSlice';
import cuentaReducer from './slices/cuentaSlice';

export const store = configureStore({
  //usuarioStore es simplemente un identificador que se usa en el store para acceder al estado y las acciones relacionadas con el slice usuarioSlice. usuarioReducer es el reducer que se importó y que maneja el estado y las acciones relacionadas con ese slice.
  reducer: {
    usuarioStore: usuarioReducer, //clave: valor
    usuarioEncontradoStore: usuarioEncontradoReducer,
    cuentaStore: cuentaReducer,
  },
});
