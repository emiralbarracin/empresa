import { Alert, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import ButtonFooter from '../../../components/ButtonFooter';
import api from '../../../services/api';
import ModalConfirm from '../../../components/ModalConfirm';
import LoadingIndicator from '../../../components/LoadingIndicator';
import CardDetalle from '../../../components/CardDetalle';

const PagoServicioConfirmacion = ({ navigation }) => {

    const [cargando, setCargando] = useState(false);

    const { empresa, nombre, cuit, ciudad, importe, cuentaOrigen } = useRoute().params

    const datosDestinatario = [
        { title: 'Destino', value: empresa },
        { title: 'Nombre', value: nombre },
        { title: 'CUIT', value: cuit },
        { title: 'Ciudad', value: ciudad },
    ];

    const datosPago = [
        { title: 'Cuenta origen', value: cuentaOrigen },
        { title: 'Importe a pagar', value: <MoneyConverter value={importe} /> },
    ];

    //console.log('CBUOrigen >>>', cbuOrigen)

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleConfirmar = async () => {
        setMensajeModal('¿Desea realizar el pago?')
        setModalVisible(true)
    };

    function generarNumeroDeCuatroCifras() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const numeroComprobante = generarNumeroDeCuatroCifras();

    const handleAceptar = () => {
        setModalVisible(false);
        setCargando(true);
        const obtenerDatos = async () => {
            try {
                const parametros = {
                    CodigoContrasiento: "",
                    CodigoCuenta: cuentaOrigen, //13858124,
                    CodigoMoneda: 0,
                    CodigoPuesto: 1,
                    CodigoSector: 1,
                    CodigoSistema: 5,
                    CodigoSubSistema: 0,
                    CodigoSucursal: 20,
                    CodigoSucursalOrigen: 20,
                    CodigoTerminal: 1,
                    Concepto: 17,
                    FechaMovimiento: "",
                    IdMensaje: "Sucursal Virtual",
                    Importe: importe, //"1000",
                    NumeroComprobante: numeroComprobante,
                    NumeroOperacion: 1,
                    Sistema: 5,
                    SubConcepto: 1,
                    Transaccion: "002000300",
                };
                const { data: res } = await api.post(`cuenta/debito`, parametros);
                if (res) {
                    //console.log(' CuentaDebito >>> ', JSON.stringify(res, null, 4))
                    navigation.navigate('PagoServicioDetalle', { importe, numeroComprobante });
                } else {
                    navigation.navigate('PagoServicioDetalle', { importe, numeroComprobante }); //esto porque no devuelve status la api
                    setCargando(false)
                };
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Error no especificado.';
                Alert.alert(errorMessage);
                setCargando(false);
            };
        };
        obtenerDatos();
    };

    const handleCancelar = () => setModalVisible(false);

    return (
        <View style={styles.container}>
            {cargando ? (
                <LoadingIndicator />
            ) : (
                <View style={styles.body}>
                    <CardDetalle title={'Datos del destinatario'} data={datosDestinatario} />
                    <CardDetalle title={'Datos del pago'} data={datosPago} />
                </View>
            )}
            {cargando ? (
                null
            ) : (
                <ButtonFooter title={'Confirmar'} onPress={() => handleConfirmar()} />
            )}
            <ModalConfirm
                visible={modalVisible}
                title={mensajeModal}
                titleButtonLeft={'Cancelar'}
                titleButtonRight={'Aceptar'}
                onPressButtonLeft={handleCancelar}
                onPressButtonRight={handleAceptar}
            />
        </View>
    );
};

export default PagoServicioConfirmacion;