import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  body: {
    flex: 6,
  },
  image: {
    resizeMode: 'contain', //ajusta imagen al contenedor
    height: 80,
    alignSelf: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row', //alinear de manera horizontal
    alignSelf: 'center' //centrar los botones
  },
  usuario: {
    marginLeft: '4%',
    marginTop: '1%',
    flexDirection: 'row'
  },
});

export default styles;
