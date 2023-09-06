import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import CardSimulacion from '../../../components/CardSimulacion';
import MoneyConverter from '../../../utils/MoneyConverter';
import { useRoute } from '@react-navigation/native';
import Dropdown from '../../../components/DropDown';
import { useSelector } from 'react-redux';
import api from '../../../services/api';
import ModalConfirm from '../../../components/ModalConfirm';
import ModalError from '../../../components/ModalError';

const CompraVentaDolarConfirmacionCompra = ({ navigation }) => {

    const cuentasRTK = useSelector(state => state.cuentaStore.cuentas);


    filtroCuentasPesos = cuentasRTK.filter(item => ((item.codigoSistema === 3) || (item.codigoSistema === 5)) && (item.codigoMoneda === 0))

    cuentasDropDownPesos = []

    filtroCuentasPesos.map(item => {
        let saldoEnMoneda;
        if (item.codigoMoneda === 2) { // Verifica si el código de moneda es igual a 2 (Dólares)
            saldoEnMoneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.saldo);
        } else {
            saldoEnMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.saldo);
        }
        cuentasDropDownPesos.push({// agrega un nuevo elemento al arreglo cuentasDropDownPesos
            label: `${item.sintetico} ${item.codigoMonedaDesc} ${item.mascara} - Saldo: ${saldoEnMoneda}`,
            value: item
        });
    });


    filtroCuentasDolares = cuentasRTK.filter(item => ((item.codigoSistema === 3) || (item.codigoSistema === 5)) && (item.codigoMoneda === 2))

    cuentasDropDownDolares = []

    filtroCuentasDolares.map(item => {
        let saldoEnMoneda;
        if (item.codigoMoneda === 2) { // Verifica si el código de moneda es igual a 2 (Dólares)
            saldoEnMoneda = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.saldo);
        } else {
            saldoEnMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.saldo);
        }
        cuentasDropDownDolares.push({// agrega un nuevo elemento al arreglo cuentasDropDownDolares
            label: `${item.sintetico} ${item.codigoMonedaDesc} ${item.mascara} - Saldo: ${saldoEnMoneda}`,
            value: item
        });
    });


    const { importe, cotizacion, total } = useRoute().params

    impuestoPais = total * 0.30
    retencion = total * 0.35
    totalADebitar = total + impuestoPais + retencion

    const datosTransferencia = [
        { title: 'Importe a acreditar', value: <MoneyConverter value={importe} money={2} /> },
        { title: 'Importe a debitar', value: <MoneyConverter value={total} /> },
        { title: 'Impuesto país 30%', value: <MoneyConverter value={impuestoPais} /> },
        { title: 'Retención 35% (imp. ganancias)', value: <MoneyConverter value={retencion} /> },
        { title: 'Total a debitar', value: <MoneyConverter value={totalADebitar} /> },
    ];


    const [cuentaDebito, setCuentaDebito] = useState(null)
    const [monedaCuentaDebito, setMonedaCuentaDebito] = useState(null)
    const [sistemaCuentaDebito, setSistemaCuentaDebito] = useState(null)

    const handleCuentaPesosSeleccionada = (item) => {
        //console.log('cuenta PESOS seleccionada >>>', item)
        setCuentaDebito(item.codigoCuenta)
        setMonedaCuentaDebito(item.codigoMoneda)
        setSistemaCuentaDebito(item.codigoSistema)
    }

    const [cuentaCredito, setCuentaCredito] = useState(null)
    const [monedaCuentaCredito, setMonedaCuentaCredito] = useState(null)
    const [sistemaCuentaCredito, setSistemaCuentaCredito] = useState(null)

    const handleCuentaDolaresSeleccionada = (item) => {
        //console.log('cuenta DOLARES seleccionada >>>', item.codigoCuenta)
        setCuentaCredito(item.codigoCuenta)
        setMonedaCuentaCredito(item.codigoMoneda)
        setSistemaCuentaCredito(item.codigoSistema)
    }


    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const [modalErrorVisible, setModalErrorVisible] = useState(false);
    const [mensajeModalError, setMensajeModalError] = useState(null);

    const handleConfirmar = async () => {
        setMensajeModal('¿Está seguro/a que desea realizar la compra?')
        setModalVisible(true)
    };

    const handleAceptar = async () => {

        setModalVisible(false)

        try {

            const parametros = {
                CodigoCuentaCredito: cuentaCredito,
                CodigoCuentaDebito: cuentaDebito,
                CodigoMoneda: "",
                CodigoMonedaCuentaCredito: monedaCuentaCredito,
                CodigoMonedaCuentaDebito: monedaCuentaDebito,
                CodigoPlantilla: 9,
                CodigoSistemaCuentaCredito: sistemaCuentaCredito,
                CodigoSistemaCuentaDebito: sistemaCuentaDebito,
                CodigoSucursal: 20,
                CodigoSucursalCuentaCredito: 20,
                CodigoSucursalCuentaDebito: 20,
                Cotizacion: cotizacion,
                IdMensaje: "sucursalvirtual",
                Importe: importe,
                ImporteMonedaLocal: total,
            }

            const { data: res } = await api.post(`api/HbCompraVentaMoneda/EjecutarHbCompraVentaMoneda`, parametros,);

            if (res) {

                //console.log('HbCompraVentaMoneda >>>', res)

                if (res.status === 53156) {
                    //setMensajeModalError(res.mensajeStatus);
                    setMensajeModalError('Se superó el monto de acumulación para la persona.');
                    setModalErrorVisible(true);
                } else {
                    navigation.navigate('CompraVentaDolarAcreditacion')
                }

            } else {
                console.log('Error HbCompraVentaMoneda');
            }

        } catch (error) {
            console.log('catch >>> ', error);
            return;
        }
    }

    const handleCancelar = () => {
        setModalVisible(false)
    }

    const handleAceptarError = () => {
        setModalErrorVisible(false)
    }



    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={'Datos de la compra'} data={datosTransferencia} />

                <Dropdown
                    items={cuentasDropDownPesos}
                    placeholder={'Seleccionar cuenta origen'}
                    onSelectItem={item => handleCuentaPesosSeleccionada(item.value)}
                    zIndex={200}
                />

                <Dropdown
                    items={cuentasDropDownDolares}
                    placeholder={'Seleccionar cuenta destino'}
                    onSelectItem={item => handleCuentaDolaresSeleccionada(item.value)}
                    zIndex={100}
                />

            </View>

            <ButtonFooter title={'Confirmar'} onPress={() => handleConfirmar()} />

            <ModalConfirm
                visible={modalVisible}
                title={mensajeModal}
                titleButtonLeft={'Cancelar'}
                titleButtonRight={'Aceptar'}
                onPressButtonLeft={handleCancelar}
                onPressButtonRight={handleAceptar}
            />

            <ModalError
                visible={modalErrorVisible}
                title={mensajeModalError}
                titleButton={'Aceptar'}
                onPressButton={handleAceptarError}
            />

        </View>
    );
};

export default CompraVentaDolarConfirmacionCompra;