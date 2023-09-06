import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardMovimiento from '../../../components/CardMovimiento';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import { dateFormat } from '../../../utils/Format';

const PlazoFijoListado = ({ navigation }) => {

    const [ultimosMovimientos, setUltimosMovimientos] = useState([]);

    const [variableMovimientos, setVariableMovimientos] = useState(false);

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

                const { data: res1 } = await api.get(`api/HbConsultaCuenta/RecuperarHbConsultaCuenta?CodigoSucursal=20&Concepto=CR&IdMensaje=sucursalvirtual`);
                if (res1) {

                    let codigoCuenta = res1.output[0].codigoCuenta
                    let codigoMoneda = res1.output[0].codigoMoneda
                    let numeroDocumento = res1.output[0].numeroDocumento
                    //console.log('HbConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))

                    const { data: res2 } = await api.get(`api/HbConsultaPlazoFijo/RecuperarHbConsultaPlazoFijo?CodigoSucursal=20&CodigoMoneda=${codigoMoneda}&CodigoCuenta=${codigoCuenta}&FechaAjuste=&IdMensaje=SucursalVirtual`);
                    //const { data: res2 } = await api.get(`api/InformeDeuda/RecuperarInformeDeuda?CodigoSucursal=20&CodigoMoneda=0&CodigoCuenta=13851886&TipoDocumento=8&NumeroDocumento=27355185945&FechaAjuste=&IdMensaje=SucursalVirtual`);
                    if (res2) {
                        //console.log('HbCuentamis creditos >>> ', JSON.stringify(res2, null, 4))
                        setUltimosMovimientos(res2.output)

                    } else {
                        console.log('ERROR HbCuentaUltimosMovimientos');
                    }

                } else {
                    console.log('ERROR HbCuentaUltimosMovimientos');
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

                <ScrollView>
                    {ultimosMovimientos.map((item) => (
                        <CardMovimiento
                            sinSigno={true}
                            producto={`N° operación: ${item.numeroOperacion}`}
                            fecha={`Vto.: ${dateFormat(item.fechaVencimiento)}`}
                            importe={<MoneyConverter money={item.codigoMoneda} value={item.importePactado} />}
                        /* onPress={() => navigation.navigate('CreditoMovimientosDetalle', {
                            descripcion: item.numeroOperacion,
                            cuenta: item.codigoCuenta,
                            operacion: item.numeroOperacion,
                            fecha: item.fechaReal,
                            importe: item.importeAccesorio,

                        })} */
                        />
                    ))}
                </ScrollView>

            </View>

        </View>
    );
};
export default PlazoFijoListado;