import { View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import CardPerfil from '../../../components/CardPerfil';

const IngresoMetodo = ({ navigation }) => {

    const handleSMS = () => {
        navigation.navigate('IngresoVerificacion')
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.body}>

                    <CardPerfil
                        title="Código SMS"
                        subtitle="Se enviará un código a tu celular"
                        iconName="cellphone"
                        onPress={handleSMS}
                    />

                </View>

            </View>
        </>
    );
};

export default IngresoMetodo;