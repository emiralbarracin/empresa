import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import TableMedium from '../../../components/TableMedium';
import api from '../../../services/api';
import DateConverter from '../../../utils/DateConverter';
import TitleSmall from '../../../components/TitleSmall';
import ModalError from '../../../components/ModalError';
import LinkSmall from '../../../components/LinkSmall';
import TitleMedium from '../../../components/TitleMedium';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import LoadingIndicator from '../../../components/LoadingIndicator';

const CreditoListadoDetalleCuota = ({ navigation }) => {

    const { numeroOperacionCredito, codigoCuentaCredito, codigoMonedaCredito, codigoSucursalCredito } = useRoute().params

    const [cargando, setCargando] = useState(true)

    const [tablaCuotas, setTablaCuotas] = useState([])
    const [operacion, setOperacion] = useState('')
    const [codigoCuenta, setCodigoCuenta] = useState('')
    const [codigoMoneda, setCodigoMoneda] = useState('')
    const [codigoSistema, setCodigoSistema] = useState('')
    const [codigoSubSistema, setCodigoSubSistema] = useState('')
    const [codigoSucursal, setCodigoSucursal] = useState('')
    const [numeroOperacion, setNumeroOperacion] = useState('')

    useEffect(() => {

        const obtenerDatos = async () => {

            try {

                const { data: res } = await api.get(`api/BEConsultaCuotasCredito/RecuperarBEConsultaCuotasCredito?CodigoSucursal=${codigoSucursalCredito}&CodigoMoneda=${codigoMonedaCredito}&CodigoCuenta=${codigoCuentaCredito}&NumeroOperacion=${numeroOperacionCredito}&FechaAjuste=&IdMensaje=SucursalVirtual`);

                if (res) {

                    //console.log('BEConsultaCuotasCredito >>> ', JSON.stringify(res.output, null, 4))
                    setTablaCuotas(res.output)
                    setOperacion(res.output[0].numeroOperacion)
                    setCodigoCuenta(res.output[0].codigoCuenta)
                    setCodigoMoneda(res.output[0].codigoMoneda)
                    setCodigoSistema(res.output[0].codigoSistema)
                    setCodigoSubSistema(res.output[0].codigoSubSistema)
                    setCodigoSucursal(res.output[0].codigoSucursal)
                    setNumeroOperacion(res.output[0].numeroOperacion)
                    setCargando(false)

                } else {
                    console.log('Error BEConsultaCuotasCredito');
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

    const titulosTablaCuotas = ['N° cuota', 'Vencimiento', 'Saldo', '']

    const datosTablaCuotas = tablaCuotas.map((item) => {

        const numeroCuota = <TitleSmall title={item.numeroCuota} />;
        const fechaVencimiento = <TitleSmall title={<DateConverter date={item.fechaVencimiento} />} />;
        const saldo = <TitleSmall title={<MoneyConverter value={item.saldo} />} />;
        const pagarLink = item.descripcionPago === 'Impaga' ?
            (<LinkSmall title={'Pagar'} onPress={() => handlePagar(item)} />) :
            (<TitleSmall title={'Pagada'} />);

        return [numeroCuota, fechaVencimiento, saldo, pagarLink];
    });

    let numeroCuota
    let totalCuotas
    let fechaVencimiento
    let importe

    const handlePagar = async (item) => {

        //console.log('item ', item)

        numeroCuota = item.numeroCuota
        totalCuotas = item.totalCuotas
        fechaVencimiento = item.fechaVencimiento
        importe = item.importe

        navigation.navigate('CreditoListadoDetalleCuotaPago', {
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
        })

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

                <View style={styles.body}>

                    <TitleMedium title={`N° operación: ${operacion}`} />

                    <ScrollView>
                        <View onStartShouldSetResponder={() => true}>
                            <TableMedium headers={titulosTablaCuotas} data={datosTablaCuotas} />
                        </View>
                    </ScrollView>

                </View>

            )}

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default CreditoListadoDetalleCuota;
