import { View } from 'react-native';
import ButtonFooter from '../../../components/ButtonFooter';
import styles from './styles';

const BasePantalla = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
            </View>

            <View style={styles.body}>
            </View>

            <View style={styles.footer}>
                <ButtonFooter
                    title={'Siguiente'}
                    onPress={() => navigation.navigate('')}
                />
            </View>

        </View>
    );
};

export default BasePantalla;
