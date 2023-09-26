import { Linking, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import CardSimulacion from '../../../components/CardSimulacion';
import LinkMedium from '../../../components/LinkMedium';
import api from '../../../services/api';
import { useRoute } from '@react-navigation/native';
import DateConverter from '../../../utils/DateConverter';
import MoneyConverter from '../../../utils/MoneyConverter';
import { dateFormat } from '../../../utils/Format';
import MoneyFormatter from '../../../utils/MoneyFormatter';
import ModalError from '../../../components/ModalError';

const PlazoFijoPrecancelableDetalle = ({ navigation }) => {

    const {
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
    } = useRoute().params

    const hoy = new Date();

    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const hora = hoy.getHours().toString().padStart(2, '0');
    const minutos = hoy.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hora}:${minutos}`;

    const datos = [
        { title: 'N° de operación', value: operacion },
        { title: 'Cuenta', value: cuenta },
        { title: 'Interés', value: <MoneyConverter value={interes} /> },
        { title: 'Neto a liquidar', value: <MoneyConverter value={neto} /> },
        { title: 'Fecha de vencimiento', value: <DateConverter date={vencimientoAnticipado} /> },
    ];

    const handleComprobante = async () => {

        try {

            //const { data: res } = await api.get(`api/PDFComprobanteCancelacionPFUVA/RecuperarPDFComprobanteCancelacionPFUVA?NombreBanco=bmv&Fecha=23%2F09%2F2023&Hora=10:52&Titulares=JULIO+ZAPATA&Cuil=CUIL+23438790039%0D%0ATitulares:+1&TipoPlazoFijo=Plazo+fijo+UVA&Cuenta=13857101&NroCertificado=112649&Plazo_Ant=55&FechaVen_Ant=30%2F08%2F2023&Tasas_Ant=0&Capital_Ant=200000&Interes_Ant=11291.74&Imp_Ganancia_Ant=0&Netoliquido_Ant=211291.74&CAcreditar_Ant=13857012&Plazo_Ori=60&FechaVen_Ori=04%2F09%2F2023&Tasas_Ori=37.56260299682617&Capital_Ori=200000`);
            const { data: res } = await api.get(`api/PDFComprobanteCancelacionPFUVA/RecuperarPDFComprobanteCancelacionPFUVA?NombreBanco=bmv&Fecha=${fechaFormateada}&Hora=${horaFormateada}&Titulares=${nombre}&Cuil=${cuil}&TipoPlazoFijo=${nombreProducto}&Cuenta=${cuenta}&NroCertificado=${operacion}&Plazo_Ant=${plazoAnticipado}&FechaVen_Ant=${dateFormat(vencimientoAnticipado)}&Tasas_Ant=${tnaAnticipado}&Capital_Ant=${MoneyFormatter(capitalAnticipado)}&Interes_Ant=${MoneyFormatter(interes)}&Imp_Ganancia_Ant=0&Netoliquido_Ant=${MoneyFormatter(neto)}&CAcreditar_Ant=${cuentaAnticipado}&Plazo_Ori=${plazoOriginal}&FechaVen_Ori=${dateFormat(vencimientoOriginal)}&Tasas_Ori=${tnaOriginal}&Capital_Ori=${MoneyFormatter(capitalOriginal)}`);

            if (res.status === 0) {

                console.log('PDFComprobantePlazoFijo >>>', res)
                await Linking.openURL(res.url); //la función openURL() del módulo Linking se usa para abrir enlaces externos en el navegador

            } else {
                console.log('Error PDFComprobantePlazoFijo');
                setMensajeModal(res.mensajeStatus)
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
                <CardSimulacion title={'Datos de la cancelación'} data={datos} />
                <LinkMedium title={'Descargar comprobante'} onPress={handleComprobante} />
            </View>

            <ButtonFooter title={'Inicio'} onPress={() => navigation.navigate('inicioTab')} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default PlazoFijoPrecancelableDetalle;
