import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import MoneyConverter from '../../../utils/MoneyConverter';

const RecargaExitosa = ({ navigation }) => {

    const { celuar, empresaSeleccionada, importe} = useRoute().params

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const datosCredito = [
        { title: 'Numero de operación', value: '58512' },
        { title: 'Fecha', value: fechaFormateada },
        { title: 'N° de celular', value: celuar },
        { title: 'Empresa', value: empresaSeleccionada },
        { title: 'Importe', value: <MoneyConverter value={importe} /> },
    ];

    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={'Detalles de la recarga'} data={datosCredito} />

            </View>

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default RecargaExitosa;
