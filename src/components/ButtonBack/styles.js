import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  button: {
  },
  icon: {
    color: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    fontSize: 24,
  },
});

export default styles;
