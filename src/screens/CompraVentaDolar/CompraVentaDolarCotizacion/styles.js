import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import size from '../../../styles/size';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '3%',
        borderWidth: 1,
        borderColor: colors.gray,
        backgroundColor: 'transparent',
    },
    selectedButton: {
        backgroundColor: colors.colorA,
    },
    buttonText: {
        fontSize: size.medium,
        color: colors.gray,
        fontWeight: 'bold',
    },
    selectedButtonText: {
        color: colors.white,
    },
    body: {
        flex: 1,
        marginTop: '4%'
    },
});

export default styles;
