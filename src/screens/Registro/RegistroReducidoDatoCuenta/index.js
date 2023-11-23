import { ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import IconInput from '../../../components/IconInput';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInputButton from '../../../components/IconInputButton';
import Checkbox from '../../../components/Checkbox';
import LinkMedium from '../../../components/LinkMedium';
import ModalError from '../../../components/ModalError';
import { useRoute } from '@react-navigation/native';

const RegistroReducidoDatoCuenta = ({ navigation }) => {

    const { cuil } = useRoute().params

    const [nombreUsuario, setNombreUsuario] = useState(null)

    const handleNombreUsuario = (valor) => {
        setNombreUsuario(valor)
    }

    const [email, setEmail] = useState(null)

    const handleEmail = (valor) => {
        setEmail(valor)
    }

    const [celular, setCelular] = useState(null)

    const handleCelular = (valor) => {
        setCelular(valor)
    }

    const [contrasena, setContrasena] = useState(null)

    const handleContrasena = valor => {
        setContrasena(valor);
    };

    const [contrasenaRepetida, setContrasenaRepetida] = useState(null)

    const handleContrasenaRepetida = valor => {
        setContrasenaRepetida(valor);
    };

    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarContrasenaRepetida, setMostrarContrasenaRepetida] = useState(false);

    const handleSiguiente = () => {

        if (!nombreUsuario || !email || !celular || !contrasena || !contrasenaRepetida) {

            setMensajeModal('Todos los campos son obligatorios. Por favor, complete los datos.');
            setModalVisible(true);

        } else {

            if (contrasena === contrasenaRepetida) {
                navigation.navigate('RegistroReducidoConfirmacion', { cuil, nombreUsuario, email, celular, contrasena });
            } else {
                setMensajeModal('Las contraseñas deben coincidir.')
                setModalVisible(true)
            }

        }

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);
    const handleAceptar = () => {
        setModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >

            <ScrollView style={styles.body}>

                <IconInput
                    iconName={'account-edit-outline'}
                    placeholder={'Nombre de usuario'}
                    value={nombreUsuario}
                    onChangeText={handleNombreUsuario}
                />

                <IconInput
                    iconName={'at'}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={handleEmail}
                />

                <IconInput
                    iconName={'cellphone'}
                    placeholder={'Celular'}
                    value={celular}
                    onChangeText={handleCelular}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                />

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

            <ButtonFooter title={'Siguiente'} onPress={() => handleSiguiente()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </KeyboardAvoidingView>
    );
};

export default RegistroReducidoDatoCuenta;
