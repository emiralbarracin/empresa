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
    paddingVertical: Platform.OS === 'ios' ? '4%' : 0,
  },
  icon: {
    color: colors.black,
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: '3%'
  },
  input: {
    flex: 1,
    fontSize: size.medium,
    marginLeft: '2%'
  },
  overlayText: {
    position: 'absolute',
    left: '3%',
    alignSelf: 'center',
    fontSize: size.large,
    color: colors.black,
  },
});

export default styles;
