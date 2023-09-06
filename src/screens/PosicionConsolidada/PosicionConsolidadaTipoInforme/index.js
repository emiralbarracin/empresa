import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../../services/api';
import ButtonFooter from '../../../components/ButtonFooter';
import Dropdown from '../../../components/DropDown';
import ModalError from '../../../components/ModalError';
import CardPerfil from '../../../components/CardPerfil';
import CardCheckbox from '../../../components/CardCheckbox';
import TitleLargeBold from '../../../components/TitleLargeBold';
import TitleMediumBold from '../../../components/TitleMediumBold';

const PosicionConsolidadaTipoInforme = ({ navigation }) => {

    const [globalSeleccionado, setGlobalSeleccionado] = useState(false)
    const [sucursalSeleccionado, setSucursalSeleccionado] = useState(false)

    const [monedaVigenteSeleccionado, setMonedaVigenteSeleccionado] = useState(false)
    const [otraMonedaSeleccionado, setOtraMonedaSeleccionado] = useState(false)

    const [codigoMoneda, setCodigoMoneda] = useState(4)

    const handleGlobal = async () => {
        setGlobalSeleccionado(true)
        setSucursalSeleccionado(false)
    }

    const handleSucursal = async () => {
        setSucursalSeleccionado(true)
        setGlobalSeleccionado(false)
    }

    const handleMonedaVigente = async () => {
        setMonedaVigenteSeleccionado(true)
        setOtraMonedaSeleccionado(false)
        setTipoMonedaSeleccionado(false)
        setCodigoMoneda(4)
    }

    const handleOtraMoneda = async () => {
        setOtraMonedaSeleccionado(true)
        setMonedaVigenteSeleccionado(false)
    }

    const [tipoMonedas, setTipoMonedas] = useState([])

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const { data: res1 } = await api.get('api/BETipoMoneda/RecuperarBETipoMoneda?CodigoSucursal=20&IdMensaje=Sucursal+virtual');
                if (res1) {
                    //console.log('BETipoMoneda >>> ', JSON.stringify(res.output, null, 4));
                    setTipoMonedas(res1.output)
                } else {
                    console.log('ERROR BETipoMoneda');
                }
            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }, []);

    const [tipoMoneda, setTipoMoneda] = useState(null)
    const [tipoMonedaSeleccionado, setTipoMonedaSeleccionado] = useState(false)

    let tipoMonedaAPI

    const handleTipoMonedaSeleccionada = (valor) => {
        tipoMonedaAPI = valor
        setTipoMoneda(valor)
        handleTipoMonedaSeleccionado()
    }

    const [monedas, setMonedas] = useState([])

    const handleTipoMonedaSeleccionado = () => {
        setTipoMonedaSeleccionado(true)
        const obtenerDatos = async () => {
            try {
                const { data: res1 } = await api.get(`api/BEMoneda/RecuperarBEMoneda?CodigoTipoMoneda=${tipoMonedaAPI}&CodigoSucursal=20&IdMensaje=Sucursal+virtual`);
                if (res1) {
                    //console.log('BEMoneda >>> ', JSON.stringify(res.output, null, 4));
                    setMonedas(res1.output)
                } else {
                    console.log('ERROR BEMoneda');
                }
            } catch (error) {
                console.log('catch >>> ', error);
            }
        };

        obtenerDatos();
    }

    const [monedaSeleccionado, setMonedaSeleccionado] = useState(false)

    const handleMonedaSeleccionada = (valor) => {
        //setMonedaSeleccionado(valor)
        //console.log('VALOR >>> ', valor)
        if (valor === 'PESOS') {
            setCodigoMoneda(0)
        } else if (valor === 'DOLARES EEUU') {
            setCodigoMoneda(2)
        } else {
            setCodigoMoneda(999)
        }
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    const handleGenerarInforme = () => {

        if ((globalSeleccionado === false && sucursalSeleccionado === false) || (monedaVigenteSeleccionado === false && otraMonedaSeleccionado === false)) {
            setMensajeModal('Seleccione el tipo de informe y el tipo de moneda.')
            setModalVisible(true)
        } else {

            if (codigoMoneda === 999) {
                setMensajeModal('No hay informes para la moneda seleccionada.')
                setModalVisible(true)
            } else {
                navigation.navigate('PosicionConsolidadaTipoOperacion', { codigoMoneda })
            }

        }

    }

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <TitleMediumBold title={'Seleccione el tipo de informe'} />

                <CardCheckbox
                    title="Posición global"
                    iconName={globalSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleGlobal()}
                />

                <CardCheckbox
                    title="Posición sucursal"
                    iconName={sucursalSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleSucursal()}
                />

                <TitleMediumBold title={'Seleccione el tipo de moneda'} />

                <CardCheckbox
                    title="Moneda vigente"
                    iconName={monedaVigenteSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleMonedaVigente()}
                />

                <CardCheckbox
                    title="Otra moneda"
                    iconName={otraMonedaSeleccionado ? ("checkbox-marked-circle") : ("checkbox-blank-circle-outline")}
                    onPress={() => handleOtraMoneda()}
                />

                {otraMonedaSeleccionado ? (
                    <Dropdown
                        items={tipoMonedas.map((tipoMoneda) => ({ label: tipoMoneda.descripcion, value: tipoMoneda.codigoTipoMoneda }))}
                        placeholder={'Seleccione el tipo de moneda'}
                        onSelectItem={tipoMonedaSeleccionada => handleTipoMonedaSeleccionada(tipoMonedaSeleccionada.value)}
                        zIndex={200}
                    />
                ) : (
                    null
                )}

                {tipoMonedaSeleccionado ? (
                    <Dropdown
                        items={monedas.map((moneda) => ({ label: moneda.descripcionMoneda, value: moneda.codigoMoneda }))}
                        placeholder={'Seleccione la moneda'}
                        onSelectItem={monedaSeleccionada => handleMonedaSeleccionada(monedaSeleccionada.label)}
                        zIndex={100}
                    />
                ) : (
                    null
                )}


            </View>

            <ButtonFooter title={'Generar informe'} onPress={() => handleGenerarInforme()} />

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default PosicionConsolidadaTipoInforme;
