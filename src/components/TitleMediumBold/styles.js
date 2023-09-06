import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: '4%'
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: size.medium,
  },
});

export default styles;
