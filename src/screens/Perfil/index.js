import { Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import CardPerfil from '../../components/CardPerfil';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import * as Keychain from 'react-native-keychain';

const Perfil = ({ navigation }) => {

    const userName = 'lopezmia';
    const userPass = 'Censys23*';

    useEffect(() => {
        isSensorAvailable();
        //console.log('LOGINSTATE ::::', JSON.stringify(loginState, null, 3));
        //console.log('VER PEFIL ::::::>', JSON.stringify(loginState.clientePerfil.output[0].imagenFoto, null, 3));
    }, []);

    const isSensorAvailable = async () => {
        const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();
        if (biometryType === ReactNativeBiometrics.Biometrics) {
            //do something face id specific
            console.log('IsSensorAvailble');
            setTouch(true);
        }
    };

    const handleEnableBiometrics = async () => {
        console.log(`${userName} - ${userPass}`);
        await Keychain.setGenericPassword(userName, userPass);

        ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
            resultObject => {
                const { publicKey } = resultObject;
                console.log(publicKey);
                Alert.alert(null, 'Tu huella fue configurada con exito.', [
                    {
                        title: 'Ok',
                        onPress: () => {
                            // do nothing
                        },
                    },
                ]);
                //sendPublicKeyToServer(publicKey)
            },
        );
    };

    /* const userName = 'lopezmia';
     const userPass = 'Censys23*';
 
     const [touchSupported, setTouchSupported] = useState(false); // Agrega un estado para verificar si TouchID es compatible
 
     useEffect(() => {
         isSensorAvailable();
     }, []);
 
     const rnBiometrics = new ReactNativeBiometrics();
 
     const isSensorAvailable = async () => {
         const { available, biometryType } = await rnBiometrics.isSensorAvailable();
         if (available) {
             if (biometryType === BiometryTypes.TouchID) {
                 console.log('TouchID is supported');
                 setTouchSupported(true); // Establece el estado como verdadero si TouchID es compatible
             } else if (biometryType === BiometryTypes.FaceID) {
                 console.log('FaceID is supported');
                 setTouchSupported(true); // Establece el estado como verdadero si FaceID es compatible
             }
         } else {
             console.log('Biometrics not supported');
         }
     };
 
     const handleEnableBiometrics = async () => {
         console.log(`${userName} - ${userPass}`);
         await Keychain.setGenericPassword(userName, userPass);
 
         if (touchSupported) {
             rnBiometrics
                 .createKeys()
                 .then((resultObject) => {
                     const { publicKey } = resultObject;
                     console.log(publicKey);
                     sendPublicKeyToServer(publicKey);
                 })
                 .catch((error) => {
                     console.error('Error creating keys:', error);
                 });
         } else {
             Alert.alert('Biometrics not supported', 'La autenticación biométrica no es compatible con este dispositivo.');
         }
     };
 
     // Define una función para enviar la clave pública al servidor
     const sendPublicKeyToServer = (publicKey) => {
         // Aquí debes implementar el código para enviar la clave pública al servidor
         // Puedes hacer una solicitud HTTP o realizar cualquier otra acción necesaria
         // para que el servidor registre la clave pública asociada al usuario.
     };
 
     */
    /* const userName = 'lopezmia'
    const userPass = 'Censys23*'

    useEffect(() => {
        isSensorAvailable();
        //console.log('LOGINSTATE ::::', JSON.stringify(loginState, null, 3));
        //console.log('VER PEFIL ::::::>', JSON.stringify(loginState.clientePerfil.output[0].imagenFoto, null, 3));
    }, []);

    const rnBiometrics = new ReactNativeBiometrics()

    const isSensorAvailable = async () => {
        const { biometryType } = await rnBiometrics.isSensorAvailable()
        if (biometryType === BiometryTypes.TouchID) {
            //do something face id specific
            console.log('IsSensorAvailble');
            setTouch(true);
        }
    };

    const handleEnableBiometrics = async () => {
        console.log(`${userName} - ${userPass}`);
        await Keychain.setGenericPassword(userName, userPass);


        rnBiometrics.isSensorAvailable()
            .then((resultObject) => {
                const { available, biometryType } = resultObject

                if (available && biometryType === BiometryTypes.TouchID) {
                    console.log('TouchID is supported')
                } else if (available && biometryType === BiometryTypes.FaceID) {
                    console.log('FaceID is supported')
                } else if (available && biometryType === BiometryTypes.Biometrics) {
                    console.log('Biometrics is supported')
                } else {
                    console.log('Biometrics not supported')
                }
            })

        rnBiometrics.createKeys()
            .then((resultObject) => {
                const { publicKey } = resultObject
                console.log(publicKey)
                sendPublicKeyToServer(publicKey)
            })
    };
 */


    /* const rnBiometrics = new ReactNativeBiometrics()

    const isSensorAvailable = async () => {

        const { biometryType } = await rnBiometrics.isSensorAvailable() 
        if (biometryType === BiometryTypes.TouchID) {
            console.log('IsSensorAvailble >>>>>>>>>>>>');
        }

    };


    const handleEnableBiometrics = async () => {

        console.log(`${userName} - ${userPass}`);
        await Keychain.setGenericPassword(userName, userPass);


        rnBiometrics.isSensorAvailable()
            .then((resultObject) => {
                const { available, biometryType } = resultObject

                if (available && biometryType === BiometryTypes.TouchID) {
                    console.log('TouchID is supported')
                } else if (biometryType === BiometryTypes.FaceID) {
                    console.log('FaceID is supported')
                } else if (available && biometryType === BiometryTypes.Biometrics) {
                    console.log('Biometrics is supported')
                } else {
                    console.log('Biometrics not supported')
                }
            })

    };
 */


    return (
        <>
            <View style={styles.container}>

                <View style={styles.body}>

                    <CardPerfil
                        title="Ver perfil"
                        subtitle="Información del perfil"
                        iconName="account"
                        onPress={() => { navigation.navigate('UsuarioInformacionPerfil') }}
                    />
                    <CardPerfil
                        title="Cambiar contraseña"
                        subtitle="Su contraseña vence en 79 días"
                        iconName="form-textbox-password"
                        onPress={() => { navigation.navigate('UsuarioCambioContrasena') }}
                    />
                    <CardPerfil
                        title="Configurar PIN"
                        subtitle="Modificar el PIN para el ingreso"
                        iconName="dialpad"
                    />
                    <CardPerfil
                        title="Configurar huella"
                        subtitle="Modificar la huella para el ingreso"
                        iconName="fingerprint"
                        onPress={() => handleEnableBiometrics()}
                    />

                </View>

            </View>
        </>
    );
};

export default Perfil;