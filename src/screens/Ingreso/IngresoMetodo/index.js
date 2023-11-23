import { View } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import CardPerfil from '../../../components/CardPerfil';
import { useRoute } from '@react-navigation/native';

const IngresoMetodo = ({ navigation }) => {

    const { telefono } = useRoute().params

    const handleSMS = () => {
        navigation.navigate('IngresoVerificacion', { telefono })
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.body}>

                    <CardPerfil
                        title="Código SMS"
                        subtitle="Se enviará un código a su celular"
                        iconName="cellphone"
                        onPress={handleSMS}
                    />

                </View>

            </View>
        </>
    );
};

export default IngresoMetodo;