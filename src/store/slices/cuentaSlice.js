import { createSlice } from '@reduxjs/toolkit'; 

const initialState = {
  cuentas: null,
  ojo: true
}

export const cuentaSlice = createSlice({ 
  name: 'cuenta',
  initialState, 

  reducers: { 
    agregarCuentas: (state, action) => { 
      const { output } = action.payload;
      state.cuentas = output;
    },
    cambiarOjo: (state, action) => {
      state.ojo = action.payload;
    },
  },
});

export const { agregarCuentas, cambiarOjo } = cuentaSlice.actions;
export default cuentaSlice.reducer;
