import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardMovimiento from '../../../components/CardMovimiento';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import { dateFormat } from '../../../utils/Format';
import LoadingIndicator from '../../../components/LoadingIndicator';

const CreditoListado = ({ navigation }) => {

    const [creditos, setCreditos] = useState([]);
    const [variableMovimientos, setVariableMovimientos] = useState(false);
    const [cargando, setCargando] = useState(true);

    const actualizarMovimientos = () => {
        setVariableMovimientos(!variableMovimientos);
    };

    let focusListener = null;

    focusListener = navigation.addListener('focus', () => {
        actualizarMovimientos();
    });

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=CR&IdMensaje=sucursalvirtual`);
                if (res1) {

                    //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
                    let codigoMoneda = res1.output[0].codigoMoneda
                    let codigoCuenta = res1.output[0].codigoCuenta

                    const { data: res2 } = await api.get(`api/BEInformeDeuda/RecuperarBEInformeDeuda?CodigoSucursal=20&CodigoMoneda=${codigoMoneda}&CodigoCuenta=${codigoCuenta}&FechaAjuste=&IdMensaje=SucursalVirtual`);

                    if (res2) {

                        //console.log('BEInformeDeuda >>> ', JSON.stringify(res2, null, 4))
                        setCreditos(res2.output)
                        setCargando(false);

                    } else {
                        console.log('ERROR BEInformeDeuda');
                    }

                } else {
                    console.log('ERROR BEConsultaCuenta');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, [variableMovimientos]);


    return (
        <View style={styles.container}>

            <View style={styles.body}>

                {cargando ? (
                    <LoadingIndicator />
                ) : (

                    <ScrollView>
                        {creditos.map((item) => (
                            <CardMovimiento
                                key={item.numeroOperacion}
                                sinSigno={true}
                                producto={`N° operación: ${item.numeroOperacion}`}
                                fecha={`Vto.: ${dateFormat(item.fechaVencimiento)}`}
                                importe={<MoneyConverter money={item.codigoMoneda} value={item.importePactado} />}
                                onPress={() => navigation.navigate('CreditoListadoDetalle', {
                                    operacion: item.numeroOperacion,
                                    fechaLiquidacion: item.fechaLiquidacion,
                                    fechaVencimiento: item.fechaVencimiento,
                                    codigoCuenta: item.codigoCuenta,
                                    importe: item.importePactado,
                                    totalCuotas: item.totalCuotas,
                                    tna: item.tna,
                                    codigoMoneda: item.codigoMoneda,
                                    codigoSucursal: item.codigoSucursal
                                })}
                            />
                        ))}
                    </ScrollView>

                )}

            </View>

        </View>
    );
};
export default CreditoListado;