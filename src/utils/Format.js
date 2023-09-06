import Moment from 'moment';

/* import {MaskService} from 'react-native-masked-text';
export const numberFormat = value => {
  const money = MaskService.toMask('money', value, {
    unit: '',
    separator: ',',
    delimiter: '.',
  });

  return money;
}; */

export const parseFloatFormat = value => {
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
};

export const dateFormatComplete = value => {
  return Moment(value).format('DD/MM/yyyy, h:mm:ss a');
};

export const dateFormat = value => {
  // let d = new Date(value)
  // return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`

  return Moment(value).format('DD/MM/yyyy');
};
export const dateTimeFormat = value => {
  // let d = new Date(value)
  // return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`

  return Moment(value).format('yyyy/MM/DD');
};

export const dateFormatApi = value => {
  return Moment(value).format('yyyy-MM-D');
};
export const dateFormatApi2 = value => {
  return Moment(value).format('yyyy/MM/DD');
};
export const dateFormatApi3 = value => {
    return Moment(value).format('MM-DD-yyyy');
  };
export const dateFormatHoursMinutes = value => {
  return Moment(value).format('HH:mm');
};

export const numberDecimalsFormat = numero => {
  const numeroFormateado = numero.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return numeroFormateado;
};

/* export const getBankForReport = () => {
  const {banco} = Enviroment;
  const BANK_ENVIROMENT_REPORT = {
    BMR: 'bancomunicipal',
    VOII: 'voii',
    SUCREDITO: 'sucredito',
    PIANO: 'piano',
    PIOLA: '',
    BSE: 'bse',
    MONEDAUNO: 'monedauno',
    MERCEDES: 'mbenz',
    CMF: 'cmf',
    //restan:
    BTF: '',
    //tarjetaorigen
  };
  const BANK_DEFAULT = 'bancomunicipal';
  const bank = BANK_ENVIROMENT_REPORT[banco] || BANK_DEFAULT;
  return bank;
}; */

export const getHoursComplete = (hora, minutos) => {
  let horaFormateada = hora;
  let minutosFormateados = minutos;
  if (Number(hora) < 10) {
    horaFormateada = '0' + hora;
  }
  if (Number(minutos) < 10) {
    minutosFormateados = '0' + minutos;
  }

  return horaFormateada + ':' + minutosFormateados;
};
