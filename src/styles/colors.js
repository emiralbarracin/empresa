const entidadSeleccionada = 'BSR';

const base = {
  white: '#fff',
  gray: '#999',
  lightGray: '#eee',
  black: '#000',
};

const entidades = {
  BMR: {
    colorA: '#b5121b',
    colorB: '#a5121b',
  },
  BMV: {
    colorA: '#155a9e',
    colorB: '',
  },
  BSR: {
    colorA: '#e41e2f',
    colorB: '#ffe91a',
  },
};

//https://desarrollador-android.com/material-design/diseno-material-design/estilo/color/

export default colors = { ...base, ...entidades[entidadSeleccionada], entidadSeleccionada };
