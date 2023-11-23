import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain', //ajusta imagen al contenedor
    },
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    image: {
        resizeMode: 'contain', //ajusta imagen al contenedor
        //height: 150, //bmv
        height: 50, //bsr
    },
});

export default styles;
