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
import DateConverter from '../../../utils/DateConverter';
import ModalError from '../../../components/ModalError';
import Checkbox from '../../../components/Checkbox';
import LinkMedium from '../../../components/LinkMedium';
import LoadingIndicator from '../../../components/LoadingIndicator';

const PlazoFijoConfirmacion = ({ navigation }) => {

    const [cargando, setCargando] = useState(false);

    const cuentasRTK = useSelector(state => state.cuentaStore.cuentas);

    //console.log('cuentas RTK >>>', JSON.stringify(cuentasRTK.cuentas, null, 4)) //cuentasRTK.cuentas contiene todas las cuentas

    //PESOS

    filtroCuentas = cuentasRTK.filter(item => ((item.codigoSistema === 3) || (item.codigoSistema === 5)) && (item.codigoMoneda === 0))

    cuentasDropDown = [] //para la dropdown

    //filtroCuentas.map(item => { cuentasDropDown.push({ label: `${item.mascara} ${item.codigoSistemaDesc} ${item.codigoMonedaDesc}`, value: item }) });

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


    //DOLARES

    filtroCuentasDolares = cuentasRTK.filter(item => ((item.codigoSistema === 3) || (item.codigoSistema === 5)) && (item.codigoMoneda === 2))

    cuentasDropDownDolares = [] //para la dropdown

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




    const { importe, plazo, tea, tna, idProdWebMobile, monto, vencimiento, nombreProducto, descripcionMoneda } = useRoute().params

    const [codigoCuentaDebito, setCodigoCuentaDebito] = useState(false)
    const [codigoSistemaCuentaDebito, setCodigoSistemaCuentaDebito] = useState(false)

    //console.log('descripcionMoneda', descripcionMoneda)

    const handleCuentaSeleccionada = (item) => {
        //console.log('cuenta seleccionada >>>', item.codigoCuenta)
        //console.log('codigo sistema >>>', item.codigoSistema)
        setCodigoCuentaDebito(item.codigoCuenta)
        setCodigoSistemaCuentaDebito(item.codigoSistema)
    }

    //const [numeroOperacion, setNumeroOperacion] = useState(null)
    //const [fechaLiquidacion, setFechaLiquidacion] = useState(null)

    const datosPlazoFijo = [
        { title: 'Importe solicitado', value: <MoneyConverter value={importe} /> },
        { title: 'Interés', value: <MoneyConverter value={monto - importe} /> },
        { title: 'Total a cobrar', value: <MoneyConverter value={monto} /> },
        { title: 'Vencimiento', value: <DateConverter date={vencimiento} /> },
        { title: 'Plazo', value: `${plazo} días` },
        { title: 'TEA', value: `${tea} %` },
        { title: 'TNA', value: `${tna} %` },
    ];

    const [modalVisibleConfirm, setModalVisibleConfirm] = useState(false);
    const [mensajeModalConfirm, setMensajeModalConfirm] = useState(null);

    const handleConfirmarPlazoFijo = async () => {
        setMensajeModalConfirm('¿Está seguro/a que desea constituir el plazo fijo?')
        setModalVisibleConfirm(true)
    };

    const handleAceptarConfirm = async () => {

        setModalVisibleConfirm(false)
        setCargando(true)

        try {

            const parametros = {
                CodigoCuentaDebito: codigoCuentaDebito,
                CodigoPlantilla: 62,
                CodigoSistemaCuentaDebito: codigoSistemaCuentaDebito,
                CodigoSucursal: 20,
                FechaLiquidacion: "",
                IdMensaje: "sucursalvirtual",
                IdProdWebMobile: idProdWebMobile,
                ImportePactado: importe,
                Plazo: plazo,
                RenovacionAutomatica: 0,
                WebMobile: 0,
            }

            const { data: res1 } = await api.post(`api/BECuentaOperacionPlazoFijoLiquidacion/RegistrarBECuentaOperacionPlazoFijoLiquidacion`, parametros,);

            if (res1) {

                if (res1.status === 0) {

                    //console.log('CuentaOperacionPlazoFijoLiquidacion >>>', res1)
                    //setNumeroOperacion(res1.output[0].numeroOperacion)
                    //setFechaLiquidacion(res1.output[0].fechaLiquidacion)
                    navigation.navigate('PlazoFijoDetalle', { importe, monto, plazo, tea, tna, codigoCuentaDebito, vencimiento, nombreProducto, descripcionMoneda })

                } else {
                    setCargando(false)
                    setModalVisibleConfirm(false)
                    setMensajeModal(res1.mensajeStatus) //mensaje de error
                    setModalVisible(true)
                }

            } else {
                console.log('Error CuentaOperacionPlazoFijoLiquidacion');
                setCargando(false)
            }

        } catch (error) {
            console.log('catch >>> ', error);
            setCargando(false)
            return;
        }
    }

    const handleCancelarConfirm = () => {
        setModalVisibleConfirm(false)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>

            {cargando ? (
                <LoadingIndicator />
            ) : (

                <View style={styles.body}>

                    <CardSimulacion title={nombreProducto} data={datosPlazoFijo} />

                    <Checkbox title={'Acepto el'} link={'Contrato'} onPress={() => navigation.navigate('LegalContrato')} />
                    <Checkbox title={'Acepto los'} link={'Términos y Condiciones'} onPress={() => navigation.navigate('LegalTerminoYCondicion')} />

                    {descripcionMoneda === 'DOLARES EEUU' ? (
                        <Dropdown
                            items={cuentasDropDownDolares}
                            placeholder={'Seleccionar cuenta'}
                            onSelectItem={item => handleCuentaSeleccionada(item.value)}
                            zIndex={100}
                        />
                    ) : (
                        <Dropdown
                            items={cuentasDropDown}
                            placeholder={'Seleccionar cuenta'}
                            onSelectItem={item => handleCuentaSeleccionada(item.value)}
                            zIndex={100}
                        />
                    )}

                </View>

            )}

            {cargando ? (
                null
            ) : (
                <ButtonFooter title={'Confirmar'} onPress={() => handleConfirmarPlazoFijo()} />
            )}

            <ModalConfirm
                visible={modalVisibleConfirm}
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

export default PlazoFijoConfirmacion;
