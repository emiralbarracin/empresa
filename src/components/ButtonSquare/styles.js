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
    color: colors.white,
    justifyContent: 'center',
    backgroundColor: colors.colorA,
    elevation: 4, //sombreado
    borderRadius: 10,
  },
  icon: {
    alignSelf: 'center', //centrar horizontalmente el icono
    fontSize: 26,
    color: colors.white,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: size.small,
    color: colors.white,
    fontWeight: 'bold'
  }
});