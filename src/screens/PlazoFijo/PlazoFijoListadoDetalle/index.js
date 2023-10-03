import { ScrollView, View } from 'react-native';
import React from 'react';
import styles from './styles';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import CardSimulacion from '../../../components/CardSimulacion';
import DateConverter from '../../../utils/DateConverter';

const PlazoFijoListadoDetalle = ({ navigation }) => {

    const {
        operacion,
        descripcion,
        fechaOrigen,
        fechaVencimiento,
        codigoCuenta,
        importe,
        tasa,
    } = useRoute().params

    const datosPlazoFijo = [
        { title: 'N° de operación', value: operacion },
        { title: 'Fecha origen', value: <DateConverter date={fechaOrigen} /> },
        { title: 'Fecha vencimiento', value: <DateConverter date={fechaVencimiento} /> },
        { title: 'Cuenta', value: codigoCuenta },
        { title: 'Importe', value: <MoneyConverter value={importe} /* sintetico={sintetico} */ /> },
        { title: 'Tasa', value: `${tasa} %` },
    ];

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                <CardSimulacion title={descripcion} data={datosPlazoFijo} />

            </ScrollView>

        </View>
    );
};

export default PlazoFijoListadoDetalle;
