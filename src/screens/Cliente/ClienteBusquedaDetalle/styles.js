import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  body: {
    flex: 6,
    //justifyContent: 'center', //a scrollview no le gusta el justifycontent
  },
});

export default styles;
