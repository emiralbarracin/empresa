import { Linking, View } from 'react-native';
import React from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import CardSimulacion from '../../../components/CardSimulacion';
import api from '../../../services/api';
import LinkMedium from '../../../components/LinkMedium';
import colors from '../../../styles/colors';
import MoneyFormatter from '../../../utils/MoneyFormatter';

const TransferenciaDetalle = ({ navigation }) => {

    const { numeroOperacion, fechaOperacion, importe, nombre, cbuDestino, cuil, cuentaOrigen } = useRoute().params

    const hoy = new Date();

    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; // los meses van de 0 a 11, por lo que sumo 1 para obtener el mes actual
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0'); // agrega un 0 adelante en los meses de 1 a 9 // 2 (indico que quiero que la cadena tenga una longitud de 2 caracteres) 0 (indico que quiero llenar los espacios restantes con el caracter 0)
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const hora = hoy.getHours().toString().padStart(2, '0');
    const minutos = hoy.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hora}:${minutos}`;

    const datos = [
        { title: 'N° de operación', value: numeroOperacion },
        { title: 'Fecha de operación', value: fechaFormateada },
    ];

    let nombreBanco = colors.entidadSeleccionada === 'BMV' ? ('bmv') : (colors.entidadSeleccionada === 'BSR' ? ('sucredito') : '')

    const handleComprobante = async () => {

        try {

            //const { data: res } = await api.get(`api/PDFComprobanteTransferencia/RecuperarPDFComprobanteTransferencia?NombreBanco=bmv&Cod_Comprobante=1234567890&Importe_Debitado=$10000&CBU_CVU_Beneficiario=0650020702000138395016&CUIT_CUIL_CDI_DNI_Beneficiario=2322789567&Titular_Cta_Destino=PEREZ,+PIA&Cta_Debito=107932&Referencia=VAR&Concepto=OTROS&Plazo_de_Acreditacion=Inmediato&Fecha=24%2F07%2F2023&Numero_de_Comprobante=1234567890&Hora=13:37&Operacion=Transferencia`);
            const { data: res } = await api.get(`api/PDFComprobanteTransferencia/RecuperarPDFComprobanteTransferencia?NombreBanco=${nombreBanco}&Cod_Comprobante=1234567890&Importe_Debitado=${MoneyFormatter(importe)}&CBU_CVU_Beneficiario=${cbuDestino}&CUIT_CUIL_CDI_DNI_Beneficiario=${cuil}&Titular_Cta_Destino=${nombre}&Cta_Debito=${cuentaOrigen}&Referencia=VAR&Concepto=OTROS&Plazo_de_Acreditacion=Inmediato&Fecha=${fechaFormateada}&Numero_de_Comprobante=1234567890&Hora=${horaFormateada}&Operacion=Transferencia`);

            if (res) {

                //console.log('PDFComprobanteTransferencia >>>', res)
                await Linking.openURL(res.url); //la función openURL() del módulo Linking se usa para abrir enlaces externos en el navegador

            } else {
                console.log('Error PDFComprobanteTransferencia');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={'Datos de la transferencia'} data={datos} />

                <LinkMedium title={'Descargar comprobante'} onPress={handleComprobante} />

            </View>

            <ButtonFooter title={'Inicio'} onPress={() => navigation.navigate('inicioTab')} />

        </View>
    );
};

export default TransferenciaDetalle;
