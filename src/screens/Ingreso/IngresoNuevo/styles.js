import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
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
    height: 150,
  },
  huella: {
    color: colors.colorA,
    fontSize: 30,
  }
});

export default styles;
