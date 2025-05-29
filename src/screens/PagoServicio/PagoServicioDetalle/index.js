import { Alert, View } from 'react-native';
import React from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import api from '../../../services/api';
import LinkMedium from '../../../components/LinkMedium';
import MoneyConverter from '../../../utils/MoneyConverter';
import CardDetalle from '../../../components/CardDetalle';
import useDescargarComprobante from '../../../hooks/useDescargarComprobante';
import MoneyFormatterComprobante from '../../../utils/MoneyFormatterComprobante';

const PagoServicioDetalle = ({ navigation }) => {

    const { descargarComprobante, error } = useDescargarComprobante();
    const { importe, numeroComprobante } = useRoute().params;

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; // los meses van de 0 a 11, por lo que sumo 1 para obtener el mes actual
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0'); // agrega un 0 adelante en los meses de 1 a 9 // 2 (indico que quiero que la cadena tenga una longitud de 2 caracteres) 0 (indico que quiero llenar los espacios restantes con el caracter 0)
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    function obtenerFechaConFormatoAPI() {
        const hoy = new Date();
        const dia = hoy.getDate().toString().padStart(2, '0');
        const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
        const anio = hoy.getFullYear();
        return `${dia}%2F${mes}%2F${anio}`;
    };
    const fechaFormateadaAPI = obtenerFechaConFormatoAPI();

    const hora = hoy.getHours().toString().padStart(2, '0');
    const minutos = hoy.getMinutes().toString().padStart(2, '0');
    const horaFormateadaAPI = `${hora}:${minutos}`;

    const datos = [
        { title: 'N° de comprobante', value: numeroComprobante },
        { title: 'Fecha de operación', value: fechaFormateada },
        { title: 'Importe', value: <MoneyConverter value={importe} /> },
    ];

    const nombreBanco = 'piano';

    const verComprobante = async () => {
        try {
            const { data: res } = await api.get(`comprobante/pago/servicio?NombreBanco=${nombreBanco}&Importe=${MoneyFormatterComprobante(importe)}&Empresa=${'YaPago'}&Identificacion=Cod+Pago+Servicio&MediodePago=069-239386%2F1+Cuenta+Unica&NroControl=${'0939'}&Cod_Comprobante=${numeroComprobante}&Fecha=${fechaFormateadaAPI}&Hora=${horaFormateadaAPI}&Operacion=Pago+de+servicios`,);
            if (res) {
                const base64PDF = res.archivoBase64;
                const nombreArchivo = res.nombreArchivo || 'comprobante.pdf';
                await descargarComprobante(base64PDF, nombreArchivo);
                console.log('PDFComprobantePagoServicio >>>', res)
            } else {
                console.log('Error PDFComprobantePagoServicio');
            };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error no especificado.';
            Alert.alert(errorMessage);
            return;
        };
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <CardDetalle title={'Datos del pago'} data={datos} />
                <LinkMedium title={'Descargar comprobante'} onPress={verComprobante} />
            </View>
            <ButtonFooter title={'Ir al inicio'} onPress={() => navigation.navigate('InicioTab')} />
        </View>
    );
};

export default PagoServicioDetalle;