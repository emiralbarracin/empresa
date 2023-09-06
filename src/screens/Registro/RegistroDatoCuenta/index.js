import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import IconInput from '../../../components/IconInput';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInputButton from '../../../components/IconInputButton';
import Checkbox from '../../../components/Checkbox';
import LinkMedium from '../../../components/LinkMedium';

const RegistroDatoCuenta = ({ navigation }) => {


    /* useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res1 } = await api.get(``);
                if (res1) {

                    console.log(' >>> ', JSON.stringify(res1.output, null, 4))

                } else {
                    console.log('ERROR ');
                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []); */

    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [contrasena, setContrasena] = useState(null);

    const handleContrasena = valor => {
        setContrasena(valor);
    };

    const [mostrarContrasenaRepetida, setMostrarContrasenaRepetida] = useState(false);
    const [contrasenaRepetida, setContrasenaRepetida] = useState(null);

    const handleContrasenaRepetida = valor => {
        setContrasenaRepetida(valor);
    };

    return (
        <View style={styles.container}>

            <ScrollView style={styles.body}>

                <IconInput iconName={'account-edit-outline'} placeholder={'Nombre de usuario'} />
                <IconInput iconName={'at'} placeholder={'Email'} />
                <IconInput iconName={'cellphone'} placeholder={'Celular'} />
                <IconInputButton
                    iconName={'lock-outline'}
                    placeholder={'Contraseña'}
                    secureTextEntry={!mostrarContrasena}
                    onChangeText={handleContrasena}
                    value={contrasena}
                    iconNameButton={mostrarContrasena ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => setMostrarContrasena(!mostrarContrasena)}
                />
                <IconInputButton
                    iconName={'lock-outline'}
                    placeholder={'Repita la contraseña'}
                    secureTextEntry={!mostrarContrasenaRepetida}
                    onChangeText={handleContrasenaRepetida}
                    value={contrasenaRepetida}
                    iconNameButton={mostrarContrasenaRepetida ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => setMostrarContrasenaRepetida(!mostrarContrasenaRepetida)}
                />

                <Checkbox title={'Quiero recibir mi tarjeta de débito'} />
                <Checkbox title={'Acepto el'} link={'Contrato'} onPress={() => navigation.navigate('LegalContrato')} />
                <Checkbox title={'Acepto los'} link={'Términos y Condiciones'} onPress={() => navigation.navigate('LegalTerminoYCondicion')} />

            </ScrollView>

            <ButtonFooter title={'Siguiente'} onPress={() => navigation.navigate('RegistroConfirmacion')} />

        </View>
    );
};

export default RegistroDatoCuenta;
