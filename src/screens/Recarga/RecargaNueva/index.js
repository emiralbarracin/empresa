import { Platform, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import IconInput from '../../../components/IconInput';
import Dropdown from '../../../components/DropDown';
import { useSelector } from 'react-redux';
import IconInputMoney from '../../../components/IconInputMoney';
import ModalError from '../../../components/ModalError';

const RecargaNueva = ({ navigation }) => {

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

    const [celuar, setCelular] = useState(null)

    const handleCelularIngresado = (valor) => {
        setCelular(valor)
    }

    const [importe, setImporte] = useState(null)

    const handleImporte = (valor) => {
        setImporte(valor)
    }

    const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null)
    const [codigoSistema, setCodigoSistema] = useState(null)

    const handleCuentaSeleccionada = (valor) => {
        setCuentaSeleccionada(valor.codigoCuenta)
        setCodigoSistema(valor.codigoSistema)
    }

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null)

    const handleEmpresaSeleccionada = (valor) => {
        setEmpresaSeleccionada(valor)
    }

    const handleRealizarRecarga = async () => {

        if (!celuar || !empresaSeleccionada || !importe || !cuentaSeleccionada) {

            setMensajeModal('Debe completar todos los campos.')
            setModalVisible(true)

        } else {

            try {

                let parametros = {
                    CodigoCuenta: cuentaSeleccionada,
                    CodigoMoneda: 0,
                    CodigoPlantilla: 64,
                    CodigoSistema: codigoSistema,
                    CodigoSucursal: 20,
                    CodigoSucursalOrigen: 20,
                    CompaniaCelular: empresaSeleccionada,
                    Concepto: 17,
                    IdMensaje: "Recarga de celular",
                    IdOperador: 75,
                    Importe: importe,
                    NombreCliCel: "TORRES NANSY",
                    NumeroCelular: celuar,
                    Sistema: codigoSistema,
                    SubConcepto: 1,
                    Transaccion: "002000100",
                }

                const { data: res } = await api.post(`api/OrqRecargaCelular/RegistrarOrqRecargaCelular`, parametros);

                if (res) {

                    //console.log('OrqRecargaCelular >>>', res)
                    navigation.navigate('RecargaExitosa', { celuar, empresaSeleccionada, importe, cuentaSeleccionada })

                } else {
                    console.log('Error OrqRecargaCelular');
                }

            } catch (error) {
                console.log('catch >>> ', error);
                return;
            }

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
                    placeholder={'Ingrese el nro. de celular'}
                    iconName={'cellphone'}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                    maxLength={10}
                    onChangeText={handleCelularIngresado}
                />

                <Dropdown
                    items={[
                        { label: 'Personal', value: 'Personal' },
                        { label: 'Claro', value: 'Claro' },
                        { label: 'Movistar', value: 'Movistar' },
                        { label: 'Nextel', value: 'Nextel' },
                        { label: 'Direct Tv', value: 'Direct Tv' },
                        { label: 'Tuenti - Quam', value: 'Tuenti - Quam' },
                    ]}
                    placeholder={'Seleccione la empresa'}
                    onSelectItem={item => handleEmpresaSeleccionada(item.value)}
                    zIndex={200}
                />

                <IconInputMoney
                    placeholder={'Ingrese el importe'}
                    onChangeText={handleImporte}
                    value={importe}
                />

                <Dropdown
                    items={cuentasDropDown}
                    placeholder={'Seleccione la cuenta débito'}
                    onSelectItem={item => handleCuentaSeleccionada(item.value)}
                    zIndex={100}
                />

            </View>

            <ButtonFooter title={'Realizar recarga'} onPress={() => handleRealizarRecarga()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default RecargaNueva;
