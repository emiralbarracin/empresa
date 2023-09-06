import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nombre: '', //valor inicial
}

export const usuarioEncontradoSlice = createSlice({
    name: 'usuarioEncontrado',
    initialState, //objeto con valores iniciales
    reducers: {
        agregarUsuarioEncontrado: (state, action) => { //reducer para agregar un usuario encontrado
            const { nombre } = action.payload; //obtiene el nombre que trae la api desde el payload de la acción
            state.nombre = nombre; //actualiza el nombre en el estado del slice
        },
    },
});

export const { agregarUsuarioEncontrado } = usuarioEncontradoSlice.actions; //genera las acciones (agregarUsuarioEncontrado) y las exporta
export default usuarioEncontradoSlice.reducer; //exporta el reducer del slice
