import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import CardSimulacion from '../../../components/CardSimulacion';
import Dropdown from '../../../components/DropDown';
import ButtonFooter from '../../../components/ButtonFooter';
import api from '../../../services/api';
import { useRoute } from '@react-navigation/native';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useSelector } from 'react-redux';
import ModalConfirm from '../../../components/ModalConfirm';
import Checkbox from '../../../components/Checkbox';
import LinkMedium from '../../../components/LinkMedium';
import ModalError from '../../../components/ModalError';

const CreditoConfirmacion = ({ navigation }) => {

    const cuentasRTK = useSelector(state => state.cuentaStore.cuentas);

    //console.log('cuentas RTK >>>', JSON.stringify(cuentasRTK.cuentas, null, 4)) //cuentasRTK.cuentas contiene todas las cuentas

    filtroCuentas = cuentasRTK.filter(item => ((item.codigoSistema === 3) || (item.codigoSistema === 5)) && (item.codigoMoneda === 0))

    cuentasDropDown = [] //para la dropdown

    //filtroCuentas.map(item => { cuentasDropDown.push({ label: `${item.sintetico} ${item.codigoMonedaDesc} ${item.mascara} - Saldo: ${item.codigoMonedaDesc} ${ <MoneyConverter value={item.saldo} /> }`, value: item }) });

    filtroCuentas.map(item => {
        let saldoEnMoneda;
        if (item.codigoMoneda === 2) { // Verifica si el código de moneda es igual a 2 (Dólares)
            saldoEnMoneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.saldo);
        } else {
            saldoEnMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.saldo);
        }
        cuentasDropDown.push({// agrega un nuevo elemento al arreglo cuentasDropDown
            label: `${item.sintetico} ${item.codigoMonedaDesc} ${item.mascara} - Saldo: ${saldoEnMoneda}`,
            value: item
        });
    });

    const { nombreProducto, importe, cantidadCuotas, cft, tea, tna, idProdWebMobile, primerVencimiento, importePrimeraCuota, importeGastos } = useRoute().params

    const [codigoCuentaAcreditacion, setCodigoCuentaAcreditacion] = useState(false)
    const [codigoSistemaAcreditacion, setCodigoSistemaAcreditacion] = useState(false)

    const handleCuentaSeleccionada = (item) => {
        //console.log('cuenta seleccionada >>>', item.codigoCuenta)
        //console.log('codigo sistema >>>', item.codigoSistema)
        setCodigoCuentaAcreditacion(item.codigoCuenta)
        setCodigoSistemaAcreditacion(item.codigoSistema)
    }

    const datosCredito = [
        { title: 'Importe solicitado', value: <MoneyConverter value={importe} /> },
        { title: 'Cantidad de cuotas', value: cantidadCuotas },
        { title: 'CFT', value: `${cft} %` },
        { title: 'TNA', value: `${tna} %` },
        { title: 'TEA', value: `${tea} %` },
    ];

    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState(null);

    const handleConfirmarCredito = async () => {
        setMensajeModalConfirm('¿Está seguro/a que desea solicitar el crédito?')
        setModalConfirmVisible(true)
    };

    const handleAceptarConfirm = async () => {

        setModalConfirmVisible(false)

        try {

            const parametros = {
                CantidadCuotasPactadas: cantidadCuotas,
                CodigoCuentaAcreditacion: codigoCuentaAcreditacion,
                CodigoPlantilla: 0,
                CodigoSistemaAcreditacion: codigoSistemaAcreditacion,
                CodigoSucursal: 20,
                IdMensaje: "sucursalvirtual",
                ImportePactado: importe,
                idProdWebMobile: idProdWebMobile,
                webMobile: 0,
            }

            const { data: res1 } = await api.post(`api/BECuentaOperacionCreditoLiquidacion/RegistrarBECuentaOperacionCreditoLiquidacion`, parametros,);

            if (res1.status === 0) {

                let fechaLiquidacion = res1.output[0].fechaLiquidacion
                let codigoSolicitud = res1.output[0].codigoSolicitud
                let numeroOperacion = res1.output[0].numeroOperacion

                //console.log('BECuentaOperacionCreditoLiquidacion >>>', JSON.stringify(res1.output, null, 4))

                navigation.navigate('CreditoDetalle', { numeroOperacion, fechaLiquidacion, codigoSolicitud, importe, cantidadCuotas, codigoCuentaAcreditacion, tna, tea, cft, primerVencimiento, importePrimeraCuota, importeGastos })

            } else {

                setMensajeModal(res1.mensajeStatus)
                setModalVisible(true)
                console.log('Error CuentaOperacionCreditoSimulacion');

            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        }
    }

    const handleCancelarConfirm = () => {
        setModalConfirmVisible(false)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    }


    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={nombreProducto} data={datosCredito} />

                <Checkbox title={'Acepto el'} link={'Contrato'} onPress={() => navigation.navigate('LegalContrato')} />
                <Checkbox title={'Acepto los'} link={'Términos y Condiciones'} onPress={() => navigation.navigate('LegalTerminoYCondicion')} />

                <Dropdown
                    items={cuentasDropDown}
                    placeholder={'Seleccionar cuenta'}
                    onSelectItem={item => handleCuentaSeleccionada(item.value)}
                    zIndex={100}
                />
            </View>

            <ButtonFooter title={'Confirmar'} onPress={() => handleConfirmarCredito()} />

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

export default CreditoConfirmacion;
