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
import MoneyFormatterComprobante from '../../../utils/MoneyFormatterComprobante';

const CreditoDetalle = ({ navigation }) => {

    const { numeroOperacion, fechaLiquidacion, codigoSolicitud, importe, cantidadCuotas, codigoCuentaAcreditacion, tna, tea, cft, primerVencimiento, importePrimeraCuota, importeGastos } = useRoute().params

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mesFormateado}/${anio}`;

    const hora = hoy.getHours().toString().padStart(2, '0') - 3; //-3 hora arg
    const minutos = hoy.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hora}:${minutos}`;

    const datosCredito = [
        { title: 'N° de operación', value: numeroOperacion },
        { title: 'Fecha de liquidación', value: fechaFormateada },
        { title: 'Importe acreditado', value: <MoneyConverter value={importe} /> },
        { title: 'Cantidad de cuotas', value: cantidadCuotas },
    ];

    let nombreBanco = colors.entidadSeleccionada === 'BMV' ? ('bmv') : (colors.entidadSeleccionada === 'BSR' ? ('sucredito') : '')

    const handleComprobante = async () => {

        try {

            //const { data: res } = await api.get(`api/PDFComprobanteCredito/RecuperarPDFComprobanteCredito?NombreBanco=bmv&Cod_Comprobante=250336&Importe_Prestamo=100,000.00&Gastos_Otorgados=371.91&Cuenta_Destino=107932&Cantidad_Cuotas=3&Destino_fondos=107932&Sistema_Amortizaci%C3%B3n=Sistema+Franc%C3%A9s&Importe_Primera_Cuota=$+43,743.87&Importe_Cuota_Promedio=$+42,432.16&Fecha_Primer_Vto=07%2F08%2F2023&Tasa_TNA=105.00&Tasa_TEA=173.78&CFT=407.28&Fecha=24%2F07%2F2023&Hora=13:39&Operacion=Credito&CodigoDeOperacion=310064`);
            const { data: res } = await api.get(`api/PDFComprobanteCredito/RecuperarPDFComprobanteCredito?NombreBanco=${nombreBanco}&Cod_Comprobante=${codigoSolicitud}&Importe_Prestamo=${MoneyFormatterComprobante(importe)}&Gastos_Otorgados=${MoneyFormatterComprobante(importeGastos)}&Cuenta_Destino=${codigoCuentaAcreditacion}&Cantidad_Cuotas=${cantidadCuotas}&Destino_fondos=${codigoCuentaAcreditacion}&Sistema_Amortizaci%C3%B3n=Sistema+Franc%C3%A9s&Importe_Primera_Cuota=${`$${MoneyFormatterComprobante(importePrimeraCuota)}`}&Importe_Cuota_Promedio=${MoneyFormatterComprobante(importePrimeraCuota)}&Fecha_Primer_Vto=${dateFormat(primerVencimiento)}&Tasa_TNA=${tna}&Tasa_TEA=${tea}&CFT=${cft}&Fecha=${fechaFormateada}&Hora=${horaFormateada}&Operacion=Credito&CodigoDeOperacion=${numeroOperacion}`);

            if (res) {

                //console.log('PDFComprobanteCredito >>>', res)
                await Linking.openURL(res.url); //la función openURL() del módulo Linking se usa para abrir enlaces externos en el navegador

            } else {
                console.log('Error PDFComprobanteCredito');
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

                <CardSimulacion title={'Detalles del crédito'} data={datosCredito} />

                <LinkMedium title={'Descargar comprobante'} onPress={handleComprobante} />

            </View>

            <ButtonFooter title={'Inicio'} onPress={() => handleInicio()} />

        </View>
    );
};

export default CreditoDetalle;
