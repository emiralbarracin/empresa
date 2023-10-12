import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import ButtonFooter from '../../../components/ButtonFooter';
import DateConverter from '../../../utils/DateConverter';
import TitleMedium from '../../../components/TitleMedium';
import CardMovimiento from '../../../components/CardMovimiento';
import api from '../../../services/api';
import LoadingIndicator from '../../../components/LoadingIndicator';

const MovimientoCuenta = ({ navigation }) => {

    const { tipoCuenta, tipoMoneda, numeroCuenta, codigoMoneda, codigoSistema, codigoCuenta } = useRoute().params

    const [cargando, setCargando] = useState(true);
    const [ultimosMovimientos, setUltimosMovimientos] = useState([]);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res } = await api.get(`api/BECuentaUltimosMovimientos/RecuperarBECuentaUltimosMovimientos?CodigoSucursal=20&CodigoSistema=${codigoSistema}&CodigoMoneda=${codigoMoneda}&CodigoCuenta=${codigoCuenta}&Pagina=1&IdMensaje=sucursalvirtual`);
                if (res) {

                    //console.log('HbCuentaUltimosMovimientos >>> ', JSON.stringify(res2, null, 4))
                    setUltimosMovimientos(res.output)
                    setCargando(false);

                } else {
                    //console.log('ERROR HbCuentaUltimosMovimientos');
                }


            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                {cargando ? (
                    <LoadingIndicator />
                ) : (

                    <>

                        <TitleMedium title={`${tipoCuenta} ${tipoMoneda} ${numeroCuenta}`} />

                        <ScrollView>
                            {ultimosMovimientos.map((item) => (
                                <CardMovimiento
                                    producto={item.descripcion}
                                    fecha={<DateConverter date={item.fechaReal} />}
                                    importe={<MoneyConverter money={item.codigoMoneda} value={item.importeAccesorio} sintetico={item.sintetico} />}
                                    tipoFuncion={item.tipoFuncion}
                                    onPress={() => navigation.navigate('MovimientoDetalle', {
                                        descripcion: item.descripcion,
                                        fecha: item.fechaReal,
                                        importe: item.importeAccesorio,
                                        numeroComprobante: item.numeroComprobante,
                                    })}
                                />
                            ))}
                        </ScrollView>

                    </>

                )}

            </View>

        </View>
    );
};

export default MovimientoCuenta;
