import { ScrollView, View } from 'react-native';
import React from 'react';
import styles from './styles';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import CardSimulacion from '../../../components/CardSimulacion';
import DateConverter from '../../../utils/DateConverter';

const MovimientoDetalle = ({ navigation }) => {

    const { descripcion, fecha, importe, numeroComprobante } = useRoute().params

    const datosMovimientos = [
        { title: 'N° de comprobante', value: numeroComprobante },
        { title: 'Importe', value: <MoneyConverter value={importe} /> },
        { title: 'Fecha del movimiento', value: <DateConverter date={fecha} /> },
    ];

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                <CardSimulacion title={descripcion} data={datosMovimientos} />

            </ScrollView>

        </View>
    );
};

export default MovimientoDetalle;
