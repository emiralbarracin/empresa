import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import Dropdown from '../../../components/DropDown';
import ModalError from '../../../components/ModalError';
import CardPerfil from '../../../components/CardPerfil';

const TurnoNuevo = ({ navigation }) => {

    const [motivoSeleccionado, setMotivoSeleccionado] = useState(null)
    const [atencionSeleccionada, setAtencionSeleccionada] = useState(0)

    const handleMotivoSeleccionado = (valor) => {
        setMotivoSeleccionado(valor)
    }

    const [atencionComercialSeleccionado, setAtencionComercialSeleccionado] = useState(false)
    const [atencionPorCajaSeleccionado, setAtencionPorCajaSeleccionado] = useState(false)
    const [atencionOperativaSeleccionado, setAtencionOperativaSeleccionado] = useState(false)

    const handleAtencionComercial = async () => {

        setAtencionComercialSeleccionado(true)
        setAtencionPorCajaSeleccionado(false)
        setAtencionOperativaSeleccionado(false)
        setAtencionSeleccionada(1)

        /* try {

            const { data: res } = await api.get(`api/MotivoTurno/RecuperarMotivoTurno?CodigoSucursal=20&ConceptoTurnoCod=1&IdMensaje=Sucursal+virtual+turnos`);

            if (res) {

                //console.log('MotivoTurno >>>', res)

            } else {
                console.log('Error MotivoTurno');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        } */

    }

    const handleAtencionPorCaja = async () => {

        setAtencionPorCajaSeleccionado(true)
        setAtencionComercialSeleccionado(false)
        setAtencionOperativaSeleccionado(false)
        setAtencionSeleccionada(2)

        /* try {

            const { data: res } = await api.get(`api/MotivoTurno/RecuperarMotivoTurno?CodigoSucursal=20&ConceptoTurnoCod=2&IdMensaje=Sucursal+virtual+turnos`);

            if (res) {

                //console.log('MotivoTurno >>>', res)

            } else {
                console.log('Error MotivoTurno');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        } */
    }

    const handleAtencionOperativa = async () => {

        setAtencionOperativaSeleccionado(true)
        setAtencionPorCajaSeleccionado(false)
        setAtencionComercialSeleccionado(false)
        setAtencionSeleccionada(3)

        /* try {

            const { data: res } = await api.get(`api/MotivoTurno/RecuperarMotivoTurno?CodigoSucursal=20&ConceptoTurnoCod=2&IdMensaje=Sucursal+virtual+turnos`);

            if (res) {

                //console.log('MotivoTurno >>>', res)

            } else {
                console.log('Error MotivoTurno');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        } */
    }

    const handleSolicitarTurno = () => {

        /* let atencionSeleccionada
        atencionComercialSeleccionado ? atencionSeleccionada = 1 : atencionSeleccionada = 2 */

        if (!motivoSeleccionado || atencionSeleccionada === 0) {

            setMensajeModal('Debe seleccionar el tipo de atención y motivo.')
            setModalVisible(true)

        } else {
            navigation.navigate('TurnoConfirmacion', { motivoSeleccionado, atencionSeleccionada })
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

                <CardPerfil
                    title="Atención comercial"
                    subtitle="Financiaciones, cheques, etc."
                    iconName={atencionComercialSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleAtencionComercial()}
                />

                {atencionComercialSeleccionado ? (
                    <Dropdown
                        items={[
                            { label: 'Financiaciones', value: 1 },
                            { label: 'Adquirencia', value: 2 },
                            { label: 'Cheques', value: 3 },
                            { label: 'Pago de haberes', value: 4 },
                            { label: 'Inversiones', value: 5 },
                            { label: 'Otros', value: 6 },
                        ]}
                        placeholder={'Seleccione el motivo'}
                        onSelectItem={item => handleMotivoSeleccionado(item.value)}
                        zIndex={100}
                    />
                ) : (
                    null
                )}

                <CardPerfil
                    title="Atención por caja"
                    subtitle="Depósitos, pagos o extracciones."
                    iconName={atencionPorCajaSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleAtencionPorCaja()}
                />

                {atencionPorCajaSeleccionado ? (
                    <Dropdown
                        items={[
                            { label: 'Realizar un Deposito o pago', value: 1 },
                            { label: 'Realizar una extraccion', value: 2 },
                        ]}
                        placeholder={'Seleccione el motivo'}
                        onSelectItem={item => handleMotivoSeleccionado(item.value)}
                        zIndex={100}
                    />
                ) : (
                    null
                )}

                <CardPerfil
                    title="Atención operativa"
                    subtitle="Retiro de token, claves, etc."
                    iconName={atencionOperativaSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleAtencionOperativa()}
                />

                {atencionOperativaSeleccionado ? (
                    <Dropdown
                        items={[
                            { label: 'Retiro de token', value: 1 },
                            { label: 'Claves', value: 2 },
                            { label: 'Certificado de plazos fijos', value: 3 },
                            { label: 'Entrega de documentación', value: 4 },
                            { label: 'Acceso a cajas de seguridad, Pago a proveedores', value: 5 },
                        ]}
                        placeholder={'Seleccione el motivo'}
                        onSelectItem={item => handleMotivoSeleccionado(item.value)}
                        zIndex={100}
                    />
                ) : (
                    null
                )}

            </View>

            <ButtonFooter title={'Solicitar turno'} onPress={() => handleSolicitarTurno()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default TurnoNuevo;
