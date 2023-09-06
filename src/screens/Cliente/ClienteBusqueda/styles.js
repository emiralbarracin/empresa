import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  body: {
    flex: 6,
    marginTop: '2%'
    //justifyContent: 'center', //a scrollview no le gusta justifycontent
  },
  titulo: {
    alignSelf: 'flex-start',
    marginTop: '2%'
  },
  IconInputButton: {
    justifyContent: 'center',
    marginHorizontal: '20%',
  },
  botonBuscar: {
    marginVertical: '2%',
    marginHorizontal: '30%'
  },
});

export default styles;
