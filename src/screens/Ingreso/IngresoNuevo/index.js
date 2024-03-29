import { Alert, Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import IconInput from '../../../components/IconInput';
import LinkSmall from '../../../components/LinkSmall';
import { environment } from '../../../services/environment';
import {
  onClearStorage,
  onSetStorageToken,
  onSetStorageUser,
} from '../../../store/storage/storageToken';
import base64 from 'react-native-base64'; //codifica y decodifica cadenas de texto en formato Base64
import token from '../../../services/token';
import api from '../../../services/api';
import ModalError from '../../../components/ModalError';
import { agregarContrasenaUsuario, agregarNombreUsuario, agregarUsuario } from '../../../store/slices/usuarioSlice';
import { useDispatch } from 'react-redux';
import IconInputButton from '../../../components/IconInputButton';
import LinkMedium from '../../../components/LinkMedium'; //prueba rama emir
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoAnimation from '../../../components/LoadingAnimation';
import ButtonFooter from '../../../components/ButtonFooter';

const IngresoNuevo = ({ navigation }) => {

  const [cargandoBoton, setCargandoBoton] = useState(false)

  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  //const [usuario, setUsuario] = useState('lopezmia');
  //const [contrasena, setContrasena] = useState('Censys23*');
  //const [usuario, setUsuario] = useState('fatimat');
  //const [contrasena, setContrasena] = useState('Censys2300*');
  //const [usuario, setUsuario] = useState('albertom');
  //const [contrasena, setContrasena] = useState('Censys2300*');

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(null);

  const handleUsuario = valor => {
    setUsuario(valor);
  };

  const handleContrasena = valor => {
    setContrasena(valor);
  };

  useEffect(() => {
    onClearStorage(); //limpia el almacenamiento local
  }, []);

  const limpiarValores = () => {
    setUsuario(null);
    setContrasena(null);
  }

  const dispatch = useDispatch(); //rtk //uso la funcion dispatch del hook useDispatch para enviar/despachar una accion (agregarUsuario) al store y actualizar el estado de la app

  const loginEmailTelefono = async () => {

    //console.log('usuario >>> ', usuario);
    //console.log('contraseña >>> ', contrasena);

    if (!usuario || !contrasena) {
      setMensajeModal('Por favor ingrese el usuario y contraseña.');
      setModalVisible(true);
      return; //para salir de la funcion
    }

    try {

      setCargandoBoton(true)

      const { data: { access_token } } = await token.post('/Token', environment.payload);
      //console.log('token 1 >>> ', access_token);
      onSetStorageToken(access_token); //guarda el token en el almacenamiento local

      const { data: { userName, mensajeStatus } } = await api.get(`api/LoginEmailTelefono/RecuperarLoginEmailTelefono?InputLogin=${usuario}&HBClientePassword=${contrasena}&CodigoSucursal=20&IdMensaje=PostmanBack`);
      if (userName) {
        //console.log('userName >>> ', userName);
        onSetStorageUser(base64.encode(`${usuario}:${contrasena}`)); //codifica el nombre de usuario y la contraseña en formato Base64 y lo guarda en el almacenamiento local
        dispatch(agregarNombreUsuario(usuario)) //rtk
        dispatch(agregarContrasenaUsuario(contrasena)) //rtk
        clientePerfil();
        // navigation.navigate('IngresoVerificacion');
      } else {
        //console.log('mensajeStatus >>> ', mensajeStatus);
        setModalVisible(!modalVisible);
        setMensajeModal(mensajeStatus);
        setCargandoBoton(false)
      }

    } catch (error) {
      console.log('catch >>> ', error);
    }

  };

  let ingresoHuella = false

  const clientePerfil = async () => {

    let telefono

    try {

      const { data: { access_token } } = await token.post('/Token', environment.payload);
      //console.log('token 2 >>> ', access_token);
      onSetStorageToken(access_token);

      const { data } = await api.get(`api/BancaDigitalClientePerfil/RecuperarBancaDigitalClientePerfil?CodigoSucursal=20&IdMensaje=sucursalvirtual`);
      if (data) {
        telefono = data.output[0].telefono
        //console.log('BTClientePerfil >>> ', data);
        //console.log('output >>> ', data.output[0]);
        dispatch(agregarUsuario(data.output[0])) //rtk
        ingresoHuella ? navigation.navigate('IngresoEmpresaListado') : navigation.navigate('IngresoMetodo', { telefono })
        limpiarValores();
        setCargandoBoton(false)
      } else {
        console.log('ERROR api BTClientePerfil>>> ', data);
        setCargandoBoton(false)
      }

    } catch (error) {
      console.log('catch >>> ', error);
    }
  };

  const handleMantenimiento = () => {
    setMensajeModal('Sección en mantenimiento.')
    setModalVisible(true)
  }

  const handleAceptar = () => {
    setModalVisible(!modalVisible);
  };

  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    isSensorAvailable();
    createKeys();
  }, []);

  const isSensorAvailable = async () => {
    const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();
    if (biometryType === ReactNativeBiometrics.Biometrics) {
      //do something face id specific
    }
  };

  const createKeys = () => {
    ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
      resultObject => {
        const { publicKey } = resultObject;
        //console.log('publicKey >>>', publicKey);
        //sendPublicKeyToServer(publicKey)
      },
    );
  };

  const fingerprint = () => {

    let usuario
    let contrasena

    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';

    ReactNativeBiometrics.createSignature({
      promptMessage: 'Ingrese su huella',
      payload: payload,
    }).then(async resultObject => {
      const { success, signature } = resultObject;

      if (success) {
        console.log(signature);

        try {
          // Retrieve the credentials
          const credentials = await Keychain.getGenericPassword();
          if (credentials) {
            //console.log('Credenciales cargadas con éxito para: ' + credentials.username,);
            usuario = credentials.username
            contrasena = credentials.password

            //RTK
            const usuarioContrasena = {
              usuario: usuario,
              contrasena: contrasena
            }

            setCargandoBoton(true)

            const { data: { access_token } } = await token.post('/Token', environment.payload);
            //console.log('token 1 >>> ', access_token);
            onSetStorageToken(access_token); //guarda el token en el almacenamiento local

            const { data: { userName, mensajeStatus } } = await api.get(`api/LoginEmailTelefono/RecuperarLoginEmailTelefono?InputLogin=${usuario}&HBClientePassword=${contrasena}&CodigoSucursal=20&IdMensaje=PostmanBack`);
            if (userName) {
              //console.log('userName >>> ', userName);
              ingresoHuella = true
              onSetStorageUser(base64.encode(`${usuario}:${contrasena}`)); //codifica el nombre de usuario y la contraseña en formato Base64 y lo guarda en el almacenamiento local
              dispatch(agregarNombreUsuario(usuario)) //rtk
              dispatch(agregarContrasenaUsuario(contrasena)) //rtk
              clientePerfil();
              // navigation.navigate('IngresoVerificacion');
            } else {
              //console.log('mensajeStatus >>> ', mensajeStatus);
              setModalVisible(!modalVisible);
              setMensajeModal(mensajeStatus);
              setCargandoBoton(false)
            }

          } else {
            console.log('No hay credenciales almacenadas');
            Alert.alert(null, 'Puede configurar la huella desde su perfil.', [
              {
                title: 'Ok',
                onPress: () => {
                  // do nothing
                },
              },
            ]);
          }
        } catch (error) {
          console.log("No se pudo acceder al llavero", error);
        }
      }
    });
  };

  const [mostrarIngreso, setMostrarIngreso] = useState(false);

  const handleAnimationComplete = () => {
    setMostrarIngreso(true);  //se llama cuando la animación del logo se completa
  };

  return (

    <View style={{ flex: 1 }}>

      {!mostrarIngreso && (
        <LogoAnimation onAnimationComplete={handleAnimationComplete} />
      )}
      {mostrarIngreso && (

        <View style={styles.container}>

          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logoSucredito.png')}
              style={styles.image}
            />
          </View>

          <View style={styles.body}>

            <IconInput
              iconName={'account-outline'}
              placeholder={'Ingrese el usuario'}
              onChangeText={handleUsuario}
              value={usuario}
            />

            <IconInputButton
              iconName={'lock-outline'}
              placeholder={'Ingrese la contraseña'}
              secureTextEntry={!mostrarContrasena}
              onChangeText={handleContrasena}
              value={contrasena}
              iconNameButton={mostrarContrasena ? 'eye-outline' : 'eye-off-outline'}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            />

            <ButtonFooter title={'Ingresar'} onPress={() => loginEmailTelefono()} loading={cargandoBoton} />
            <LinkMedium title={'Registrarse'} onPress={() => navigation.navigate('RegistroInformacionPersonal')} />
            <LinkSmall title={'¿Olvidó su contraseña?'} onPress={() => handleMantenimiento()} />

            <View style={styles.containerHuella}>
              <TouchableOpacity onPress={() => fingerprint()}>
                <MaterialCommunityIcons
                  name='fingerprint'
                  style={styles.huella}
                />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: '4%' }}>
              <Image
                source={require('../../../assets/images/footerSucredito3.png')}
                style={{ resizeMode: 'contain', height: '75%', }} //aplica la escala según el valor de la animación
              />
            </View>

          </View>

          <ModalError
            visible={modalVisible}
            title={mensajeModal}
            titleButton="Aceptar"
            onPressButton={handleAceptar}
          />

        </View>

      )}

    </View>

  );
};

export default IngresoNuevo;



{/* <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null} //cuando se establece como padding a behavior, el contenido se ajustará automáticamente al aparecer el teclado agregando espacio de relleno en la parte inferior del componente para asegurarse de que los elementos no queden ocultos detrás del teclado.
    ></View> */}