const entidadSeleccionada = 'BSR';

const base = {
  white: '#fff',
  gray: '#888',
  lightGray: '#eee',
  black: '#000',
};

const entidades = {
  BMR: {
    colorA: '#b5121b', //color logo bmr
    colorB: '#a5121b',
  },
  BMV: {
    colorA: '#155a9e', //color logo bmv
    colorB: '',
  },
  BSR: {
    //colorA: '#ffe91a', //color logo bsr
    colorA: '#e41e2f', //color logo bsr
    //colorA: '#eeb501', //color logo bsr
    colorB: '#ffe91a',
  },
};

//https://desarrollador-android.com/material-design/diseno-material-design/estilo/color/

export default colors = { ...base, ...entidades[entidadSeleccionada] };
