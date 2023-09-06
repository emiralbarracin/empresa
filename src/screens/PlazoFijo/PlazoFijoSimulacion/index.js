import { View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import IconInputMoney from '../../../components/IconInputMoney';
import ButtonFooter from '../../../components/ButtonFooter';
import CardSimulacion from '../../../components/CardSimulacion';
import Dropdown from '../../../components/DropDown';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import DateConverter from '../../../utils/DateConverter';
import { useRoute } from '@react-navigation/native';
import TitleMediumBold from '../../../components/TitleMediumBold';
import ModalError from '../../../components/ModalError';
import IconInputMoneyDollar from '../../../components/IconInputMoneyDollar';

const PlazoFijoSimulacion = ({ navigation }) => {

    const { codigoProducto, nombreProducto, idProdWebMobile, descripcionMoneda, codigoMoneda } = useRoute().params

    //console.log('codigoProducto >>>', codigoProducto)
    //console.log('nombreProducto >>>', nombreProducto)

    const [importe, setImporte] = useState(null)
    const [plazo, setPlazo] = useState(null)
    const [mostrarSimulacion, setMostrarSimulacion] = useState(false)
    const [importeSolicitado, setImporteSolicitado] = useState(null)
    const [tna, setTna] = useState(0)
    const [tea, setTea] = useState(0)
    const [vencimiento, setVencimiento] = useState(null)
    const [monto, setMonto] = useState(null)

    const handleImporte = (valor) => {
        setImporte(valor)
    }

    const handlePlazoSeleccionado = (plazoSeleccionado) => {
        setPlazo(plazoSeleccionado)
    }

    const handleSimular = async () => {

        if (!importe || !plazo) {

            setMensajeModal('Debe ingresar el importe y el plazo.')
            setModalVisible(true)

        } else {

            try {

                const { data: res1 } = await api.get(`api/BECuentaOperacionPlazoFijoSimulacion/RecuperarBECuentaOperacionPlazoFijoSimulacion?CodigoSucursal=20&ImportePactado=${importe}&Plazo=${plazo}&CodigoPlantilla=71&CodigoMoneda=&CodigoCuenta=&FechaLiquidacion=&CodigoProducto=&CodigoRutinaLiquidacion=&CodigoFuncion=&CodigoDatos=&PlazoInteres=&Proceso=&CodigoRetencionImpuesto=&CodigoImpuestoGanancia=&CodigoPaisResidente=&CodigoSistemaCuentaDebito=0&CodigoSucursalCuentaDebito=0&CodigoCuentaDebito=0&CodigoMonedaCuentaDebito=0&IdProdWebMobile=${idProdWebMobile}&WebMobile=0&IdMensaje=sucursalvirtual`); //ver codigoProducto

                if (res1) {

                    if (res1.status === 0) {

                        setMostrarSimulacion(true)
                        //console.log('importe >>>', importe)
                        //console.log('cuota >>>', plazo)

                        //console.log('CuentaOperacionPlazoFijoSimulacion >>> ', JSON.stringify(res1, null, 4))
                        setImporteSolicitado(res1.output[0].importeAcc)
                        setTna(res1.output[0].tna.toString().slice(0, 5))
                        setTea(res1.output[0].tea.toString().slice(0, 5))
                        setVencimiento(res1.output[0].vencimiento)
                        setMonto(res1.output[0].monto)

                        //const cuotasData = res1.output.slice(1); //excluir el elemento en la posición 0

                    } else {

                        setMostrarSimulacion(false)
                        setMensajeModal(res1.mensajeStatus)
                        setModalVisible(true)

                    }

                } else {
                    console.log('Error CuentaOperacionPlazoFijoSimulacion');
                }

            } catch (error) {
                console.log('catch CuentaOperacionPlazoFijoSimulacion >>> ', error);
                return;
            }

        }

    };

    const datosSimulacion = [
        { title: 'Capital', value: <MoneyConverter value={importeSolicitado} /> },
        { title: 'Interés', value: <MoneyConverter value={monto - importeSolicitado} /> },
        { title: 'Total a cobrar', value: <MoneyConverter value={monto} /> },
        { title: 'Vencimiento', value: <DateConverter date={vencimiento} /> },
        { title: 'TEA', value: `${tea} %` },
        { title: 'TNA', value: `${tna} %` },
    ];


    const handleSiguiente = () => {
        navigation.navigate('PlazoFijoConfirmacion', { importe, plazo, tea, tna, idProdWebMobile, plazo, monto, vencimiento, nombreProducto, descripcionMoneda })
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <TitleMediumBold title={nombreProducto} />

                {codigoMoneda === 2 ?
                    (<IconInputMoneyDollar placeholder={'Ingrese el importe'} onChangeText={handleImporte} value={importe} />)
                    :
                    (<IconInputMoney placeholder={'Ingrese el importe'} onChangeText={handleImporte} value={importe} />)
                }

                <Dropdown
                    items={[
                        { label: '30 días', value: 30 },
                        { label: '60 días', value: 60 },
                        { label: '90 días', value: 90 },
                        { label: '120 días', value: 120 },
                    ]}
                    //defaultValue={valor}
                    placeholder={'Seleccione el plazo'}
                    onSelectItem={item => handlePlazoSeleccionado(item.value)}
                    zIndex={100}
                />

                <View style={{ marginHorizontal: '20%' }}>
                    <ButtonFooter title={'Simular'} onPress={() => handleSimular()} />
                </View>

                {mostrarSimulacion ? (
                    <>
                        <CardSimulacion title={'Resultado de la simulación'} data={datosSimulacion} />
                    </>
                ) : null}

            </View>

            <View style={styles.footer}>
                <ButtonFooter title={'Siguiente'} onPress={() => handleSiguiente()} />
            </View>

            <ModalError
                visible={modalVisible}
                title={mensajeModal}
                titleButton="Aceptar"
                onPressButton={handleAceptar}
            />

        </View>
    );
};

export default PlazoFijoSimulacion;
