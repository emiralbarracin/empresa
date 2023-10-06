import { Linking, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import ButtonFooter from '../../../components/ButtonFooter';
import { useRoute } from '@react-navigation/native';
import MoneyConverter from '../../../utils/MoneyConverter';
import api from '../../../services/api';
import LinkMedium from '../../../components/LinkMedium';
import { dateFormat } from '../../../utils/Format';
import colors from '../../../styles/colors';

const PlazoFijoDetalle = ({ navigation }) => {

    const { importe, monto, plazo, tea, tna, codigoCuentaDebito, vencimiento, nombreProducto, descripcionMoneda } = useRoute().params

    let interes = monto - importe

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const hora = hoy.getHours().toString().padStart(2, '0') - 3; //-3 hora arg
    const minutos = hoy.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hora}:${minutos}`;

    const datosPlazoFijo = [
        { title: 'Monto depositado', value: <MoneyConverter value={importe} /> },
        { title: 'Interés', value: <MoneyConverter value={interes} /> },
        { title: 'Total neto', value: <MoneyConverter value={monto} /> },
        { title: 'Código cuenta', value: codigoCuentaDebito },
        { title: 'Plazo', value: `${plazo} días` },
        { title: 'Vencimiento', value: dateFormat(vencimiento) },
        { title: 'TEA', value: `${tea} %` },
        { title: 'TNA', value: `${tna} %` },
    ];

    let nombreBanco = colors.entidadSeleccionada === 'BMV' ? ('bmv') : (colors.entidadSeleccionada === 'BSR' ? ('sucredito') : '')

    const handleComprobante = async () => {

        try {

            //const { data: res } = await api.get(`api/PDFComprobantePlazoFijo/RecuperarPDFComprobantePlazoFijo?NombreBanco=bmv&Fecha=24%2F07%2F2023&Hora=13:41&Operacion=Plazo+Fijo&NroCertificado=112640&TipoPlazoFijo=Plazo+Fijo+Tradicional+$&Moneda=PESOS&Capital=$+100,000.00&Plazo=60&Tasa=0.00&Interes=$+6,174.67&Fechae=06%2F07%2F2023&Fechav=04%2F09%2F2023&CuentaDebito=107932&CuentaCredito=107932&Impuesto=0&TotalNeto=$+106,174.67&RenovacionAutomatica=No`);
            const { data: res } = await api.get(`api/PDFComprobantePlazoFijo/RecuperarPDFComprobantePlazoFijo?NombreBanco=${nombreBanco}&Fecha=${fechaFormateada}&Hora=${horaFormateada}&Operacion=Plazo+Fijo&NroCertificado=112640&TipoPlazoFijo=${nombreProducto}&Moneda=${descripcionMoneda}&Capital=${importe}&Plazo=${plazo}&Tasa=${tna}&Interes=${interes}&Fechae=${fechaFormateada}&Fechav=${dateFormat(vencimiento)}&CuentaDebito=${codigoCuentaDebito}&CuentaCredito=${codigoCuentaDebito}&Impuesto=0&TotalNeto=${monto}&RenovacionAutomatica=No`);

            if (res) {

                //console.log('PDFComprobantePlazoFijo >>>', res)
                await Linking.openURL(res.url); //la función openURL() del módulo Linking se usa para abrir enlaces externos en el navegador

            } else {
                console.log('Error PDFComprobantePlazoFijo');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        }
    }


    const handleInicio = () => {
        navigation.navigate('inicioTab')
    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={nombreProducto} data={datosPlazoFijo} />

                <LinkMedium title={'Descargar comprobante'} onPress={handleComprobante} />

            </View>

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default PlazoFijoDetalle;
