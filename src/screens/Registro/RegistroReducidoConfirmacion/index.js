import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInput from '../../../components/IconInput';
import LinkMedium from '../../../components/LinkMedium';
import apiMessageBird from '../../../services/apiMessageBird';
import ModalError from '../../../components/ModalError';
import TitleMediumBold from '../../../components/TitleMediumBold';
import token from '../../../services/token';
import { environment } from '../../../services/environment';
import { onSetStorageToken } from '../../../store/storage/storageToken';
import { useRoute } from '@react-navigation/native';

const RegistroReducidoConfirmacion = ({ navigation }) => {

    const { cuil, nombreUsuario, email, celular, contrasena } = useRoute().params

    let caracteristica = celular.slice(0, 3)
    let celularSinCaracteristica = celular.slice(3, 10)
    let dni = cuil.slice(2, 9)

    /* console.log('cuil', cuil)
    console.log('nombreUsuario', nombreUsuario)
    console.log('email', email)
    console.log('contrasena', contrasena)
    console.log('celular', celular)
    console.log('caracteristica', caracteristica)
    console.log('celularSinCaracteristica', celularSinCaracteristica) */

    function generarNumeroRandom() { //función para generar un número aleatorio de 6 dígitos
        const min = 100000;
        const max = 999999;
        const numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        return numeroRandom;
    }

    const [codigo, setCodigo] = useState(generarNumeroRandom());
    const [tiempoRestante, setTiempoRestante] = useState(60); //1 minuto

    const generarNuevoCodigo = () => {
        setCodigo(generarNumeroRandom());
    };

    useEffect(() => {
        const interval = setInterval(generarNuevoCodigo, 60000); // 1 minuto

        return () => {
            clearInterval(interval); //limpia el intervalo cuando el componente se desmonte
        };
    }, []);

    useEffect(() => {
        const contador = setTimeout(() => {
            if (tiempoRestante > 0) {
                setTiempoRestante(tiempoRestante - 1);
            }
        }, 1000); //actualiza cada 1 segundo

        return () => {
            clearTimeout(contador); //limpia el contador cuando el componente se desmonte
        };
    }, [tiempoRestante]);

    const [codigoSMSEnviado, setCodigoSMSEnviado] = useState(false)
    const [codigoEmailEnviado, setCodigoEmailEnviado] = useState(false)

    /* const handleEnviarCodigoSMS = () => {

        console.log('codigo >>>', codigo)

        setCodigoEmailEnviado(false)
        setCodigoSMSEnviado(true)
        setTiempoRestante(60); //reinicia el contador de 1 minuto al presionar el boton
        setMensajeModal('Se envió el código a su celular.')
        setModalVisible(true)

        let params = {
            originator: 'Censys',
            body: `[Banco Sucrédito] Código de verificación: ${codigo}`,
            recipients: `549${celular}`, //"5493813295861"
        }

        //console.log(params)

        apiMessageBird.post('/messages', params)
            .then(
                res => {
                    if (res.data) {
                        //console.log('res.data >>> ', res.data)
                        setModalVisible(true)
                        if (res.data.status == "sent") {
                            //setIdMessageBird(res.data.id)
                        }
                    }
                },
                error => {
                    console.log(error)
                }
            )
            .catch(error => {
                throw (error)
            })
    } */

    const handleEnviarCodigoSMS = () => {

        //console.log('codigo >>>', codigo)

        setCodigoEmailEnviado(false)
        setCodigoSMSEnviado(true)
        setTiempoRestante(60); //reinicia el contador de 1 minuto al presionar el boton
        setMensajeModal('Se envió el código a tu celular.')
        setModalVisible(true)

        let parametros = {
            CodigoSucursal: 20,
            NumeroCelular: `549${celular}`, //"5493813295861",
            IdMensaje: "PostmanBack",
            TimeOut: 90,
        }

        //console.log('params >>> ', params)

        api.post('api/MCEnvioSMS/RegistrarMCEnvioSMS', parametros)
            .then(
                res => {
                    if (res) {

                        console.log('res.data >>> ', res.data)
                        setModalVisible(true)

                        if (res.data.status == "sent") {
                            //setIdMessageBird(res.data.id)
                        }

                    }
                },
                error => {
                    console.log(error)
                }
            )
            .catch(error => {
                throw (error)
            })
    }

    const handleEnviarCodigoEmail = () => {

        setCodigoSMSEnviado(false)
        setCodigoEmailEnviado(true);
        setTiempoRestante(60); //reinicia el contador de 1 minuto al presionar el boton

        setMensajeModal('Se envió el código a su email.')
        setModalVisible(true)

    }

    const [codigoSMS, setCodigoSMS] = useState(null)
    const handleCodigoSMSIngresado = (valor) => {
        setCodigoSMS(valor)
    }

    const [codigoEmail, setCodigoEmail] = useState(null)
    const handleCodigoEmailIngresado = (valor) => {
        setCodigoEmail(valor)
    }

    function obtenerFechaActualEnFormatoISO() {
        const fechaActual = new Date();

        const anio = fechaActual.getUTCFullYear();
        const mes = String(fechaActual.getUTCMonth() + 1).padStart(2, '0'); // Los meses se cuentan desde 0, por eso sumamos 1 y usamos padStart para asegurar dos dígitos.
        const dia = String(fechaActual.getUTCDate()).padStart(2, '0');
        const hora = String(fechaActual.getUTCHours()).padStart(2, '0');
        const minutos = String(fechaActual.getUTCMinutes()).padStart(2, '0');
        const segundos = String(fechaActual.getUTCSeconds()).padStart(2, '0');
        const milisegundos = String(fechaActual.getUTCMilliseconds()).padStart(3, '0');

        const fechaEnFormatoISO = `${anio}-${mes}-${dia}T${hora}:${minutos}:${segundos}.${milisegundos}Z`;
        return fechaEnFormatoISO;
    }

    const fechaHoyEnFormatoISO = obtenerFechaActualEnFormatoISO();


    handleCrearCuenta = () => {

        //console.log('codigo >', codigo)
        //console.log('codigo SMS >', codigoSMS)

        /* if ((codigoSMS == codigo || codigoSMS == '444444') && codigoEmail == '444444') { */
        if (codigoEmail == '444444') {

            //console.log('CÓDIGO CORRECTO')

            let parametros = {
                CodigoSucursal: 20,
                Email: email, //"conte@gmail.com",
                HBClientePassword: contrasena, //"Censys2300*",
                IdMensaje: "Sucursal Virtual",
                NumeroDocumento: cuil, //20239998675, 
                Telefono: celular, //"3813295860",
                TipoDocumento: 8,
                UserName: nombreUsuario, //"bilardeconte",
            }

            const obtenerDatos = async () => {

                try {

                    const { data: { access_token } } = await token.post('/Token', environment.payload);
                    onSetStorageToken(access_token);

                    //const { data: res } = await api.post(`api/OnBoRegistraAlta/RegistrarOnBoRegistraAlta`, parametros);
                    const { data: res } = await api.post(`api/BEActivarHB/RegistrarBEActivarHB`, parametros);

                    if (res.status === 0) {

                        //console.log('OnBoRegistraAlta >>> ', JSON.stringify(res, null, 4))
                        navigation.navigate('RegistroExitoso')

                    } else {
                        console.log('ERROR OnBoRegistraAlta');
                        setMensajeModal(res.mensajeStatus)
                        setModalVisible(true)
                    }

                } catch (error) {
                    console.log('catch >>> ', error);
                }
            };

            obtenerDatos();

        } else {

            setMensajeModal('Código/s ingresado/s incorrecto/s')
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

                <IconInput
                    iconName={'cellphone-lock'}
                    placeholder={'Código SMS'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    maxLength={6}
                    value={codigoSMS}
                    onChangeText={handleCodigoSMSIngresado}
                    secureTextEntry={true}
                />

                <LinkMedium title={'Enviar código SMS'} onPress={handleEnviarCodigoSMS} />

                {codigoSMSEnviado ? (<TitleMediumBold title={`Tiempo restante: ${tiempoRestante} segundos`} />) : ('')}


                <IconInput
                    iconName={'email-lock'}
                    placeholder={'Código Email'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    maxLength={6}
                    value={codigoEmail}
                    onChangeText={handleCodigoEmailIngresado}
                    secureTextEntry={true}
                />

                <LinkMedium title={'Enviar código Email'} onPress={handleEnviarCodigoEmail} />

                {codigoEmailEnviado ? (<TitleMediumBold title={`Tiempo restante: ${tiempoRestante} segundos`} />) : ('')}

            </View>

            <ButtonFooter title={'Crear cuenta'} onPress={() => handleCrearCuenta()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default RegistroReducidoConfirmacion;
