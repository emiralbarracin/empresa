import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 30,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.colorB : null),
    marginHorizontal: 3,
    elevation: 0,
    borderColor: colors.entidadSeleccionada === 'BMV' ? colors.colorA : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    borderWidth: 0.5,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: colors.black,
    fontSize: size.medium,
  },
  text: {
    color: colors.entidadSeleccionada === 'BMV' ? colors.white : (colors.entidadSeleccionada === 'BSR' ? colors.black : null),
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: size.medium,
  },
});

export default styles;
