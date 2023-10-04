import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
    marginBottom: '4%',
    width: '28%',
    height: 60,
  },
  button: {
    flex: 1, //ocupar todo el espacio disponible en su contenedor
    color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    justifyContent: 'center',
    backgroundColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.colorB : null),
    elevation: 4, //sombreado
    borderRadius: 10,
    borderColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    borderWidth: 0.5,
  },
  icon: {
    alignSelf: 'center', //centrar horizontalmente el icono
    fontSize: 26,
    color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: size.small,
    color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    fontWeight: 'bold'
  }
});