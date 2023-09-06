import { View } from 'react-native';
import React from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';

const CompraVentaDolarAcreditacion = ({ navigation }) => {

    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>



            </View>

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default CompraVentaDolarAcreditacion;