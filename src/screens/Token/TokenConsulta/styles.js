import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  body: {
    flex: 6,
    marginTop: '4%',
  },
  tarjeta: {
    backgroundColor: colors.white,
    paddingVertical: '4%',
    marginHorizontal: '4%',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
});

export default styles;
