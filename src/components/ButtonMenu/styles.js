import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

export const styles = StyleSheet.create({
  container: {
    margin: '1%'
  },
  button: {
    flexDirection: 'row',
    height: 30,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    fontSize: 20
  },
  titleContainer: {
    flex: 5,
    justifyContent: 'center', //alinea centrado en eje y
    alignItems: 'flex-start', //alinear centrado en eje x
    borderBottomWidth: 0.3, //linea por debajo del titulo
    borderBottomColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
  },
  title: {
    fontSize: size.medium,
    color: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    fontWeight: 'bold'
  },
});