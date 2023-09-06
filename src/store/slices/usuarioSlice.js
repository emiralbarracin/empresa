//un slice es una porcion del estado de la app
import { createSlice } from '@reduxjs/toolkit'; //createSlice es una funcion para crear un slice (los slices permiten actualizar los estados)

const initialState = {
  nombre: null,
  correo: null,
  nombreUsuario: null,
  contrasenaUsuario: null,
  nombreEmpresa: null,
  idEmpresa: null,
}

export const usuarioSlice = createSlice({ //creacion de un slice (el objeto usuarioSlice se crea a partir de la funcion createSlice)
  name: 'usuario', //nombre del slice
  initialState, //objeto con los estados iniciales de este slice

  reducers: { //en la propiedad reducers se crean las funciones para actualizar el estado (y redux toolkit automaticamente va a crear acciones que se pueden despachar desde los componentes de la app)
    agregarUsuario: (state, action) => { //esta funcion recibe el estado y la accion (que incluye ademas el payload, o sea los datos), y los datos iniciales toman los datos que llegan por medio del payload
      const { denominacionCliente, email } = action.payload; //destructuring: desestructuro los datos que llegan por el payload y los uso para actualizar el estado de nombre y correo (en este caso denominacionCliente y email llegan desde una api)
      state.nombre = denominacionCliente;
      state.correo = email;
    },
    agregarNombreUsuario: (state, action) => {
      state.nombreUsuario = action.payload;
    },
    agregarContrasenaUsuario: (state, action) => {
      state.contrasenaUsuario = action.payload;
    },
    agregarEmpresa: (state, action) => {
      const { denominacionCliente, idEmpresaUsu } = action.payload;
      state.nombreEmpresa = denominacionCliente;
      state.idEmpresa = idEmpresaUsu;
    },
    cambiarEmail: (state, action) => { //en esta funcion se cambia el email del estado por el que nos llega del payload
      state.email = action.payload;
    },
  },
});

export const { agregarUsuario, agregarNombreUsuario, agregarContrasenaUsuario, agregarEmpresa, cambiarEmail } = usuarioSlice.actions; //devuelvo/exporto dos ACCIONES que fueron creadas por rtk (agregarUsuario y cambiarEmail) que por mas que tengan el mismo nombre que los reducer anteriores, no son lo mismo, éstas son acciones
export default usuarioSlice.reducer; //exporto por defecto el reducer de usuarioSlice
