const entidadSeleccionada = 'EntidadB';

const base = {
  white: '#fff',
  gray: '#888',
  lightGray: '#eee',
  black: '#000',
};

const entidades = {
  EntidadA: {
    colorA: '#b5121b', //color logo bmr
    colorB: '#a5121b',
  },
  EntidadB: {
    colorA: '#155a9e', //color logo bmv
    colorB: '',
  },
};

//https://desarrollador-android.com/material-design/diseno-material-design/estilo/color/

export default colors = { ...base, ...entidades[entidadSeleccionada] };
