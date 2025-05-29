import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import ButtonFooter from '../../../components/ButtonFooter';
import Dropdown from '../../../components/DropDown';
import { useSelector } from 'react-redux';
import IconInputMoney from '../../../components/IconInputMoney';
import TitleSmall from '../../../components/TitleSmall';
import ModalError from '../../../components/ModalError';
import IconInputButton from '../../../components/IconInputButton';
import CardDetalle from '../../../components/CardDetalle';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import CardCuentaObtenida from '../../../components/CardCuentaObtenida';
import MoneyConverter from '../../../utils/MoneyConverter';

const PagoServicioNuevo = ({ navigation }) => {
    const cuentasRTK = useSelector(state => state.cuentaStore.cuentas);

    const primeraCuentaPesos = cuentasRTK.find(cuenta => cuenta.codigoMoneda === 0); //obtiene la primera cuenta con codigoMoneda === 0
    const cuentaPesos = primeraCuentaPesos ? {
        codigoCuenta: primeraCuentaPesos.codigoCuenta,
        codigoSistema: primeraCuentaPesos.codigoSistema,
        codigoMonedaDesc: primeraCuentaPesos.codigoMonedaDesc,
        mascara: primeraCuentaPesos.mascara,
        saldo: primeraCuentaPesos.saldo,
    } : null;

    const filtroCuentas = cuentasRTK.filter(item => (item.codigoSistema === 3 || item.codigoSistema === 5) && item.codigoMoneda === 0);
    const cuentasDropDown = []; //para la dropdown

    filtroCuentas.map(item => {
        let saldoEnMoneda;
        if (item.codigoMoneda === 2) {
            // Verifica si el código de moneda es igual a 2 (Dólares)
            saldoEnMoneda = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(item.saldo);
        } else {
            saldoEnMoneda = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
            }).format(item.saldo);
        }
        cuentasDropDown.push({
            // agrega un nuevo elemento al arreglo cuentasDropDown
            label: `Cuenta ${item.codigoMonedaDesc} ${item.mascara} - Saldo: ${saldoEnMoneda}`,
            value: item,
        });
    });

    const [importe, setImporte] = useState(null);
    const [mostrarDestinatario, setMostrarDestinatario] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);

    const handleImporte = valor => setImporte(valor);

    const [empresa, setEmpresa] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [cuit, setCuit] = useState(null);
    const [ciudad, setCiudad] = useState(null);

    const handleBuscarDestinatario = value => {
        //console.log('value >>> ', value)
        if (value == '00020101021243650016com.mercadolibre020130636fdd2d82c-2253-4c07-be61-2f38b4d0f00550150011202538077265204970053030325802AR5906YaPago6004CABA63041FE3') {
            setEmpresa('com.mercadolibre');
            setNombre('YaPago');
            setCuit('20253807726');
            setCiudad('CABA-AR');
            setMostrarDestinatario(true);
        } else {
            //setMostrarError(true)
            setMostrarDestinatario(false);
        }
    };

    const handleSiguiente = () => {
        if (!cuit || !importe) {
            setMensajeModal('Debe completar todos los campos.');
            setModalVisible(true);
        } else {
            navigation.navigate('PagoServicioConfirmacion', { empresa, nombre, cuit, ciudad, importe, cuentaOrigen: cuentaPesos.codigoCuenta });
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => setModalVisible(false);
    const datosDestinatario = [
        { title: 'Empresa', value: empresa },
        { title: 'Nombre', value: nombre },
        { title: 'CUIT', value: cuit },
        { title: 'Ciudad', value: ciudad },
    ];

    //>>>>>>>>CONFIGURACION CAMARA CODIGO QR///////////
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [codigoQR, setCodigoQR] = useState(false);
    const [data, setData] = useState('');
    useEffect(() => {
        setCodigoQR(true);
        console.log('dato escaneado: ', data);
        handleBuscarDestinatario(data);
    }, [data]);
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('back');
    const handleQR = () => {
        if (!hasPermission) {
            requestPermission();
        } else {
            setShowQRScanner(true);
        }
    };
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: codes => {
            //console.log(`Scanned ${codes.length} codes!`);
            console.log(JSON.stringify(codes[0].value, null, 4)); //console.log(codes);
            setShowQRScanner(false);
            setData(codes[0].value);
        },
    });
    //>>>>>>>>CONFIGURACION CAMARA CODIGO QR///////////

    return (
        <View style={styles.container}>
            {showQRScanner ? (
                <Camera
                    style={styles.absoluteFill}
                    device={device}
                    isActive={showQRScanner}
                    codeScanner={codeScanner}
                />
            ) : (
                <View style={styles.body}>
                    <IconInputButton
                        placeholder={data == '' ? 'Ingrese el código' : data}
                        iconName={'archive-edit-outline'}
                        keyboardType={'numeric'}
                        onChangeText={handleBuscarDestinatario}
                        iconNameButton={'qrcode-scan'}
                        onPress={() => handleQR()}
                    />
                    {mostrarDestinatario && (
                        <CardDetalle title={'Destinatario'} data={datosDestinatario} />
                    )}
                    {mostrarError && (
                        <View style={{ marginBottom: 8 }}>
                            <TitleSmall title={'El código ingresado es inválido.'} />
                        </View>
                    )}
                    <CardCuentaObtenida
                        codigoMonedaDesc={cuentaPesos.codigoMonedaDesc}
                        mascara={cuentaPesos.mascara}
                        saldo={<MoneyConverter value={cuentaPesos.saldo} />}
                    />
                    <IconInputMoney
                        placeholder={'Ingrese el importe'}
                        onChangeText={handleImporte}
                        value={importe}
                    />
                </View>
            )}
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

export default PagoServicioNuevo;