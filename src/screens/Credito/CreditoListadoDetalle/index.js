import { ScrollView, View } from 'react-native';
import React from 'react';
import styles from './styles';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import CardSimulacion from '../../../components/CardSimulacion';
import DateConverter from '../../../utils/DateConverter';
import LinkMedium from '../../../components/LinkMedium';

const CreditoListadoDetalle = ({ navigation }) => {

    const {
        operacion,
        fechaLiquidacion,
        fechaVencimiento,
        codigoCuenta,
        importe,
        totalCuotas,
        tna,
        codigoMoneda,
        codigoSucursal
    } = useRoute().params

    const datosPlazoFijo = [
        { title: 'N° de operación', value: operacion },
        { title: 'Fecha liquidación', value: <DateConverter date={fechaLiquidacion} /> },
        { title: 'Fecha vencimiento', value: <DateConverter date={fechaVencimiento} /> },
        { title: 'Cuenta', value: codigoCuenta },
        { title: 'Importe', value: <MoneyConverter value={importe} /* sintetico={sintetico} */ /> },
        { title: 'Cuotas', value: totalCuotas },
        { title: 'TNA', value: `${tna} %` },
    ];

    const handleCuotas = () => {
        navigation.navigate('CreditoListadoDetalleCuota', {
            numeroOperacionCredito: operacion,
            codigoCuentaCredito: codigoCuenta,
            codigoMonedaCredito: codigoMoneda,
            codigoSucursalCredito: codigoSucursal
        })
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                <CardSimulacion title={'Crédito'} data={datosPlazoFijo} />

                <LinkMedium title={'Ver cuotas'} onPress={handleCuotas} />

            </ScrollView>

        </View>
    );
};

export default CreditoListadoDetalle;