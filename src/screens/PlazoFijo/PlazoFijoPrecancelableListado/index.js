import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import TableMedium from '../../../components/TableMedium';
import api from '../../../services/api';
import DateConverter from '../../../utils/DateConverter';
import TitleSmall from '../../../components/TitleSmall';
import ModalError from '../../../components/ModalError';
import LinkSmall from '../../../components/LinkSmall';

const PlazoFijoPrecancelableListado = ({ navigation }) => {

    const [tablaPrecancelables, setTablaPrecancelables] = useState([])

    let codigoCuenta

    useEffect(() => {

        const obtenerDatos = async () => {

            const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=PF&IdMensaje=sucursalvirtual`);

            if (res1) {

                //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
                codigoCuenta = res1.output[0].codigoCuenta
                console.log('codigoCuenta >>> ', codigoCuenta)

            } else {
                console.log('Error HbConsultaCuenta');
            }

            try {

                const { data: res2 } = await api.get(`api/BEpfOperaCancel/RecuperarBEpfOperaCancel?CodigoSucursal=20&CodigoSistema=4&CodigoMoneda=0&CodigoCuenta=${codigoCuenta}&IdMensaje=sucursalVirtual`);

                if (res2) {

                    //console.log('BEpfOperaCancel >>> ', JSON.stringify(res2.output, null, 4))

                    const datosPrecancelables = res2.output;
                    setTablaPrecancelables(datosPrecancelables)

                } else {
                    console.log('Error BEpfOperaCancel');
                }

            } catch (error) {
                console.log('catch >>> ', error);
                return;
            }

        }

        obtenerDatos()

    }, [])

    const titulosTablaSimulacion = ['N° op.', 'Tipo', 'Origen', 'Vto.', '']
    const datosTablaSimulacion = tablaPrecancelables.map((item) => [
        <TitleSmall title={item.numeroOperacion} />,
        <TitleSmall title={item.nombreProducto} />,
        <TitleSmall title={<DateConverter date={item.fechaOrigen} />} />,
        <TitleSmall title={<DateConverter date={item.fechaVencimiento} />} />,
        <LinkSmall title={'Cancelar'} onPress={() => handleCancelar(item)} />,
    ])

    const handleCancelar = async (item) => {

        let numeroOperacion = item.numeroOperacion
        let fechaProceso = item.fechaProceso
        let nombreProducto

        try {

            const { data: res1 } = await api.get(`api/BEConsultaCuenta/RecuperarBEConsultaCuenta?CodigoSucursal=20&Concepto=PF&IdMensaje=sucursalvirtual`);

            if (res1) {

                //console.log('BEConsultaCuenta >>> ', JSON.stringify(res1.output, null, 4))
                codigoCuenta = res1.output[0].codigoCuenta

            } else {
                console.log('Error BEConsultaCuenta');
            }

            const { data: res2 } = await api.get(`api/BEpfprecancelacionuva/RecuperarBEpfprecancelacionuva?CodigoSucursal=20&CodigoSistema=4&CodigoMoneda=0&CodigoCuenta=${codigoCuenta}&NumeroOperacion=${numeroOperacion}&FechaMovimiento=${fechaProceso}&ConceptoWeb=WEB&IdMensaje=sucursalVirtual`);

            if (res2.status === 0) {

                console.log('BEpfprecancelacionuva >>> ', JSON.stringify(res2.output, null, 4))
                nombreProducto = res2.output[0].nombreProducto
                navigation.navigate('PlazoFijoPrecancelableConfirmacion', { numeroOperacion, fechaProceso, nombreProducto })

            } else {
                console.log('Error BEpfprecancelacionuva');
                setMensajeModal(res2.mensajeStatus)
                setModalVisible(true)
            }


        } catch (error) {
            console.log('catch >>> ', error);
            return;
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

                <ScrollView>
                    <View onStartShouldSetResponder={() => true}>
                        <TableMedium headers={titulosTablaSimulacion} data={datosTablaSimulacion} />
                    </View>
                </ScrollView>

            </View>

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default PlazoFijoPrecancelableListado;
