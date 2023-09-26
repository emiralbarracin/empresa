import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import DateConverter from '../../../utils/DateConverter';
import MoneyConverter from '../../../utils/MoneyConverter';
import ButtonFooter from '../../../components/ButtonFooter';
import api from '../../../services/api';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useRoute } from '@react-navigation/native';
import ModalConfirm from '../../../components/ModalConfirm';
import ModalError from '../../../components/ModalError';

const PlazoFijoPrecancelableConfirmacion = ({ navigation }) => {

    const { numeroOperacion, fechaProceso, nombreProducto } = useRoute().params

    const [cargando, setCargando] = useState(true)

    const [nombre, setNombre] = useState(null)
    const [cuil, setCuil] = useState(null)
    const [cuenta, setCuenta] = useState(null)
    const [operacion, setOperacion] = useState(null)
    const [plazoAnticipado, setPlazoAnticipado] = useState(null)
    const [vencimientoAnticipado, setVencimientoAnticipado] = useState(null)
    const [tnaAnticipado, setTnaAnticipado] = useState(null)
    const [capitalAnticipado, setCapitalAnticipado] = useState(null)
    const [interes, setInteres] = useState(null)
    const [neto, setNeto] = useState(null)
    const [cuentaAnticipado, setCuentaAnticipado] = useState(null)
    const [plazoOriginal, setPlazoOriginal] = useState(null)
    const [vencimientoOriginal, setVencimientoOriginal] = useState(null)
    const [tnaOriginal, setTnaOriginal] = useState(null)
    const [capitalOriginal, setCapitalOriginal] = useState(null)

    let codigoCuenta

    useEffect(() => {

        const obtenerDatos = async () => {

            setCargando(true)

            try {

                const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=PF&IdMensaje=sucursalvirtual`);

                if (res1) {

                    //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
                    codigoCuenta = res1.output[0].codigoCuenta

                } else {
                    console.log('Error BEConsultaCuenta');
                }

                const { data: res2 } = await api.get(`api/BEpfprecancelacionuva/RecuperarBEpfprecancelacionuva?CodigoSucursal=20&CodigoSistema=4&CodigoMoneda=0&CodigoCuenta=${codigoCuenta}&NumeroOperacion=${numeroOperacion}&FechaMovimiento=${fechaProceso}&ConceptoWeb=WEB&IdMensaje=sucursalVirtual`);

                if (res2) {

                    //console.log('BEpfprecancelacionuva >>> ', JSON.stringify(res2, null, 4))
                    setNombre(res2.output[0].totalTitulares)
                    setCuil(res2.output[0].outTitulDoc)
                    setCuenta(res2.output[0].codigoCuenta)
                    setOperacion(res2.output[0].numeroOperacion)
                    setPlazoAnticipado(res2.output[0].plazoCuota)
                    setVencimientoAnticipado(res2.output[0].vencimientoActual)
                    setTnaAnticipado(res2.output[0].impajusteAct)
                    setCapitalAnticipado(res2.output[0].saldoCapital)
                    setInteres(res2.output[0].importeContableAccesorio)
                    setNeto(res2.output[0].netoLiqAnti)
                    setCuentaAnticipado(res2.output[0].codigoCuenta)
                    setPlazoOriginal(res2.output[0].plazoOriginal)
                    setVencimientoOriginal(res2.output[0].vencimientoOrigen)
                    setTnaOriginal(res2.output[0].tasa)
                    setCapitalOriginal(res2.output[0].saldoCapital)
                    setCargando(false)


                } else {
                    console.log('Error BEpfprecancelacionuva');
                    setCargando(false)
                }

            } catch (error) {
                console.log('catch >>> ', error);
                setCargando(false)
                return;
            }

        }

        obtenerDatos()

    }, [])


    const datosTitulares = [
        { title: 'Nombre/s', value: nombre },
        { title: 'CUIL', value: cuil },
        { title: 'Cuenta', value: cuenta },
        { title: 'N° operación', value: operacion },
    ];

    const datosAnticipado = [
        { title: 'Plazo', value: plazoAnticipado },
        { title: 'Vencimiento', value: <DateConverter date={vencimientoAnticipado} /> },
        { title: 'TNA', value: `${tnaAnticipado} %` },
        { title: 'Capital', value: <MoneyConverter value={capitalAnticipado} /> },
        { title: 'Interés', value: <MoneyConverter value={interes} /> },
        { title: 'Neto a liquidar', value: <MoneyConverter value={neto} /> },
        { title: 'Cuenta a acreditar', value: cuentaAnticipado },
    ];

    const datosOriginal = [
        { title: 'Plazo', value: plazoOriginal },
        { title: 'Vencimiento', value: <DateConverter date={vencimientoOriginal} /> },
        { title: 'TNA', value: `${tnaOriginal} %` },
        { title: 'Capital', value: <MoneyConverter value={capitalOriginal} /> },
    ];

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false)
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [mensajeModal, setMensajeModal] = useState('')

    const handleConfirmar = async () => {
        setMensajeModalConfirm('¿Está seguro/a que desea cancelar el plazo fijo?')
        setModalConfirmVisible(true)
    }

    const handleAceptarConfirm = async () => {

        let codigoCuenta

        const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=PF&IdMensaje=sucursalvirtual`);

        if (res1) {

            //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
            codigoCuenta = res1.output[0].codigoCuenta

        } else {
            console.log('Error BEConsultaCuenta');
            return;
        }


        let parametros = {
            CodigoCuenta: codigoCuenta,
            CodigoMoneda: 0,
            CodigoSistema: 4,
            CodigoSucursal: 20,
            ConceptoWeb: 'WEB',
            FechaMovimiento: fechaProceso,
            IdMensaje: 'sucursalVirtual',
            NumeroOperacion: numeroOperacion,
        }

        try {

            const { data: res2 } = await api.post(`api/BEpfPreCancelacion/RegistrarBEpfPreCancelacion`, parametros);

            if (res2.status === 0) {

                setModalConfirmVisible(false)
                setCargando(true)
                //console.log('BEpfPreCancelacion >>> ', res2)
                navigation.navigate('PlazoFijoPrecancelableDetalle', {
                    nombre,
                    cuil,
                    cuenta,
                    operacion,
                    plazoAnticipado,
                    vencimientoAnticipado,
                    tnaAnticipado,
                    capitalAnticipado,
                    interes,
                    neto,
                    cuentaAnticipado,
                    plazoOriginal,
                    vencimientoOriginal,
                    tnaOriginal,
                    capitalOriginal,
                    nombreProducto
                })

            } else {
                console.log('Error BEpfPreCancelacion', res2);
                setCargando(false)
                setMensajeModal(res2.mensajeStatus)
                setModalVisible(true)
            }

        } catch (error) {
            console.log('catch >>> ', error);
            setCargando(false)
            return;
        }
    }

    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }

    const handleAceptar = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            {cargando ? (

                <LoadingIndicator />

            ) : (
                <>

                    <ScrollView style={styles.body}>
                        <View onStartShouldSetResponder={() => true}>
                            <CardSimulacion title={'Titular/es'} data={datosTitulares} />
                            <CardSimulacion title={'Anticipado'} data={datosAnticipado} />
                            <CardSimulacion title={'Original'} data={datosOriginal} />
                        </View>
                    </ScrollView>

                    <ButtonFooter title={'Confirmar'} onPress={() => handleConfirmar()} />

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

export default PlazoFijoPrecancelableConfirmacion;
