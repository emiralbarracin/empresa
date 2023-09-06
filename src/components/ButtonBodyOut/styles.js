import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import size from '../../styles/size';

const styles = StyleSheet.create({
    container: {
    },
    button: {
        backgroundColor: colors.white,
        justifyContent: 'center', //centra el contenido (titulo) en eje y
        height: 40,
        margin: '1%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.colorA,
    },
    title: {
        alignSelf: 'center', //centra el titulo en eje x
        fontSize: size.medium,
        color: colors.colorA,
        fontWeight: 'bold',
    },
});

export default styles;
