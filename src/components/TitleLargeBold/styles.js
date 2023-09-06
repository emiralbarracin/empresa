import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginHorizontal: '4%',
    marginBottom: '4%',
  },
  title: {
    color: colors.black,
    fontSize: size.large,
    fontWeight: 'bold'
  },
});

export default styles;
