import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardMovimiento from '../../../components/CardMovimiento';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import { dateFormat } from '../../../utils/Format';
import LoadingIndicator from '../../../components/LoadingIndicator';

const PlazoFijoListado = ({ navigation }) => {

    const [plazosFijos, setPlazosFijos] = useState([]);
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

                const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=PF&IdMensaje=sucursalvirtual`);
                if (res1) {

                    //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
                    let codigoCuenta = res1.output[0].codigoCuenta
                    let codigoMoneda = res1.output[0].codigoMoneda

                    const { data: res2 } = await api.get(`api/BEConsultaPlazoFijo/RecuperarBEConsultaPlazoFijo?CodigoSucursal=20&CodigoMoneda=${codigoMoneda}&CodigoCuenta=${codigoCuenta}&FechaAjuste=&IdMensaje=SucursalVirtual`);

                    if (res2) {

                        //console.log('BEConsultaPlazoFijo >>> ', JSON.stringify(res2, null, 4))
                        setPlazosFijos(res2.output)
                        setCargando(false);

                    } else {
                        console.log('ERROR BEConsultaPlazoFijo');
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
                        {plazosFijos.map((item) => (
                            <CardMovimiento
                                key={item.numeroOperacion}
                                sinSigno={true}
                                producto={`N° operación: ${item.numeroOperacion}`}
                                fecha={`Vto.: ${dateFormat(item.fechaVencimiento)}`}
                                importe={<MoneyConverter money={item.codigoMoneda} value={item.importePactado} />}
                                onPress={() => navigation.navigate('PlazoFijoListadoDetalle', {
                                    operacion: item.numeroOperacion,
                                    descripcion: item.descripcionProducto,
                                    fechaOrigen: item.fechaOrigen,
                                    fechaVencimiento: item.fechaVencimiento,
                                    codigoCuenta: item.codigoCuenta,
                                    importe: item.importePactado,
                                    tasa: item.tasa,
                                })}
                            />
                        ))}
                    </ScrollView>

                )}

            </View>

        </View>
    );
};

export default PlazoFijoListado;