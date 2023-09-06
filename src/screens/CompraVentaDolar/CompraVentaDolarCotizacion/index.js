import { View, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import TitleMedium from '../../../components/TitleMedium';
import IconInputMoney from '../../../components/IconInputMoney';
import TitleLargeBold from '../../../components/TitleLargeBold';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import IconInputMoneyDollar from '../../../components/IconInputMoneyDollar';

const CompraVentaDolarCotizacion = ({ navigation }) => {

    const [pantallaSeleccionada, setPantallaSeleccionada] = useState('compra');

    const [cotizacion, setCotizacion] = useState(null)
    const [total, setTotal] = useState(null)

    const [importe, setImporte] = useState(null)



    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const { data: res } = await api.get('api/HbCotizacionMoneda/RecuperarHbCotizacionMoneda?TipoCoeficiente=&CodigoTasa=&Fecha=2023-07-21T15:53:15.244Z&CodigoPlantilla=11&CodigoSucursal=20&IdMensaje=sucursalvirtual');
                if (res) {
                    //console.log('HbCotizacionMoneda >>> ', JSON.stringify(res.output, null, 4));
                    setCotizacion(res.output[0].tasa)
                } else {
                    console.log('ERROR HbCotizacionMoneda');
                }
            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    const handleImporte = (valor) => {
        setImporte(valor)
        setTotal(valor * cotizacion)
    }

    const handleCompra = () => {
        navigation.navigate('CompraVentaDolarConfirmacionCompra', { importe, cotizacion, total });
    };

    const handleVenta = () => {
        navigation.navigate('CompraVentaDolarConfirmacionVenta', { importe, cotizacion, total });
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity
                    style={[styles.button, pantallaSeleccionada === 'compra' && styles.selectedButton]}
                    onPress={() => setPantallaSeleccionada('compra')}
                >
                    <Text style={[styles.buttonText, pantallaSeleccionada === 'compra' && styles.selectedButtonText]}>Compra</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, pantallaSeleccionada === 'venta' && styles.selectedButton]}
                    onPress={() => setPantallaSeleccionada('venta')}
                >
                    <Text style={[styles.buttonText, pantallaSeleccionada === 'venta' && styles.selectedButtonText]}>Venta</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.body}>

                {pantallaSeleccionada === 'compra' ? (

                    <View>

                        <TitleMedium title={'Importe en dólares'} />

                        <IconInputMoneyDollar placeholder={'Ingrese el importe'} onChangeText={handleImporte} value={importe} />

                        <TitleMedium title={'Cotización ( u$s 1 )'} />
                        <TitleLargeBold title={<MoneyConverter value={cotizacion} />} />

                        <TitleMedium title={'Total ( Pesos )'} />
                        <TitleLargeBold title={<MoneyConverter value={total} />} />

                    </View>

                ) : (

                    <View>

                        <TitleMedium title={'Importe en dólares'} />

                        <IconInputMoneyDollar placeholder={'Ingrese el importe'} onChangeText={handleImporte} value={importe} />

                        <TitleMedium title={'Cotización ( u$s 1 )'} />
                        <TitleLargeBold title={<MoneyConverter value={cotizacion} />} />

                        <TitleMedium title={'Total ( Pesos )'} />
                        <TitleLargeBold title={<MoneyConverter value={total} />} />

                    </View>


                )}

            </View>

            {pantallaSeleccionada === 'compra' ? (

                <ButtonFooter title={'Continuar con la compra'} onPress={() => handleCompra()} />

            ) : (

                <ButtonFooter title={'Continuar con la venta'} onPress={() => handleVenta()} />

            )}

        </View>
    );
};

export default CompraVentaDolarCotizacion;
