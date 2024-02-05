import { ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import IconInputMoney from '../../../components/IconInputMoney';
import ButtonFooter from '../../../components/ButtonFooter';
import CardSimulacion from '../../../components/CardSimulacion';
import Dropdown from '../../../components/DropDown';
import TableMedium from '../../../components/TableMedium';
import api from '../../../services/api';
import MoneyConverter from '../../../utils/MoneyConverter';
import DateConverter from '../../../utils/DateConverter';
import TitleSmall from '../../../components/TitleSmall';
import { useRoute } from '@react-navigation/native';
import TitleMediumBold from '../../../components/TitleMediumBold';
import ModalError from '../../../components/ModalError';

const CreditoSimulacion = ({ navigation }) => {

    const [cargandoBoton, setCargandoBoton] = useState(false);

    const { codigoProducto, nombreProducto, idProdWebMobile } = useRoute().params

    //console.log('codigoProducto >>>', codigoProducto)
    //console.log('nombreProducto >>>', nombreProducto)

    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const mesFormateado = mes.toString().padStart(2, '0');
    const fechaFormateada = `${anio}/${mesFormateado}/${dia}`;

    const [importe, setImporte] = useState(null)
    const [cantidadCuotas, setCantidadCuotas] = useState(0)
    const [mostrarSimulacion, setMostrarSimulacion] = useState(false)
    const [importeSolicitado, setImporteSolicitado] = useState(0)
    const [cft, setCft] = useState(0)
    const [tna, setTna] = useState(0)
    const [tea, setTea] = useState(0)
    const [tablaCuotas, setTablaCuotas] = useState([])

    const handleImporte = (valor) => {
        setImporte(valor)
    }

    const handleCuotaSeleccionada = (cuotaSeleccionada) => {
        setCantidadCuotas(cuotaSeleccionada)
    }

    const [primerVencimiento, setPrimerVencimiento] = useState(null)
    const [importePrimeraCuota, setImportePrimeraCuota] = useState(null)
    const [importeGastos, setImporteGastos] = useState(null)

    const handleSimular = async () => {

        if (!importe || !cantidadCuotas) {

            setMensajeModal('Debe ingresar el importe y la cantidad de cuotas.')
            setModalVisible(true)

        } else {

            setCargandoBoton(true)

            let tasa

            const { data: res1 } = await api.get(`api/HbConsultaTasaCredito/RecuperarHbConsultaTasaCredito?CodigoSucursal=20&CodigoMoneda=&CodigoProducto=&FechaLiquidacion=&CodigoCuenta=&CantidadCuotasPactadas=${cantidadCuotas}&ImportePactado=${importe}&Plazo=&CodigoRutinaLiquidacion=&CodigoPlantilla=14&WebMobile=0&IdProdWebMobile=${idProdWebMobile}&IdMensaje=sucursalvirtual`);

            if (res1) {

                //console.log('HbConsultaTasaCredito >>> ', JSON.stringify(res1.output, null, 4))
                tasa = res1.output[0].tasa

            } else {
                console.log('Error HbConsultaTasaCredito');
            }

            try {

                const { data: res2 } = await api.get(`api/BECuentaOperacionCreditoSimulacion/RecuperarBECuentaOperacionCreditoSimulacion?CodigoSucursal=20&CodigoMoneda=0&CodigoProducto=${codigoProducto}&CodigoCuenta=&FechaLiquidacion=${fechaFormateada}&CantidadCuotasPactadas=${cantidadCuotas}&CodigoRutinaLiquidacion=2&ImportePactado=${importe}&Plazo=${cantidadCuotas}&Tasa=${tasa}&ValorResidual=0&vencimiento=&CodigoPlantilla=&webMobile=0&idProdWebMobile=${idProdWebMobile}&IdMensaje=sucursalvirtual`); //ver codigoProducto

                if (res2) {

                    //console.log('imp >>>', importe)
                    //console.log('cuota >>>', cantidadCuotas)

                    //console.log('BECuentaOperacionCreditoSimulacion >>> ', JSON.stringify(res2.output, null, 4))
                    setImporteSolicitado(res2.output[0].importeSol)
                    setCft(res2.output[0].costoFinancieroTotal.toString().slice(0, 5))
                    setTna(res2.output[0].tasa.toString().slice(0, 5))
                    setTea(res2.output[0].tea.toString().slice(0, 5))
                    setPrimerVencimiento(res2.output[1].vencimientoActual)
                    setImportePrimeraCuota(res2.output[1].impCuota)
                    setImporteGastos(res2.output[1].importeGastos)
                    setCargandoBoton(false);
                    setMostrarSimulacion(true)

                    const cuotasData = res2.output.slice(1); //excluir el elemento en la posición 0

                    setTablaCuotas(cuotasData)

                } else {
                    console.log('Error CuentaOperacionCreditoSimulacion');
                    setCargandoBoton(false);
                }

            } catch (error) {
                console.log('catch >>> ', error);
                setCargandoBoton(false);
                return;
            }


        }

    };

    const datosSimulacion = [
        { title: 'Importe a solicitar', value: <MoneyConverter value={importeSolicitado} /> },
        { title: 'TNA', value: `${tna} %` },
        { title: 'TEA', value: `${tea} %` },
    ];

    const titulosTablaSimulacion = ['Fecha', 'Cuota', 'Importe']
    const datosTablaSimulacion = tablaCuotas.map((item) => [
        <TitleSmall title={<DateConverter date={item.vencimientoActual} />} />,
        <TitleSmall title={item.numeroCuota} />,
        <TitleSmall title={<MoneyConverter value={item.impCuota} />} />,
    ])



    const handleSiguiente = () => {
        navigation.navigate('CreditoConfirmacion', { nombreProducto, importe, cantidadCuotas, cft, tea, tna, idProdWebMobile, primerVencimiento, importePrimeraCuota, importeGastos })
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [mensajeModal, setMensajeModal] = useState(null);

    const handleAceptar = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>

            <View style={styles.body}>

                <View style={{ marginBottom: '2%' }} >
                    <TitleMediumBold title={nombreProducto} />
                </View>

                <IconInputMoney placeholder={'Ingrese el importe'} onChangeText={handleImporte} value={importe} />

                <Dropdown
                    items={[
                        { label: '1', value: 1 },
                        { label: '2', value: 2 },
                        { label: '3', value: 3 },
                        { label: '4', value: 4 },
                        { label: '5', value: 5 },
                        { label: '6', value: 6 },
                        { label: '7', value: 7 },
                        { label: '8', value: 8 },
                        { label: '9', value: 9 },
                        { label: '10', value: 10 },
                        { label: '11', value: 11 },
                        { label: '12', value: 12 },
                        { label: '13', value: 13 },
                        { label: '14', value: 14 },
                        { label: '15', value: 15 },
                        { label: '16', value: 16 },
                        { label: '17', value: 17 },
                        { label: '18', value: 18 },
                        { label: '19', value: 19 },
                        { label: '20', value: 20 },
                        { label: '21', value: 21 },
                        { label: '22', value: 22 },
                        { label: '23', value: 23 },
                        { label: '24', value: 24 },
                        { label: '25', value: 25 },
                        { label: '26', value: 26 },
                        { label: '27', value: 27 },
                        { label: '28', value: 28 },
                        { label: '29', value: 29 },
                        { label: '30', value: 30 },
                        { label: '31', value: 31 },
                        { label: '32', value: 32 },
                        { label: '33', value: 33 },
                        { label: '34', value: 34 },
                        { label: '35', value: 35 },
                        { label: '36', value: 36 },
                        { label: '37', value: 37 },
                        { label: '38', value: 38 },
                        { label: '39', value: 39 },
                        { label: '40', value: 40 },
                        { label: '41', value: 41 },
                        { label: '42', value: 42 },
                        { label: '43', value: 43 },
                        { label: '44', value: 44 },
                        { label: '45', value: 45 },
                        { label: '46', value: 46 },
                        { label: '47', value: 47 },
                        { label: '48', value: 48 },
                        { label: '49', value: 49 },
                        { label: '50', value: 50 },
                        { label: '51', value: 51 },
                        { label: '52', value: 52 },
                        { label: '53', value: 53 },
                        { label: '54', value: 54 },
                        { label: '55', value: 55 },
                        { label: '56', value: 56 },
                        { label: '57', value: 57 },
                        { label: '58', value: 58 },
                        { label: '59', value: 59 },
                        { label: '60', value: 60 },
                    ]}
                    //defaultValue={valor}
                    placeholder={'Cantidad de cuotas'}
                    onSelectItem={item => handleCuotaSeleccionada(item.value)}
                    zIndex={100}
                />

                <View style={{ marginHorizontal: '20%' }}>
                    <ButtonFooter title={'Simular'} onPress={() => handleSimular()} loading={cargandoBoton} />
                </View>

                {mostrarSimulacion ? (
                    <>
                        <CardSimulacion title={'Resultado de la simulación'} data={datosSimulacion} />
                        <ScrollView>
                            <View onStartShouldSetResponder={() => true}>
                                <TableMedium headers={titulosTablaSimulacion} data={datosTablaSimulacion} />
                            </View>
                        </ScrollView>
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

export default CreditoSimulacion;
