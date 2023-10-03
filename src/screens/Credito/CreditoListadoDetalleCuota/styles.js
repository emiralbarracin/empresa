import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    body: {
        flex: 6,
        justifyContent: 'center',
        marginTop: '2%',
    },
});

export default styles;
