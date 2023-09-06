import { Platform, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

export const styles = StyleSheet.create({
  container: {},
  inputIconContainer: {
    flexDirection: 'row',
    marginHorizontal: '4%',
    marginBottom: '4%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? '4%' : 0,
  },
  icon: {
    color: colors.black,
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: '3%'
  },
  input: {
    flex: 1, //ocupa todo el espacio disponible
    borderRadius: 0,
    fontSize: size.medium,
  },
  iconButton: {
    color: colors.colorA,
    fontSize: 20,
    marginLeft: '3%',
  },
});

export default styles;
