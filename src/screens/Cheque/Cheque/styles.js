import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightGray,
    },
    body: {
      flex: 6,
      //flex: Platform.OS === 'ios' ? 13 : 15,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    text_header: {
      fontSize: 17,
      marginTop: 5,
      marginBottom: 15,
      alignSelf: 'center',
    },
    text_body: {
      fontSize: 17,
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#b22222',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: colors.black,
    },
    button: {
      alignItems: 'center',
      marginTop: 50,
    },
    signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20,
    },
    color_textPrivate: {
      color: 'grey',
    },
    errorMsg: {
      color: '#FF0000',
      fontSize: 14,
    },
  
    card: {
      //borderWidth: 1,
      borderColor: colors.gray,
      borderRadius: 10,
      marginTop: 10,
      height: 340, //250 (con fecha)
    },
  
    avatar: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
  });
  export default styles;