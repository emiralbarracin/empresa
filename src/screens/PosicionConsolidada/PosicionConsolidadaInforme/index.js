import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import TitleMediumBold from '../../../components/TitleMediumBold';
import { useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import CardSimulacion from '../../../components/CardSimulacion';
import MoneyConverter from '../../../utils/MoneyConverter';

const PosicionConsolidadaInforme = ({ navigation }) => {

    const { tipoOperacion } = useRoute().params

    console.log('tipoOperacion >>> ', tipoOperacion)

    const [informeCarteraCliente, setInformeCarteraCliente] = useState([]);
    const [informePasivaPesos, setInformePasivaPesos] = useState([]);
    const [informeActivaPesos, setInformeActivaPesos] = useState([]);
    const [informeActivaDolares, setInformeActivaDolares] = useState([]);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/BEInformeCarteraCli/RecuperarBEInformeCarteraCli?CodigoSucursal=20&Comprobante=-1&FechaVencimiento=&IdMensaje=Sucursal+virtual`);
                if (res1) {

                    console.log('BEInformeCarteraCli >>> ', JSON.stringify(res1, null, 4));

                    setInformeCarteraCliente(res1.output);

                } else {
                    console.log('ERROR BEInformeCarteraCli');
                }

            } catch (error) {
                console.log('catch BEInformeCarteraCli >>> ', error);
            }

        };

        obtenerDatos();
    }, []);

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/BEPosicionGlobal/RecuperarBEPosicionGlobal?CodigoSucursal=20&CodigoPaisOrigen=&CodigoBancoOrigen=&CodigoSucursalOrigen=&TipoDocumento=5&NumeroDocumento=30710152841&Moneda=&FechaSaldo=&FechaCalculo=&Concepto=&IdMensaje=Sucursal+virtual`);
                if (res1) {

                    console.log('BEPosicionGlobal >>> ', JSON.stringify(res1, null, 4));

                    const pasivaPesos = res1.output.filter(item => item.codigoMoneda == 0 && item.codigoSistema == 2);
                    setInformePasivaPesos(pasivaPesos);

                    const activaPesos = res1.output.filter(item => (item.codigoMoneda == 0 && item.codigoSistema == 3) || item.codigoSistema == 4);
                    setInformeActivaPesos(activaPesos);

                    const activaDolares = res1.output.filter(item => (item.codigoMoneda == 2 && item.codigoSistema == 3) || (item.codigoMoneda == 2 && item.codigoSistema == 4));
                    setInformeActivaDolares(activaDolares);

                } else {
                    console.log('ERROR BEPosicionGlobal');
                }

            } catch (error) {
                console.log('catch BEPosicionGlobal >>> ', error);
            }

        };

        obtenerDatos();
    }, []);

    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>
                <View onStartShouldSetResponder={() => true}>

                    {tipoOperacion === 1 ? (

                        <View>
                            {informeCarteraCliente.length != 0 ? (
                                informeCarteraCliente.map((item, index) => (
                                    <CardSimulacion
                                        key={index}
                                        title={'Cheque'}
                                        data={[
                                            { title: 'Producto', value: item.nombreProducto },
                                            { title: 'N° de cuenta', value: item.codigoCuenta },
                                            { title: 'N° de operación', value: item.numeroOperacion },
                                            { title: 'Saldo', value: <MoneyConverter value={item.saldo} /> },
                                        ]}
                                    />
                                ))
                            ) : (
                                <TitleMediumBold title={'Operación sin informes.'} />
                            )}
                        </View>

                    ) : tipoOperacion === 2 ? (

                        <View>
                            {informePasivaPesos.length != 0 ? (
                                informePasivaPesos.map((item, index) => (
                                    <CardSimulacion
                                        key={index}
                                        title={item.nombreProducto}
                                        data={[
                                            { title: 'N° de cuenta', value: item.codigoCuenta },
                                            { title: 'N° de operación', value: item.numeroOperacion },
                                            { title: 'Saldo', value: <MoneyConverter value={item.saldo} /> },
                                        ]}
                                    />
                                ))
                            ) : (
                                <TitleMediumBold title={'Operación sin informes.'} />
                            )}
                        </View>

                    ) : tipoOperacion === 3 ? (


                        <View>
                            {informeActivaPesos.length != 0 ? (
                                informeActivaPesos.map((item, index) => (
                                    <CardSimulacion
                                        key={index}
                                        title={item.nombreProducto}
                                        data={[
                                            { title: 'N° de cuenta', value: item.codigoCuenta },
                                            { title: 'N° de operación', value: item.numeroOperacion },
                                            { title: 'Saldo', value: <MoneyConverter value={item.saldo} /> },
                                        ]}
                                    />
                                ))
                            ) : (
                                <TitleMediumBold title={'Operación sin informes.'} />
                            )}
                        </View>

                    ) : tipoOperacion === 4 ? (

                        <View>
                            {informeActivaDolares.length != 0 ? (
                                informeActivaDolares.map((item, index) => (
                                    <CardSimulacion
                                        key={index}
                                        title={item.nombreProducto}
                                        data={[
                                            { title: 'N° de cuenta', value: item.codigoCuenta },
                                            { title: 'N° de operación', value: item.numeroOperacion },
                                            { title: 'Saldo', value: <MoneyConverter value={item.saldo} money={2} /> },
                                        ]}
                                    />
                                ))
                            ) : (
                                <TitleMediumBold title={'Operación sin informes.'} />
                            )}
                        </View>

                    ) : (
                        <TitleMediumBold title={'Tipo de operación no encontrada.'} />
                    )}


                </View>
            </ScrollView>

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default PosicionConsolidadaInforme;
