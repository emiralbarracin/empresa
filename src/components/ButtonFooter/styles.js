import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
  container: {
  },
  button: {
    backgroundColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.colorB : null),
    justifyContent: 'center', //centra el contenido (titulo) en eje y
    height: 40,
    borderRadius: 10,
    marginHorizontal: '4%',
    marginBottom: '4%',
    elevation: 4,
    borderColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    borderWidth: 0.5,
  },
  title: {
    alignSelf: 'center', //centra el titulo en eje x
    fontSize: size.medium,
    color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    fontWeight: 'bold',
  },
});

export default styles;
