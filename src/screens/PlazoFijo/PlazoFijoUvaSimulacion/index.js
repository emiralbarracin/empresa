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

const PlazoFijoUvaSimulacion = ({ navigation }) => {

    const [cargandoBoton, setCargandoBoton] = useState(false);

    const { codigoProducto, nombreProducto, idProdWebMobile, descripcionMoneda } = useRoute().params

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
    const [cotizacionUVA, setCotizacionUVA] = useState(0)
    const [importeTotalUVA, setImporteTotalUVA] = useState(0)
    const [tasaPrecancelacion, setTasaPrecancelacion] = useState(0)

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

            setCargandoBoton(true)

            try {

                const { data: res1 } = await api.get(`api/CotizacionTasaPFUva/RecuperarCotizacionTasaPFUva?CodigoSucursal=20&CodigoMoneda=0&CodigoSistema=4&CodigoSubSistema=0&CodigoProducto=0&CodigoFuncion=0&CodigoDatos=0&CodigoPlantilla=69&IdMensaje=CotizacionTasa+PFUVA`); //ver codigoProducto

                if (res1) {

                    if (res1.status === 0) {

                        //console.log('CotizacionTasaPFUva >>> ', JSON.stringify(res1, null, 4))
                        setCotizacionUVA(res1.output[0].cotizacion)
                        setImporteTotalUVA(importe / res1.output[0].cotizacion)
                        setTasaPrecancelacion(res1.output[0].tasaPrecancelacion)

                        const { data: res2 } = await api.get(`api/ConvertirPesoUva/RecuperarConvertirPesoUva?CodigoSucursal=20&CodigoSistema=4&CodigoSubSistema=0&CodigoMoneda=0&ImportePesosIn=${importe}&ImporteUvaIn=0&IdMensaje=Conversion+PF+UVA`); //ver codigoProducto

                        if (res2) {

                            if (res2.status === 0) {

                                //console.log('ConvertirPesoUva >>> ', JSON.stringify(res2, null, 4))

                                const { data: res3 } = await api.get(`api/BECuentaOperacionPlazoFijoSimulacion/RecuperarBECuentaOperacionPlazoFijoSimulacion?CodigoSucursal=20&ImportePactado=${importe}&Plazo=${plazo}&CodigoPlantilla=78&CodigoMoneda=&CodigoCuenta=&FechaLiquidacion=&CodigoProducto=&CodigoRutinaLiquidacion=&CodigoFuncion=&CodigoDatos=&PlazoInteres=&Proceso=&CodigoRetencionImpuesto=&CodigoImpuestoGanancia=&CodigoPaisResidente=&CodigoSistemaCuentaDebito=0&CodigoSucursalCuentaDebito=0&CodigoCuentaDebito=0&CodigoMonedaCuentaDebito=0&IdProdWebMobile=8&WebMobile=0&IdMensaje=sucursalvirtual`); //ver codigoProducto

                                if (res3) {

                                    if (res3.status === 0) {

                                        //console.log('importe >>>', importe)
                                        //console.log('cuota >>>', plazo)

                                        //console.log('CuentaOperacionPlazoFijoSimulacion >>> ', JSON.stringify(res3, null, 4))
                                        setImporteSolicitado(res3.output[0].importeAcc)
                                        setTna(res3.output[0].tna.toString().slice(0, 5))
                                        setTea(res3.output[0].tea.toString().slice(0, 5))
                                        setVencimiento(res3.output[0].vencimiento)
                                        setMonto(res3.output[0].monto)
                                        setMostrarSimulacion(true)
                                        setCargandoBoton(false)

                                        //const cuotasData = res3.output.slice(1); //excluir el elemento en la posición 0

                                    } else {
                                        setMensajeModal(res3.mensajeStatus)
                                        setModalVisible(true)
                                        setCargandoBoton(false)
                                    }

                                } else {
                                    console.log('Error CuentaOperacionPlazoFijoSimulacion');
                                    setCargandoBoton(false)
                                }


                            } else {
                                setMensajeModal(res2.mensajeStatus)
                                setModalVisible(true)
                                setCargandoBoton(false)
                            }

                        } else {
                            console.log('Error ConvertirPesoUva');
                            setCargandoBoton(false)
                        }

                    } else {

                        setMensajeModal(res1.mensajeStatus)
                        setModalVisible(true)
                        setCargandoBoton(false)

                    }

                } else {
                    console.log('Error CotizacionTasaPFUva');
                    setCargandoBoton(false)
                }

            } catch (error) {
                console.log('catch CuentaOperacionPlazoFijoSimulacion >>> ', error);
                setCargandoBoton(false)
                return;
            }

        }

    };

    const datosSimulacion = [
        { title: 'Cotización de UVA', value: cotizacionUVA },
        { title: 'Tasa de pre-cancelación', value: `${tasaPrecancelacion} %` },
        { title: 'Capital', value: <MoneyConverter value={importeSolicitado} /> },
        { title: 'Interés', value: <MoneyConverter value={monto - importeSolicitado} /> },
        { title: 'Total en UVA', value: importeTotalUVA.toFixed(2) },
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

                <IconInputMoney placeholder={'Ingrese el importe'} onChangeText={handleImporte} value={importe} />

                <Dropdown
                    items={[
                        { label: '90 días', value: 90 },
                        { label: '120 días', value: 120 },
                        { label: '150 días', value: 150 },
                    ]}
                    //defaultValue={valor}
                    placeholder={'Seleccione el plazo'}
                    onSelectItem={item => handlePlazoSeleccionado(item.value)}
                    zIndex={100}
                />

                <View style={{ marginHorizontal: '20%' }}>
                    <ButtonFooter title={'Simular'} onPress={() => handleSimular()} loading={cargandoBoton} />
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

export default PlazoFijoUvaSimulacion;
