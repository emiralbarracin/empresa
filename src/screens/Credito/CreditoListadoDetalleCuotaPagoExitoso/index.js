import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import ButtonFooter from '../../../components/ButtonFooter';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';

const CreditoListadoDetalleCuotaPagoExitoso = ({ navigation }) => {

    const { numeroCuota, totalCuotas, importe } = useRoute().params

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const datosCredito = [
        { title: 'N° de cuota', value: `${numeroCuota}/${totalCuotas}` },
        { title: 'Importe pagado', value: <MoneyConverter value={importe} /> },
        { title: 'Fecha de pago', value: fechaFormateada },
    ];

    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={'Detalles de la cuota pagada'} data={datosCredito} />

            </View>


            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />
        </View>
    );
};

export default CreditoListadoDetalleCuotaPagoExitoso;