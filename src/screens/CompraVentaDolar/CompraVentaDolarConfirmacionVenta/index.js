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

const CompraVentaDolarConfirmacionVenta = ({ navigation }) => {

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
        { title: 'Importe a acreditar', value: <MoneyConverter value={total} /> },
        { title: 'Importe a debitar', value: <MoneyConverter value={importe} money={2} /> },
    ];

    const [cuentaCredito, setCuentaCredito] = useState(null)
    const [monedaCuentaCredito, setMonedaCuentaCredito] = useState(null)
    const [sistemaCuentaCredito, setSistemaCuentaCredito] = useState(null)

    const handleCuentaPesosSeleccionada = (item) => {
        //console.log('cuenta PESOS seleccionada >>>', item)
        setCuentaCredito(item.codigoCuenta)
        setMonedaCuentaCredito(item.codigoMoneda)
        setSistemaCuentaCredito(item.codigoSistema)
    }

    const [cuentaDebito, setCuentaDebito] = useState(null)
    const [monedaCuentaDebito, setMonedaCuentaDebito] = useState(null)
    const [sistemaCuentaDebito, setSistemaCuentaDebito] = useState(null)

    const handleCuentaDolaresSeleccionada = (item) => {
        //console.log('cuenta DOLARES seleccionada >>>', item.codigoCuenta)
        setCuentaDebito(item.codigoCuenta)
        setMonedaCuentaDebito(item.codigoMoneda)
        setSistemaCuentaDebito(item.codigoSistema)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleConfirmar = async () => {
        setMensajeModal('¿Está seguro/a que desea realizar la venta?')
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
                CodigoPlantilla: 12,
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

                //console.log('HbCompraVentaMoneda >>>', res.output)

                navigation.navigate('CompraVentaDolarAcreditacion')

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



    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <CardSimulacion title={'Datos de la venta'} data={datosTransferencia} />

                <Dropdown
                    items={cuentasDropDownDolares}
                    placeholder={'Seleccionar cuenta origen'}
                    onSelectItem={item => handleCuentaDolaresSeleccionada(item.value)}
                    zIndex={200}
                />

                <Dropdown
                    items={cuentasDropDownPesos}
                    placeholder={'Seleccionar cuenta destino'}
                    onSelectItem={item => handleCuentaPesosSeleccionada(item.value)}
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

        </View>
    );
};

export default CompraVentaDolarConfirmacionVenta;