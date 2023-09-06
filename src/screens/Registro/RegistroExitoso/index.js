import { View } from 'react-native';
import React from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import TitleLargeBold from '../../../components/TitleLargeBold';
import TitleMedium from '../../../components/TitleMedium';

const RegistroExitoso = ({ navigation }) => {

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <TitleLargeBold title={'Bienvenid@!'} />
                <TitleMedium title={'Gracias por ser parte de nuestro banco!'} />

            </View>

            <ButtonFooter title={'Ingresar'} onPress={() => navigation.navigate('IngresoNuevo')} />


        </View>
    );
};

export default RegistroExitoso;
