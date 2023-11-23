import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.entidadSeleccionada === 'BMV' ? colors.lightGray : (colors.entidadSeleccionada === 'BSR' ? colors.colorB : null),
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain', //ajusta imagen al contenedor
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  image: {
    resizeMode: 'contain', //ajusta imagen al contenedor
    //height: 150, //bmv
    height: 50, //bsr
  },
  containerHuella: {
    alignItems: 'center',
    marginTop: '4%'
  },
  huella: {
    color: colors.black,
    fontSize: 30,
  }
});

export default styles;
