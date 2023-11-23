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
                Alert.alert(null, '¡Su huella fue configurada con éxito!', [
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
                        title="Configurar huella"
                        subtitle="Modificar la huella para el ingreso"
                        iconName="fingerprint"
                        onPress={() => handleEnableBiometrics()}
                    />
                    {/* <CardPerfil
                        title="Configurar PIN"
                        subtitle="Método de ingreso"
                        iconName="dialpad"
                    /> */}

                </View>

            </View>
        </>
    );
};

export default Perfil;