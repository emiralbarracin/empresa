import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
  container: {
  },
  button: {
    backgroundColor: colors.colorA,
    justifyContent: 'center', //centra el contenido (titulo) en eje y
    height: 40,
    borderRadius: 10,
    marginHorizontal: '4%',
    marginBottom: '4%',
    elevation: 4,
  },
  title: {
    alignSelf: 'center', //centra el titulo en eje x
    fontSize: size.medium,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
