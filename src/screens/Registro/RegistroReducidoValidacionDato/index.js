import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import ParagraphMedium from '../../../components/ParagraphMedium';
import TitleMediumBold from '../../../components/TitleMediumBold';
import CheckboxGroup from '../../../components/CheckboxGroup';
import ModalError from '../../../components/ModalError';
import LoadingIndicator from '../../../components/LoadingIndicator';

const RegistroReducidoValidacionDato = ({ navigation }) => {

    const { cuil } = useRoute().params

    const [cargando, setCargando] = useState(true);

    const [domRandom1, setDomRandom1] = useState(null)
    const [domRandom2, setDomRandom2] = useState(null)
    const [domRandom3, setDomRandom3] = useState(null)

    const [fechaRandom1, setFechaRandom1] = useState(null)
    const [fechaRandom2, setFechaRandom2] = useState(null)
    const [fechaRandom3, setFechaRandom3] = useState(null)

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(`api/OnBoGeneraDomicilio/RecuperarOnBoGeneraDomicilio?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&IdMensaje=sucursalvirtual`);
                if (res1) {

                    //console.log('OnBoGeneraDomicilio >>> ', JSON.stringify(res1, null, 4))

                    setDomRandom1(res1.output[0].domrandom1)
                    setDomRandom2(res1.output[0].domrandom2)
                    setDomRandom3(res1.output[0].domrandom3)

                } else {
                    console.log('ERROR OnBoGeneraDomicilio');
                }

                const { data: res2 } = await api.get(`api/OnBoGeneraFecha/RecuperarOnBoGeneraFecha?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&IdMensaje=sucursalvirtual`);
                if (res2) {

                    //console.log('OnBoGeneraFecha >>> ', JSON.stringify(res2, null, 4))

                    setFechaRandom1(res2.output[0].fechaRandom1.slice(0, 10))
                    setFechaRandom2(res2.output[0].fechaRandom2.slice(0, 10))
                    setFechaRandom3(res2.output[0].fechaRandom3.slice(0, 10))
                    setCargando(false);

                } else {
                    console.log('ERROR OnBoGeneraFecha');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }

        };

        obtenerDatos();
    }, []);


    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState(null);
    const handleDomicilioSeleccionado = (valor) => {
        setDomicilioSeleccionado(valor);
    };
    const domicilios = [domRandom1, domRandom2, domRandom3, 'Ninguna de las anteriores'];


    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const handleFechaSeleccionada = (valor) => {
        setFechaSeleccionada(valor);
    };

    const fechas = [fechaRandom1, fechaRandom2, fechaRandom3, 'Ninguna de las anteriores'];

    let pasaValidacionDomicilio = 0
    let pasaValidacionFecha = 0

    const handleSiguiente = () => {

        console.log('CUIL >>>> ', cuil)

        const obtenerDatos = async () => {

            try {

                if (domicilioSeleccionado === 'Ninguna de las anteriores') {

                    const { data: res1 } = await api.get(`api/OnBoConsultaDomicilioSeleccionado/RecuperarOnBoConsultaDomicilioSeleccionado?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&Domseleccionado=&OpcNinguno=S&IdMensaje=sucursalvirtual`);
                    if (res1) {
                        //console.log('OnBoConsultaDomicilioSeleccionado >>> ', JSON.stringify(res1, null, 4))
                        pasaValidacionDomicilio = res1.output[0].eleccionDomicilio
                    } else {
                        console.log('ERROR OnBoConsultaDomicilioSeleccionado');
                    }

                } else {

                    const { data: res1 } = await api.get(`api/OnBoConsultaDomicilioSeleccionado/RecuperarOnBoConsultaDomicilioSeleccionado?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&Domseleccionado=${domicilioSeleccionado}&OpcNinguno=N&IdMensaje=sucursalvirtual`);
                    if (res1) {
                        //console.log('OnBoConsultaDomicilioSeleccionado >>> ', JSON.stringify(res1, null, 4))
                        pasaValidacionDomicilio = res1.output[0].eleccionDomicilio
                    } else {
                        console.log('ERROR OnBoConsultaDomicilioSeleccionado');
                    }

                }


                if (fechaSeleccionada === 'Ninguna de las anteriores') {

                    const { data: res2 } = await api.get(`api/OnBoConsultaFechaSeleccionada/RecuperarOnBoConsultaFechaSeleccionada?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&FechaSeleccionada=&OpcionNinguno=S&IdMensaje=sucursalvirtual`);
                    if (res2) {
                        //console.log('OnBoConsultaFechaSeleccionada >>> ', JSON.stringify(res2, null, 4))
                        pasaValidacionFecha = res2.output[0].eleccionFecha
                        verificarDatos()
                    } else {
                        console.log('ERROR OnBoConsultaFechaSeleccionada');
                    }

                } else {

                    const { data: res2 } = await api.get(`api/OnBoConsultaFechaSeleccionada/RecuperarOnBoConsultaFechaSeleccionada?CodigoSucursal=20&TipoDocumento=8&NumeroDocumento=${cuil}&FechaSeleccionada=${`${fechaSeleccionada}T00:00:00`}&OpcionNinguno=N&IdMensaje=sucursalvirtual`);
                    if (res2) {
                        //console.log('OnBoConsultaFechaSeleccionada >>> ', JSON.stringify(res2, null, 4))
                        pasaValidacionFecha = res2.output[0].eleccionFecha
                        verificarDatos()
                    } else {
                        console.log('ERROR OnBoConsultaFechaSeleccionada');
                    }
                }


            } catch (error) {
                console.log('catch >>> ', error);
            }

        };

        obtenerDatos();

    }


    const verificarDatos = () => {
        if (pasaValidacionDomicilio === 1 && pasaValidacionFecha === 1) {
            navigation.navigate('RegistroReducidoDatoCuenta', { cuil })
        } else {
            setMensajeModal('Los datos seleccionados de validación son incorrectos. Tenés que dirigirte a una sucursal del banco.')
            setModalVisible(true)
        }
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };


    return (

        <View style={styles.container}>

            <View style={styles.body}>

                {cargando ? (
                    <LoadingIndicator />
                ) : (

                    <>

                        <ParagraphMedium title={'Validá tu domicilio y fecha de nacimiento seleccionando la opción correcta o "Ninguna de las anteriores". Si seleccionás incorrectamente, tu cuenta se bloqueará y deberás contactar a un representante del banco para resolverlo.'} />

                        <View style={{ alignSelf: 'flex-start', marginLeft: '4%' }}>
                            <TitleMediumBold title={'Domicilio'} />
                        </View>

                        <CheckboxGroup options={domicilios} onOptionSelect={handleDomicilioSeleccionado} />

                        <View style={{ alignSelf: 'flex-start', marginLeft: '4%' }}>
                            <TitleMediumBold title={'Fecha de nacimiento'} />
                        </View>

                        <CheckboxGroup options={fechas} onOptionSelect={handleFechaSeleccionada} />

                    </>

                )}

            </View>

            <ButtonFooter title={'Siguiente'} onPress={() => handleSiguiente()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default RegistroReducidoValidacionDato;
