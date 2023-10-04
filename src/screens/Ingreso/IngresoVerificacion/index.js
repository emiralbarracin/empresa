import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Image, Platform } from 'react-native';
import colors from '../../../styles/colors';
import styles from './styles';
import ModalError from '../../../components/ModalError';
import LinkSmall from '../../../components/LinkSmall';
import TitleLarge from '../../../components/TitleLarge';
import apiMessageBird from '../../../services/apiMessageBird';
import TitleMediumBold from '../../../components/TitleMediumBold';
import DeviceInfo from 'react-native-device-info';
import api from '../../../services/api';
import LinkMedium from '../../../components/LinkMedium';
import { useRoute } from '@react-navigation/native';

const IngresoVerificacion = ({ navigation }) => {

  const {telefono} = useRoute().params

  const [showEnviarCodigo, setShowEnviarCodigo] = useState(true);
  const [showReenviarCodigo, setShowReenviarCodigo] = useState(false);

  const [contador, setContador] = useState(false)

  /*  useEffect(() => {
     handleEnviarCodigoSMS()
   }, []); */

  function generarNumeroRandom() {
    const min = 100000;
    const max = 999999;
    const numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroRandom;
  }

  const [codigoSMS, setCodigoSMS] = useState(generarNumeroRandom());
  const [tiempoRestante, setTiempoRestante] = useState(60);

  const generarNuevoCodigo = () => {
    setCodigoSMS(generarNumeroRandom());
  };

  useEffect(() => {
    const interval = setInterval(generarNuevoCodigo, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const contador = setTimeout(() => {
      if (tiempoRestante > 0) {
        setTiempoRestante(tiempoRestante - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(contador);
    };
  }, [tiempoRestante]);

  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);

  const handleEnviarCodigoSMS = () => {

    console.log('codigoSMS >>>', codigoSMS)

    setTiempoRestante(60)
    setMensajeModal('Se envió el código a tu celular.')
    setModalVisible(true)

    setShowEnviarCodigo(false);
    setShowReenviarCodigo(true);
    setModalVisible(true)
    setContador(true)

    let params = {
      originator: 'Censys',
      body: `[Banco Masventas] Código de verificación: ${codigoSMS}`,
      //recipients: "5493813295861"
      recipients: `549${telefono}`, //"5493813295861"
    }

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

  }

  const handleReenviarCodigoSMS = () => {
    setTiempoRestante(60);
    setShowEnviarCodigo(false);
    setShowReenviarCodigo(false);
    handleEnviarCodigoSMS()
  }


  const [codigo, setCodigo] = useState(['', '', '', '', '', '']); //estado para almacenar el código ingresado
  const refInputs = useRef([]); //referencia a los inputs del código

  const handleCodigoChange = (index, value) => {
    const nuevoCodigo = [...codigo]; //creo una copia del estado actual del código
    nuevoCodigo[index] = value; //actualizo el valor del código en el índice correspondiente
    setCodigo(nuevoCodigo); //actualizo el estado del código con la nueva copia

    if (value.length === 1 && index < 5) { //si se ingresó un valor en el input actual y no es el último input..
      refInputs.current[index + 1].focus(); //enfoco automáticamente el siguiente input
    }

    if (index === 5) { //si se ingresó un valor en el último input..

      const codigoIngresado = nuevoCodigo.join(''); //concateno los valores del código en un solo string

      if (codigoIngresado == '444444' || codigoIngresado == codigoSMS) { //si el código ingresado es 444444..

        ingresar()

      } else { //si el código ingresado NO es 444444..
        setMensajeModal('El código ingresado es incorrecto')
        setModalVisible(true);
        setCodigo(['', '', '', '', '', '']); //reinicio el estado del código
        refInputs.current[0].focus(); //y enfoco el primer input para volver a ingresar el código
      }
    }
  };

  const handleAceptar = () => {
    setModalVisible(false)
  }

  const ingresar = async () => {

    const ip = await DeviceInfo.getIpAddress(); //obtiene ip

    let parametros = {
      codigoSucursal: 20,
      ip: ip,
      banca: 1, //0 bi | 1 be
      CodigoAplicacion: 2, //1 web | 2 mobile | 3 tablet
      codigoAplicacionSO: Platform.OS === 'ios' ? 2 : 1, //1 android | 2 ios
      idMensaje: 'Registrar último login'
    }

    try {

      const { data } = await api.post(`api/RegistroUltimoLogin/RegistrarRegistroUltimoLogin`, parametros);
      if (data) {

        //console.log('RegistroUltimoLogin >>> ', data);

        navigation.navigate('IngresoEmpresaListado');

      } else {
        console.log('ERROR RegistroUltimoLogin>>> ', data);
      }

    } catch (error) {
      console.log('catch >>> ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          //source={require('../../../assets/images/logoBMV.png')}
          source={require('../../../assets/images/logoSucredito.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.title}>
          <TitleLarge title={'Ingresá el código de verificación'} />
        </View>
        <View style={styles.codigo}>
          {[0, 1, 2, 3, 4, 5].map(index => (
            <TextInput
              key={index}
              ref={input => (refInputs.current[index] = input)} //asignación de la referencia del input
              style={styles.codigoInput}
              maxLength={1} //solo se permite ingresar un carácter
              keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
              onChangeText={value => handleCodigoChange(index, value)} //evento para detectar cambios en el input
              value={codigo[index]} //valor actual del input
              cursorColor={colors.black}
              secureTextEntry={true}
            />
          ))}
        </View>
        <View style={styles.link}>

          {contador ? (
            <TitleMediumBold title={`Tiempo restante: ${tiempoRestante} segundos`} />
          ) : null
          }

          {showEnviarCodigo && (
            <LinkMedium title={'Enviar código'} onPress={handleEnviarCodigoSMS} />
          )}

          {showReenviarCodigo && (
            <LinkMedium title={'Reenviar código'} onPress={handleReenviarCodigoSMS} />
          )}

        </View>

      </View>

      <ModalError
        title={mensajeModal}
        titleButton={'Aceptar'}
        onPressButton={handleAceptar}
        visible={modalVisible}
      />
    </View>
  );
};

export default IngresoVerificacion;
