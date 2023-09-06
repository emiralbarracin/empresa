import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import size from '../../../styles/size';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
  },
  body: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  codigo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '4%',
  },
  title: {},
  codigoInput: {
    borderWidth: 1,
    borderColor: colors.black,
    color: colors.black,
    borderRadius: 5,
    width: 40,
    height: 40,
    fontSize: size.large,
    textAlign: 'center',
    marginHorizontal: '1%',
    backgroundColor: colors.white,
  },
  image: {
    resizeMode: 'contain', //ajusta imagen al contenedor
    height: 150,
  },
  link: {
    alignItems: 'center',
  },
});

export default styles;
