import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInputButton from '../../../components/IconInputButton';
import ModalConfirm from '../../../components/ModalConfirm';
import ModalError from '../../../components/ModalError';
import { onClearStorage } from '../../../store/storage/storageToken';

const UsuarioCambioContrasena = ({ navigation }) => {

    const [contrasenaActual, setContrasenaActual] = useState(null);
    const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false);
    const handleContrasenaActual = valor => {
        setContrasenaActual(valor);
    };

    const [contrasenaNueva, setContrasenaNueva] = useState(null);
    const [mostrarContrasenaNueva, setMostrarContrasenaNueva] = useState(false);
    const handleContrasenaNueva = valor => {
        setContrasenaNueva(valor);
    };

    const [contrasenaNuevaRepetida, setContrasenaNuevaRepetida] = useState(null);
    const [mostrarContrasenaNuevaRepetida, setMostrarContrasenaNuevaRepetida] = useState(false);
    const handleContrasenaNuevaRepetida = valor => {
        setContrasenaNuevaRepetida(valor);
    };


    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState(null);

    const handleConfirmarNuevaContraseña = () => {

        setMensajeModalConfirm('¿Está seguro/a de cambiar la contraseña?')
        setModalConfirmVisible(true)

    };

    const handleAceptarConfirm = () => {

        const obtenerDatos = async () => {

            setModalConfirmVisible(false)

            try {

                if (contrasenaNueva === contrasenaNuevaRepetida) {

                    let parametros = {
                        CodigoSucursal: 20,
                        HBClientePassword: contrasenaActual,
                        IdMensaje: "Sucursal Virtual Webapp",
                        PasswordNuevo: contrasenaNueva,
                    }

                    const { data: res1 } = await api.post(`api/CambioPasswordUsuario/EjecutarCambioPasswordUsuario`, parametros);

                    if (res1.status === 0) {

                        //console.log('CambioPasswordUsuario >>>', JSON.stringify(res1, null, 4))
                        setMensajeModalInicio('¡La contraseña fue modificada con éxito! Por favor inicie sesión nuevamente.')
                        setModalInicioVisible(true)

                    } else {
                        console.log('ERROR CambioPasswordUsuario');
                        setMensajeModal(res1.mensajeStatus)
                        setModalVisible(true)
                    }

                } else {

                    setMensajeModal('La nueva contraseña y su repetición deben coincidir.')
                    setModalVisible(true)

                }

            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();

    };

    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    const [modalInicioVisible, setModalInicioVisible] = useState(false);
    const [mensajeModalInicio, setMensajeModalInicio] = useState(null);

    const handleAceptarInicio = () => {
        onClearStorage() //elimina datos almacenados en el almacenamiento local
        navigation.navigate('IngresoNuevo')
    };

    return (
        <View style={styles.container}>

            <View style={styles.body}>


                <IconInputButton
                    iconName={'lock-outline'}
                    placeholder={'Contraseña actual '}
                    secureTextEntry={!mostrarContrasenaActual}
                    onChangeText={handleContrasenaActual}
                    value={contrasenaActual}
                    iconNameButton={mostrarContrasenaActual ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => setMostrarContrasenaActual(!mostrarContrasenaActual)}
                />
                <IconInputButton
                    iconName={'lock-outline'}
                    placeholder={'Nueva contraseña'}
                    secureTextEntry={!mostrarContrasenaNueva}
                    onChangeText={handleContrasenaNueva}
                    value={contrasenaNueva}
                    iconNameButton={mostrarContrasenaNueva ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => setMostrarContrasenaNueva(!mostrarContrasenaNueva)}
                />
                <IconInputButton
                    iconName={'lock-outline'}
                    placeholder={'Repetir nueva contraseña'}
                    secureTextEntry={!mostrarContrasenaNuevaRepetida}
                    onChangeText={handleContrasenaNuevaRepetida}
                    value={contrasenaNuevaRepetida}
                    iconNameButton={mostrarContrasenaNuevaRepetida ? 'eye-outline' : 'eye-off-outline'}
                    onPress={() => setMostrarContrasenaNuevaRepetida(!mostrarContrasenaNuevaRepetida)}
                />

            </View>

            <ButtonFooter title={'Confirmar nueva contraseña'} onPress={() => handleConfirmarNuevaContraseña()} />

            <ModalConfirm
                visible={modalConfirmVisible}
                title={mensajeModalConfirm}
                titleButtonLeft={'Cancelar'}
                titleButtonRight={'Aceptar'}
                onPressButtonLeft={handleCancelarConfirm}
                onPressButtonRight={handleAceptarConfirm}
            />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

            <ModalError
                visible={modalInicioVisible}
                title={mensajeModalInicio}
                titleButton="Iniciar sesión"
                onPressButton={handleAceptarInicio}
            />

        </View>
    );
};

export default UsuarioCambioContrasena;
