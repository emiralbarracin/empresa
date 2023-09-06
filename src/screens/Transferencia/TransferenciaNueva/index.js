import { Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInput from '../../../components/IconInput';
import Dropdown from '../../../components/DropDown';
import { useSelector } from 'react-redux';
import IconInputMoney from '../../../components/IconInputMoney';
import TitleSmall from '../../../components/TitleSmall';
import ModalError from '../../../components/ModalError';

const TransferenciaNueva = ({ navigation }) => {
    const cuentasRTK = useSelector(state => state.cuentaStore.cuentas);
    //console.log('cuentas RTK >>>', JSON.stringify(cuentasRTK.cuentas, null, 4)) //cuentasRTK.cuentas contiene todas las cuentas

    const filtroCuentas = cuentasRTK.filter(item => ((item.codigoSistema === 3) || (item.codigoSistema === 5)) && (item.codigoMoneda === 0))

    const cuentasDropDown = [] //para la dropdown

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

    const [importe, setImporte] = useState(null)
    const [mostrarDestinatario, setMostrarDestinatario] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);



    const handleImporte = (valor) => {
        setImporte(valor)
    }

    const [cbuOrigen, setCbuOrigen] = useState(null)
    const [cuentaOrigen, setCuentaOrigen] = useState(null)

    const handleCuentaSeleccionada = (item) => {
        let cbu = `0${item.cbuBloque1}0${item.cbuBloque2}`
        //console.log('cbu >>>', cbu)
        setCbuOrigen(cbu)
        setCuentaOrigen(item.codigoCuenta)
    }

    const handleReferenciaSeleccionada = (item) => {
        //console.log('item >>>', item)
    }

    const [nombre, setNombre] = useState(null)
    const [cuil, setCuil] = useState(null)
    const [cbuDestino, setCbuDestino] = useState(null)
    const [bancoDestino, setBancoDestino] = useState(null)

    const handleBuscarDestinatario = (value) => {

        if (value.length === 22) {

            //console.log('value >>> ', value)

            const obtenerDatos = async () => {
                try {
                    const { data: res } = await api.get(`api/OrqConsultaCBU/RecuperarOrqConsultaCBU?CodigoSucursal=20&CodigoSistema=&CodigoMoneda=&CodigoCuenta=&CBU=${value}&Alias=&IdMensaje=Sucursal+Virtual+Webapp`);
                    if (res) {
                        //console.log('OrqConsultaCBU >>> ', JSON.stringify(res, null, 4))
                        setNombre(res.nombreTitular)
                        setCuil(res.documentoTitular)
                        setCbuDestino(res.cbuDestino)
                        setBancoDestino(res.nombreBanco)

                        res.status === 0 ? (setMostrarDestinatario(true)) : (setMostrarError(true))

                    } else {
                        console.log('ERROR OrqConsultaCBU');
                    }
                } catch (error) {
                    console.log('catch >>> ', error);
                }
            };
            obtenerDatos();

        } else {
            setMostrarDestinatario(false);
            setMostrarError(false)
        }
    };

    const handleSiguiente = () => {

        if (!cbuDestino || !cbuOrigen || !importe) {

            setMensajeModal('Debe completar todos los campos.')
            setModalVisible(true)

        } else {

            navigation.navigate('TransferenciaConfirmacion', { cbuDestino, nombre, cuil, bancoDestino, importe, cbuOrigen, cuentaOrigen })

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

                <IconInput
                    placeholder={'Ingrese el CVU/CBU'}
                    iconName={'bank-plus'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    maxLength={22}
                    onChangeText={handleBuscarDestinatario}
                />

                {mostrarDestinatario && (

                    <View style={{ marginBottom: '2%' }}>
                        <TitleSmall title={`Destinatario: ${nombre}`} />
                        <TitleSmall title={`CUIL: ${cuil}`} />
                    </View>

                )}

                {mostrarError && (

                    <View style={{ marginBottom: '2%' }}>
                        <TitleSmall title={'El CVU/CBU ingresado es inválido'} />
                    </View>

                )}

                <Dropdown
                    items={cuentasDropDown}
                    placeholder={'Seleccione la cuenta origen'}
                    onSelectItem={item => handleCuentaSeleccionada(item.value)}
                    zIndex={200}
                />

                <IconInputMoney
                    placeholder={'Ingrese el importe'}
                    onChangeText={handleImporte}
                    value={importe}
                />

                <Dropdown
                    items={[
                        { label: 'Alquiler', value: 1 },
                        { label: 'Cuota', value: 1 },
                        { label: 'Expensas', value: 1 },
                        { label: 'Factura', value: 1 },
                        { label: 'Prestamos', value: 1 },
                        { label: 'Seguro', value: 1 },
                        { label: 'Honorario', value: 1 },
                        { label: 'Haberes', value: 1 },
                        { label: 'Operaciones inmobiliarias', value: 1 },
                        { label: 'Inmobiliarias habitualista', value: 1 },
                        { label: 'Bienes registrables habitualistas', value: 1 },
                        { label: 'Bienes registrables no habitualistas', value: 1 },
                        { label: 'Suscripción obligaciones negociables', value: 1 },
                        { label: 'Aportes de capital', value: 1 },
                        { label: 'Reintegro de obras sociales y prepagas', value: 1 },
                        { label: 'Siniestros de seguros', value: 1 },
                        { label: 'Pagos del Estado por indemnizaciones originadas por expropiaciones', value: 1 },
                        { label: 'Varios', value: 1 },
                    ]}
                    placeholder={'Seleccione la referencia'}
                    onSelectItem={item => handleReferenciaSeleccionada(item.value)}
                    zIndex={100}
                />

                <IconInput placeholder={'Ingrese el concepto'} iconName={'pencil-box-multiple-outline'} />
            </View>

            <ButtonFooter title={'Siguiente'} onPress={() => handleSiguiente()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default TransferenciaNueva;
