import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const CardMovimiento = ({ producto, importe, fecha, tipoFuncion, onPress, sinSigno }) => {

  let importeStyle
  let signo

  if (sinSigno === true) {
    importeStyle = styles.importeBlack
    signo = ''
  } else {
    importeStyle = tipoFuncion === 1 ? styles.importeGreen : styles.importeRed;
    signo = tipoFuncion === 1 ? '+' : '-';
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.datosContainer}>
          <View style={styles.productoContainer}>
            <Text style={styles.producto}>{producto}</Text>
          </View>
          <View style={styles.importeContainer}>
            <Text style={[styles.importe, importeStyle]}>
              {signo} {importe}
            </Text>
          </View>
        </View>
        <Text style={styles.fecha}>{fecha}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: colors.white,
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    marginBottom: '0.5%',
  },
  datosContainer: {
    flexDirection: 'row',
  },
  productoContainer: {
    flex: 3,
    alignItems: 'flex-start',
    marginBottom: '1%',
  },
  producto: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: size.small,
  },
  importeContainer: {
    flex: 3,
    alignItems: 'flex-end',
  },
  importe: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: size.small,
  },
  importeGreen: {
    color: '#42ab49',
  },
  importeRed: {
    color: '#c63637',
  },
  importeBlack: {
    color: colors.black,
  },
  fecha: {
    color: colors.gray,
    fontSize: size.small,
  },
};

export default CardMovimiento;