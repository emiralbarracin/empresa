import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import TitleMediumBold from '../../../components/TitleMediumBold';
import { useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import CardSimulacion from '../../../components/CardSimulacion';
import MoneyConverter from '../../../utils/MoneyConverter';
import LoadingIndicator from '../../../components/LoadingIndicator';

const PosicionConsolidadaInforme = ({ navigation }) => {

    const [cargando, setCargando] = useState(true);

    const { tipoOperacion } = useRoute().params

    //console.log('tipoOperacion >>> ', tipoOperacion)

    const [informeCarteraCliente, setInformeCarteraCliente] = useState([]);
    const [informePasivaPesos, setInformePasivaPesos] = useState([]);
    const [informeActivaPesos, setInformeActivaPesos] = useState([]);
    const [informeActivaDolares, setInformeActivaDolares] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {

            try {



            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);


    tipoOperacion === 1 ? (

        useEffect(() => {

            const obtenerDatos = async () => {

                try {

                    const { data: res1 } = await api.get(`api/BEInformeCarteraCli/RecuperarBEInformeCarteraCli?CodigoSucursal=20&Comprobante=-1&FechaVencimiento=&IdMensaje=Sucursal+virtual`);
                    if (res1) {

                        //console.log('BEInformeCarteraCli >>> ', JSON.stringify(res1, null, 4));
                        setInformeCarteraCliente(res1.output);
                        setCargando(false);

                    } else {
                        console.log('ERROR BEInformeCarteraCli');
                        setCargando(false);
                    }

                } catch (error) {
                    console.log('catch BEInformeCarteraCli >>> ', error);
                    setCargando(false);
                }

            };

            obtenerDatos();
        }, [])

    ) : (

        useEffect(() => {

            const obtenerDatos = async () => {

                let numeroDocumento

                try {

                    const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=TODO&IdMensaje=sucursalvirtual`);
                    if (res1) {

                        //console.log('numeroDocumento >>> ', JSON.stringify(res1.output[0].numeroDocumento, null, 4))
                        numeroDocumento = res1.output[0].numeroDocumento

                        const { data: res2 } = await api.get(`api/BEPosicionGlobal/RecuperarBEPosicionGlobal?CodigoSucursal=20&CodigoPaisOrigen=&CodigoBancoOrigen=&CodigoSucursalOrigen=&TipoDocumento=5&NumeroDocumento=${numeroDocumento}&Moneda=&FechaSaldo=&FechaCalculo=&Concepto=&IdMensaje=Sucursal+virtual`);
                        if (res2) {

                            //console.log('BEPosicionGlobal >>> ', JSON.stringify(res2, null, 4));

                            const pasivaPesos = res2.output.filter(item => item.codigoMoneda == 0 && item.codigoSistema == 2);
                            setInformePasivaPesos(pasivaPesos);

                            const activaPesos = res2.output.filter(item => (item.codigoMoneda == 0 && item.codigoSistema == 3) || (item.codigoMoneda == 0 && item.codigoSistema == 4));
                            setInformeActivaPesos(activaPesos);

                            const activaDolares = res2.output.filter(item => (item.codigoMoneda == 2 && item.codigoSistema == 3) || (item.codigoMoneda == 2 && item.codigoSistema == 4));
                            setInformeActivaDolares(activaDolares);

                            setCargando(false);

                        } else {
                            console.log('ERROR BEPosicionGlobal');
                            setCargando(false);
                        }

                    } else {
                        console.log('ERROR HbConsultaCuenta');
                    }

                } catch (error) {
                    console.log('catch BEPosicionGlobal >>> ', error);
                    setCargando(false);
                }

            };

            obtenerDatos();
        }, [])

    )

    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            {cargando ? (
                <LoadingIndicator />
            ) : (

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


            )}

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default PosicionConsolidadaInforme;
