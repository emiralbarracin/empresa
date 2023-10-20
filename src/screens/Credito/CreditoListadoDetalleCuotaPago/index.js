import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import MoneyConverter from '../../../utils/MoneyConverter';
import ModalConfirm from '../../../components/ModalConfirm';
import DateConverter from '../../../utils/DateConverter';
import ModalError from '../../../components/ModalError';
import api from '../../../services/api';
import LoadingIndicator from '../../../components/LoadingIndicator';

const CreditoListadoDetalleCuotaPago = ({ navigation }) => {

    const {
        numeroCuota,
        totalCuotas,
        fechaVencimiento,
        importe,
        codigoCuenta,
        codigoMoneda,
        codigoSistema,
        codigoSubSistema,
        codigoSucursal,
        numeroOperacion
    } = useRoute().params

    const [cargando, setCargando] = useState(false)

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const datosCredito = [
        { title: 'N° de cuota', value: `${numeroCuota}/${totalCuotas}` },
        { title: 'Fecha de vencimiento', value: <DateConverter date={fechaVencimiento} /> },
        /* { title: 'Saldo capital', value: <MoneyConverter value={58512} /> }, */
        { title: 'Importe cuota', value: <MoneyConverter value={importe} /> },
    ];

    const [codigoCuentaDebito, setCodigoCuentaDebito] = useState('')

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                //const { data: res } = await api.get(`api/HbConsultaCuenta/RecuperarHbConsultaCuenta?CodigoSucursal=20&Concepto=CA&IdMensaje=sucursalvirtual`);
                const { data: res } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=TODO&IdMensaje=sucursalvirtual`);

                if (res) {

                    //console.log('BEConsultaCuenta', res)
                    setCodigoCuentaDebito(res.output[0].codigoCuenta)

                } else {
                    console.log('Error BEConsultaCuenta');
                }

            } catch (error) {
                console.log('catch >>> ', error);
                return;
            }

        }

        obtenerDatos()

    }, [])

    const handlePago = () => {
        setMensajeModalConfirm('¿Está seguro/a que desea realizar el pago de la cuota?')
        setModalConfirmVisible(true)
    }

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState('');


    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }

    const handleAceptarConfirm = async () => {

        setModalConfirmVisible(false)
        setCargando(true)

        try {

            const parametros = {

                CodigoCuenta: codigoCuentaDebito, //108485,
                CodigoCuentaCredito: codigoCuenta, //13859504,
                CodigoCuentaDebito: codigoCuentaDebito, //108485,
                CodigoMoneda: codigoMoneda, //0
                CodigoPlantilla: 73,
                CodigoSistema: codigoSistema, //2
                CodigoSubSistema: codigoSubSistema, //0
                CodigoSucursal: codigoSucursal, //20
                IdMensaje: "Pago de cuota SucursalVirtual",
                Importe: importe,
                ImporteIngresado: importe,
                NumeroOperacion: 0,
                NumeroOperacionCuentaCredito: numeroOperacion, //310240,

            }

            const { data: res1 } = await api.post(`api/BECuentaOperacionCreditoPagoNormalCuota/RegistrarBECuentaOperacionCreditoPagoNormalCuota`, parametros,);

            if (res1) {

                if (res1.status === 0) {

                    //console.log('CuentaOperacionCreditoPagoNormalCuota', res1)
                    navigation.navigate('CreditoListadoDetalleCuotaPagoExitoso', { numeroCuota, totalCuotas, importe })
                    setCargando(false)

                } else {

                    setModalConfirmVisible(false)
                    setMensajeModal(res1.mensajeStatus)
                    setModalVisible(true)
                    setCargando(false)

                }

            } else {
                console.log('Error BECuentaOperacionCreditoPagoNormalCuota');
                setCargando(false)
            }

        } catch (error) {
            console.log('catch >>> ', error);
            setCargando(false)
            return;
        }
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    }


    return (
        <View style={styles.container}>

            {cargando ? (
                <LoadingIndicator />
            ) : (

                <>
                    <View style={styles.body}>

                        <CardSimulacion title={'Detalles del pago'} data={datosCredito} />

                    </View>

                    <ButtonFooter title={'Pagar'} onPress={() => handlePago()} />
                </>

            )}

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

        </View>
    );
};

export default CreditoListadoDetalleCuotaPago;