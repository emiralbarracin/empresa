import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import CardSimulacion from '../../../components/CardSimulacion';
import ButtonFooter from '../../../components/ButtonFooter';
import api from '../../../services/api';
import ModalConfirm from '../../../components/ModalConfirm';
import ModalError from '../../../components/ModalError';
import LoadingIndicator from '../../../components/LoadingIndicator';

const TransferenciaConfirmacion = ({ navigation }) => {

    const [cargando, setCargando] = useState(false);

    const { cbuDestino, nombre, cuil, bancoDestino, importe, cbuOrigen, cuentaOrigen } = useRoute().params

    const datosTransferencia = [
        { title: 'CVU/CBU origen', value: cbuOrigen },
        { title: 'CVU/CBU destino', value: cbuDestino },
        { title: 'Destinatario', value: nombre },
        { title: 'CUIL destinatario', value: cuil },
        { title: 'Banco destino', value: bancoDestino },
        { title: 'Importe a transferir', value: <MoneyConverter value={importe} /> },
    ];

    //console.log('CBUOrigen >>>', cbuOrigen)

    const [modalVisibleConfirm, setModalConfirmVisible] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState(null);

    const handleConfirmar = async () => {
        setMensajeModalConfirm('¿Está seguro/a que desea realizar la transferencia?')
        setModalConfirmVisible(true)
    };

    const handleAceptarConfirm = () => {

        setModalConfirmVisible(false)
        setCargando(true)

        const obtenerDatos = async () => {

            try {

                const parametros = {
                    CBUDestino: cbuDestino,
                    CBUOrigen: cbuOrigen,
                    CodigoPlantilla: 74,
                    CodigoSucursal: 20,
                    EsMismoTitular: false,
                    IdMensaje: "Sucursal Virtual WebApp",
                    Importe: importe,
                    Moneda: "ARS",
                    Motivo: "VAR",
                    Referencia: "",
                }

                const { data: res } = await api.post(`api/OrqBETransferencias/RegistrarOrqBETransferencias`, parametros);

                if (res.status === 0) {

                    //console.log(' OrqTransferencias >>> ', JSON.stringify(res, null, 4))
                    let numeroOperacion = res.numeroReferenciaBancaria
                    let fechaOperacion = res.fechaOperacion
                    navigation.navigate('TransferenciaDetalle', { numeroOperacion, fechaOperacion, importe, nombre, cbuDestino, cuil, cuentaOrigen })

                } else {
                    setMensajeModal(res.mensajeStatus)
                    setModalVisible(true)
                    console.log('ERROR ');
                    setCargando(false)
                }

            } catch (error) {
                console.log('catch >>> ', error);
                setCargando(false)
            }
        };

        obtenerDatos();
    }

    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            {cargando ? (
                <LoadingIndicator />
            ) : (

                <ScrollView style={styles.body}>

                    <CardSimulacion title={'Datos de la transferencia'} data={datosTransferencia} />

                </ScrollView>

            )}

            {cargando ? (
                null
            ) : (
                <ButtonFooter title={'Confirmar'} onPress={() => handleConfirmar()} />
            )}

            <ModalConfirm
                visible={modalVisibleConfirm}
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

        </View>
    );
};

export default TransferenciaConfirmacion;
