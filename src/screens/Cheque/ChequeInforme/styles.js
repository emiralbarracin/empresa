import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingBottom: 5,
    fontSize: 20,
  },
  body: {
    flex: Platform.OS === 'ios' ? 13 : 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    fontSize: 20,
    marginBottom: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: -10,
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
  buttonCard: {
    alignItems: 'center',
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
  },
  cardContent: {
    alignItems: 'center',
    marginVertical: 10, ////////////////
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    backgroundColor: colors.white,
    color: colors.white,
  },
  containerCheckbox: {
    alignItems: 'flex-start',
    width: '100%',
  },
  listContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  listParagraph: {
    flex: 1,
    //marginTop: 2
  },
  listText: {
    alignItems: 'flex-start',
    fontSize: 14,
    color: colors.gray,
  },
  listTitle: {
    fontSize: 16,
  },
  bodyTextContainer: {
    flex: 2,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  first: {
    flex: 9,
  },
  second: {
    flex: 0.85,
  },
});
export default styles;