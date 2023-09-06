import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: '2%'
  },
  title: {
    color: colors.black,
    fontSize: size.small,
    fontWeight: 'bold',
  },
});

export default styles;
